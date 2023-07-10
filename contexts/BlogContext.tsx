"use client"
import React, { createContext,useContext,useEffect,useState } from 'react'
import { firestore } from '../firebase/firebaseConfig';
import { collection,query
,where,orderBy,limit,getDocs, startAfter, startAt, QuerySnapshot } from 'firebase/firestore';
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

}
type ChildProps = {
    children:React.ReactNode;
}
const BlogContext = createContext<BlogContextProps|null>(null)
const BlogProvider = ({children}:ChildProps) => {
    //❤️blog id {blogid:,blog:}
    const [blogs,setBlogs]=React.useState(null)
    const [stateTag,setStateTag]=useState<string>(null)
    const [queryText,setQueryText]=React.useState<string>("")
    const [mode,setMode]=React.useState<"search"|"tag"|"none">("none")
    const [LastVisible,setLastVisible]=React.useState<any>(null)
    
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
        setBlogs((prev)=>matchingBlogs)
    }
    const getBlogsByLatest = async (more=false)=>{
        //👌 for on page load
        //console.log("get blog by latest",more)
        if (mode!=="none"){
            setMode("none")
        }
        const blogsRef = collection(firestore,"Blogs")
        let startAfterValue = more===true?LastVisible:null
        const q = query(blogsRef,
            orderBy("creationTimeStamp"),
            limit(5),
            startAfter(startAfterValue)
            
            )
        const querySnapshot = await getDocs(q)
        //querySnapshot.forEach((doc)=>console.log(doc.id))
        handleUpdate(querySnapshot)

    }
    
    const handleSearch =async (query:string) =>{
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
            await getBlogsBySearchTerm(word).then((res)=>{
                console.log(res,"matching")
                foundBlogs.push(...res)
                for (let item of res){
                    if (!seen.ids.includes(item.id)){
                        seen.ids.push(item.id)
                        seen.blogs.push(item)
                        
                }
            }



            }).then(()=>{
                console.log("then2",seen.blogs)
                setBlogs(seen.blogs)
            }).catch((rej)=>console.log(rej))
            
        })
        // 🧧update blog state with unique foundBlogs
       
        
        
        
        }
        
    

    
    useEffect(()=>{
        //to restart startAfter at the beginning if go to search by tags to searchbar 
        setLastVisible(null)
        console.log(mode,"mode",stateTag,"tag")
        

    },[mode])
    const getBlogsBySearchTerm = async (term:string)=>{
        setMode((prev)=>"search")
        console.log("lastVisible",LastVisible,"term",term,mode,"mode"
        ,queryText,"queryText")
        const blogsRef = collection(firestore,"Blogs")
        let searchTerm = term.toLowerCase()
        let startAfterValue = term===queryText?LastVisible: null
        const q  = query(blogsRef,
            where("keywords","array-contains",searchTerm),
            orderBy("title"),
            limit(5),
            startAfter(startAfterValue)
            )
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
        querySnapshot.forEach((doc)=>
        matchingBlogs.push({id:doc.id,...doc.data()}))
        return matchingBlogs
    }
    const getBlogsByTag = async (tag:string)=>{
        setStateTag(tag)
        setMode((prev)=>"tag")
        console.log("tag",tag,mode)
        const blogsRef = collection(firestore,"Blogs")
        let searchTerm = tag.toLowerCase()
        const q  = query(blogsRef,
            where("tags","array-contains",searchTerm),
            orderBy("title"),
            limit(10),
           startAfter(LastVisible) //null first time
            )
        const querySnapshot = await getDocs(q)
        handleUpdate(querySnapshot)

    }
    const fetchMore = async()=>{
        if (mode==="none"){
            await getBlogsByLatest(true)
        }else if(mode==="search"){
            await handleSearch(queryText)
        }else if (mode==="tag"){
            await getBlogsByTag(stateTag)
        }
    }

    //
    const BlogValue = {
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