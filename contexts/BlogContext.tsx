"use client"
import React, { createContext,useContext,useEffect,useState } from 'react'
import { firestore } from '../firebase/firebaseConfig';
import { collection,query
,where,orderBy,limit,getDocs, startAfter, startAt } from 'firebase/firestore';
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
        setLastVisible(newLastVisible)
        console.log(newLastVisible,"new last visible")
        const matchingBlogs = []
        querySnapshot.forEach((doc)=>
        matchingBlogs.push({id:doc.id,...doc.data()}))
        setBlogs((prev)=>matchingBlogs)
    }
    const getBlogsByLatest = async ()=>{
        //👌 for on page load
        if (mode!=="none"){
            setMode("none")
        }
        const blogsRef = collection(firestore,"Blogs")
        const q = query(blogsRef,
            orderBy("creationTimeStamp"),
            limit(5),
            startAfter(LastVisible)
            
            )
        const querySnapshot = await getDocs(q)
        handleUpdate(querySnapshot)

    }
    useEffect(()=>{
        if (mode==="none"){
            getBlogsByLatest()
        }
    },[])
    const handleSearch =async (query:string) =>{
        setQueryText(query) //if query unchanged, ie on fetch more
        let foundBlogs = []
        let queryTerms = query.split(" ")
        queryTerms.forEach((word)=>{
            let matchingBlogs = getBlogsBySearchTerm(word)
            foundBlogs.concat(matchingBlogs)
        })
        // update blog state with unique foundBlogs

    }
    useEffect(()=>{
        //to restart startAfter at the beginning if go to search by tags to searchbar 
        setLastVisible(null)
    },[mode])
    const getBlogsBySearchTerm = async (term:string)=>{
        setMode((prev)=>"search")
        const blogsRef = collection(firestore,"Blogs")
        const q  = query(blogsRef,
            where("keywords","array-contains",term.toLowerCase()),
            orderBy("title"),
            limit(5),
            startAfter(LastVisible)
            )
        const querySnapshot = await getDocs(q)
        const newLastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
        setLastVisible(newLastVisible)
        console.log(newLastVisible,"new last visible")
        const matchingBlogs = []
        querySnapshot.forEach((doc)=>
        matchingBlogs.push({id:doc.id,...doc.data()}))
        return matchingBlogs
    }
    const getBlogsByTag = async (tag:string)=>{
        setStateTag(tag)
        setMode((prev)=>"tag")
        const blogsRef = collection(firestore,"Blogs")
        const q  = query(blogsRef,
            where("tags","array-contains",tag.toLowerCase()),
            orderBy("title"),
            limit(10),
           startAfter(LastVisible) //null first time
            )
        const querySnapshot = await getDocs(q)
        handleUpdate(querySnapshot)

    }
    const fetchMore = async()=>{
        if (mode==="none"){
            await getBlogsByLatest()
        }else if(mode==="search"){
            await handleSearch(queryText)
        }else if (mode==="tag"){
            await getBlogsByTag(stateTag)
        }
    }

    //
    const BlogValue = {
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