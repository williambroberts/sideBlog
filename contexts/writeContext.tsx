"use client"
import { collection, doc, getDoc } from 'firebase/firestore';
import React, {useContext,useState,createContext, useEffect} from 'react'
import { firestore } from '../firebase/firebaseConfig';
type WriteContextValues = {
localBlog?:any;
fireBLog?:any;
setBlogId?:Function;
setLocalBlog?:Function;
setFireBlog?:Function;
setImgFile?:Function;
imgFile?:any;
blogId?:string;
initialBlogData?:any;
progress?:number;
setProgress?:Function;
setHasChanged:Function;
hasChanged:boolean;
getBlogById:Function;
setIsDelete:Function;
isDelete:any
openAddItem:any;
setOpenAddItem:Function;
}
type ChildProps = {
    children:React.ReactNode;
}
const WriteContext = createContext<WriteContextValues|undefined>(undefined)
const WriteProvider = ({children}:ChildProps) => {
  const initialBlogData = {
    content:"",
    uploadedImages:[],
    deletedImages:[],
    keywords:[],
    title:"",
    coverImage:"",
    views:0,
    author:"",
    authorId:"",
    tags:[],
    readTime:"",
    category:"",
    dateCreation:"",
    creationTimeStamp:0,
    id:"",
    latestUpdateTimeStamp:"",
    userPhoto:"",
    userSocials:{},//❤️ do here sync to user DOc
  }
  const [openAddItem,setOpenAddItem]=useState({"yes":false,"image":false,"category":false,"title":false})
  const [hasChanged,setHasChanged]=useState<boolean>(false)
  const [isDelete,setIsDelete]=useState<boolean>(false)
    const [blogId,setBlogId]=useState<string|null|undefined>(null)
    const [fireBLog,setFireBlog]=useState(undefined)
    const [localBlog,setLocalBlog]=useState(initialBlogData)
    const [progress,setProgress]=useState<number>(0)
    const [imgFile,setImgFile]=useState<any>({value:"",file:null})

const generateKeywords = ()=> {
    let newKeyWords = [""," "]
    //💭 toLowerCase()
    newKeyWords.push(localBlog.category.toLowerCase())
    let authorWords = localBlog.author.toLowerCase().split(" ")
    newKeyWords.push(...authorWords)
    localBlog.tags.forEach((tag)=>newKeyWords.push(tag.toLowerCase()))
    let titleWords = localBlog.title.toLowerCase().split(" ")
    newKeyWords.push(...titleWords)
    let newLocalBLog = {...localBlog}
    
    newLocalBLog.keywords = Array.from(new Set(newKeyWords))
    setLocalBlog(newLocalBLog)
  console.log(newLocalBLog.keywords)
}

  useEffect(()=>{
    //generate new keywords
    
    console.log(localBlog)
    if (localBlog!==undefined){
      generateKeywords()
    }
    
  },[localBlog?.tags,localBlog?.category,
    localBlog?.author,localBlog?.title])

    const getBlogById =async (id)=>{
      console.log(id,"idGETblogBy")
      const docRef = doc(firestore,"Blogs",id)
       const docSnap = await getDoc(docRef)
       if (docSnap.exists()){
        console.log(docSnap.data())
        setFireBlog({...docSnap.data()})
        setBlogId((prev)=>docSnap.data().id)
       
       }
    }
    useEffect(()=>{
      "settings local blog to fireBlog"
      setLocalBlog((prev)=>fireBLog)
    },[fireBLog])
    const WriteValue = {
      openAddItem:openAddItem,setOpenAddItem:setOpenAddItem,
      isDelete:isDelete,setIsDelete:setIsDelete,
      getBlogById:getBlogById,
      hasChanged:hasChanged,setHasChanged:setHasChanged,
      progress:progress,setProgress:setProgress,
      localBlog:localBlog,
      fireBLog:fireBLog,
      blogId:blogId,
      setBlogId:setBlogId,
      setLocalBlog:setLocalBlog,
      setFireBlog:setFireBlog,
      imgFile:imgFile,setImgFile:setImgFile,
      initialBlogData:initialBlogData,

    }


  return (
    <WriteContext.Provider value={WriteValue}>
        {children}
    </WriteContext.Provider>
  )
}

export default WriteProvider
export function useWrite(): WriteContextValues{
    const WC = useContext(WriteContext);
    if (!WC) {
      throw new Error('useWrite must be used within WriteProvider');
    }
    return WC;
  }