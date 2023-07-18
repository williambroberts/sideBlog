"use client"
import React, { createContext,useContext,useEffect,useState } from 'react'
import { firestore } from '../firebase/firebaseConfig';
import { collection,query
,where,orderBy,limit,getDocs, startAfter, startAt, QuerySnapshot, doc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { useSearchParams } from 'next/navigation';
interface BlogContextProps {
    blogs?:any;
    setBlogs?:Function;
    setLastVisible?:Function;
    LastVisible?:number;
    mode:string;
    setMode:Function;
    fetchMore:Function;
    getBlogsByLatest:Function;
    handleSearch:Function;
    getBlogsByTag:Function;
    setStateTag:Function;
    stateTag:string;
    filterByAuth:boolean;
    setFilterByAuth:Function;

}
type ChildProps = {
    children:React.ReactNode;
}
const BlogContext = createContext<BlogContextProps|null>(null)
const BlogProvider = ({children}:ChildProps) => {
    //❤️blog id {blogid:,blog:}
    const {user,setProfileUserUid}=useAuth()
    const theLimit = 4;
    const [filterByAuth,setFilterByAuth]=useState<boolean>(false)
    const [blogs,setBlogs]=React.useState(null)
    const [stateTag,setStateTag]=useState<string>(null)
    const [queryText,setQueryText]=React.useState<string>("")
    const [mode,setMode]=React.useState<"search"|"tag"|"none">("none")
    const [LastVisible,setLastVisible]=React.useState<any>(null)
    const searchParams = useSearchParams()
    const getUserDocForABlog =async (uid)=>{
        try {
            const docRef = doc(firestore,"users",uid)
            let snapshot = await getDoc(docRef)
            
            if (snapshot.exists()){
                //console.log(snapshot.data())
                return {...snapshot.data()}
            }
        }catch(err){
            console.log(err)
        }
        
    }
    const getCorrespondingUserDocsForWantedBlogs =async (docs)=>{
        let updatedMatchingBlogs = []
        await docs.forEach(async (doc,index)=>{
            await getUserDocForABlog(doc.authorId).then((userData)=>{
                //console.log(userData,"userData")
            let docCopy = {...doc}
            docCopy.author = userData?.username
           docCopy.userPhoto = userData?.profilePhoto
            updatedMatchingBlogs.push(docCopy)
            }).then(()=>{
                if(index===docs.length-1){
                    console.log(updatedMatchingBlogs,"updatedMatchignBlogs",index)
                    setBlogs((prev)=>updatedMatchingBlogs)
                }
                
            }).catch((error)=>console.log(error))
            
        })
        
    }
    const handleUpdate = (querySnapshot)=>{
        //updater state function for querySnapsht=getDocs(q)
        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
        if (newLastVisible===undefined){
            setLastVisible(null)
        }else {
            setLastVisible(newLastVisible)
        }
        
        //console.log(newLastVisible,"new last visible")
        const matchingBlogs = []
        querySnapshot.forEach((doc)=>
        matchingBlogs.push({id:doc.id,...doc.data()}))
        console.log(matchingBlogs)
        getCorrespondingUserDocsForWantedBlogs(matchingBlogs)
        //setBlogs((prev)=>matchingBlogs)
    }
    const getBlogsByLatest = async (more=false,filterByAuthor=false,userArg)=>{
        //👌 for on page load
        console.log("get blog by latest",more,filterByAuthor,userArg)
        if (mode!=="none"){
            setMode("none")
        }
        const blogsRef = collection(firestore,"Blogs")
        let startAfterValue = more===true?LastVisible:null
        let q = null    
        let sendUserArg = userArg===undefined? user?.uid:userArg
        //console.log(user.uid,sendUserArg,"senduserArg")
        if (sendUserArg===undefined){
            let newArg = searchParams.get("id")
            console.log(newArg,"newArg")
            sendUserArg=newArg
            setProfileUserUid(newArg)
        }
        if (filterByAuthor){
            q = query(blogsRef,
                where("authorId","==",sendUserArg),
                orderBy("creationTimeStamp"),
                limit(theLimit),
                startAfter(startAfterValue)
                
                )
        }else {
            q = query(blogsRef,
            orderBy("creationTimeStamp"),
            limit(theLimit),
            startAfter(startAfterValue)
            
            )
        }
         
        const querySnapshot = await getDocs(q)
        //querySnapshot.forEach((doc)=>console.log(doc.id))
        handleUpdate(querySnapshot)

    }
    
    const handleSearch =async (query:string,filterArg,userArg) =>{
        if (query!==queryText){
            setQueryText(query)
            console.log("chanded search text")
            setLastVisible((prev)=>{return null})
        }
         //if query unchanged, ie on fetch more
        let foundBlogs = []
        let seen = {ids:[],blogs:[]}
        let queryTerms = query.split(" ")
        console.log(queryTerms)
        queryTerms.forEach(async (word)=>{
            await getBlogsBySearchTerm(word,filterArg,userArg).then((res)=>{
                console.log(res,"matching")
                foundBlogs.push(...res)
                for (let item of res){
                    if (!seen.ids.includes(item.id)){
                        seen.ids.push(item.id)
                        seen.blogs.push(item)
                        
                }
            }



            }).then(async ()=>{
                console.log("then2",seen.blogs)
                // setBlogs(seen.blogs)
                if (seen.blogs.length===0){
                    setBlogs((prev)=>[])
                    return
                }
                getCorrespondingUserDocsForWantedBlogs(seen.blogs)
            }).catch((rej)=>console.log(rej))
            
        })
        // 🧧update blog state with unique foundBlogs
       
        
        
        
        }
        
    

    
    useEffect(()=>{
        //to restart startAfter at the beginning if go to search by tags to searchbar 
        setLastVisible(null)
        console.log(mode,"mode",stateTag,"tag")
        

    },[mode])
    const getBlogsBySearchTerm = async (term:string,filterByAuthor=false,userArg)=>{
        setMode((prev)=>"search")
        console.log("lastVisible",LastVisible,"term",term,mode,"mode"
        ,queryText,"queryText",user?.uid)
        const blogsRef = collection(firestore,"Blogs")
        let searchTerm = term.toLowerCase()
        let startAfterValue = term===queryText?LastVisible: null
        let q = null
        if (filterByAuthor){
        q  = query(blogsRef,
                where("keywords","array-contains",searchTerm), 
                where("authorId","==",userArg), 
                orderBy("title"),
                limit(theLimit),
                startAfter(startAfterValue)
                )
        }else {
            q  = query(blogsRef,
                where("keywords","array-contains",searchTerm), 
                orderBy("title"),
                limit(theLimit),
                startAfter(startAfterValue)
                )
        }
        
        const querySnapshot = await getDocs(q)
        console.log(querySnapshot)
        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
        if (newLastVisible===undefined){
            setLastVisible(null)
        }else {
            setLastVisible(newLastVisible)
        }
    //    querySnapshot.forEach((doc)=>
    //    console.log(doc.id)
    //    )
        console.log(newLastVisible,"new last visible")
        const matchingBlogs = []
        querySnapshot.forEach((doc:any)=>
        
        matchingBlogs.push({id:doc.id,...doc.data()}))
        return matchingBlogs
    }
    const getBlogsByTag = async (tag:string,filterByAuthor=false,UserArg)=>{
        setStateTag(tag)
        setMode((prev)=>"tag")
        console.log("tag",tag,mode)
        const blogsRef = collection(firestore,"Blogs")
        let searchTerm = tag.toLowerCase()
        let q = null 
        if (filterByAuthor){
            q  = query(blogsRef,
                where("tags","array-contains",searchTerm),
                where("authorId","==",UserArg),
                orderBy("title"),
                limit(theLimit),
               startAfter(LastVisible) //null first time
                )
        }else {
            q  = query(blogsRef,
                where("tags","array-contains",searchTerm),
                orderBy("title"),
                limit(theLimit),
               startAfter(LastVisible) //null first time
                )
        }
        
        const querySnapshot = await getDocs(q)
        handleUpdate(querySnapshot)

    }
    const fetchMore = async(filterByAuthor,userArg)=>{
        if (mode==="none"){
            await getBlogsByLatest(true,filterByAuthor,userArg)
        }else if(mode==="search"){
            await handleSearch(queryText,filterByAuthor,userArg)
        }else if (mode==="tag"){
            await getBlogsByTag(stateTag,filterByAuthor,userArg)
        }
    }

    //
    const BlogValue = {
        setFilterByAuth:setFilterByAuth,filterByAuth:filterByAuth,
        setStateTag:setStateTag,stateTag:stateTag,
        getBlogsByTag:getBlogsByTag,
        handleSearch:handleSearch,
        fetchMore:fetchMore,getBlogsByLatest:getBlogsByLatest,
        mode:mode,setMode:setMode,
        blogs:blogs,setBlogs:setBlogs,
        LastVisible:LastVisible,setLastVisible:setLastVisible,

    }
  return (
    <BlogContext.Provider value={BlogValue}>
        {children}
    </BlogContext.Provider>
  )
}

export default BlogProvider

export function useBlogs(): BlogContextProps {
    const BC = useContext(BlogContext)
    if(!BC){
        throw new Error("useBlogs must be used inside BlogsProvider")
    }
    return BC;
}