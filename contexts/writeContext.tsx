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
openState:any;
temp:string;
setTemp:Function;
wait:number;
last:number;
setLast:Function;
history:any;
setHistory:Function;
redo:any;
setRedo:Function;
setIsWrite:Function;
isWrite:boolean;
}
type ChildProps = {
    children:React.ReactNode;
}
const WriteContext = createContext<WriteContextValues|undefined>(undefined)
const WriteProvider = ({children}:ChildProps) => {
  const seed = ()=>{return Math.floor(Math.random()*300)+1}
  const initialBlogData = {
    isBlog:true,
    content:"✎ write your blog",
    uploadedImages:[`https://picsum.photos/id/237/800/400`],
    deletedImages:[],
    keywords:[],
    title:"Untitled document",
    coverImage:`https://picsum.photos/id/${seed}/200/300`,
    views:0,
    author:"",
    authorId:"",
    tags:[],
    readTime:"",
    category:"Category",
    dateCreation:"",
    creationTimeStamp:0,
    id:"",
    latestUpdateTimeStamp:"",
    userPhoto:"",
    likes:[],
    userSocials:{},//❤️ do here sync to user DOc
  }
  const openState = {
    "yes":false,
    "image":false,
    "category":false,
    "title":false,
    "cover":false,
    "profile":false,

  }
  const [temp,setTemp]=useState<string>("")
  const wait = 1000
  const [isWrite,setIsWrite]=useState<boolean>(true)
  const [last,setLast]=useState<number>(0)
  const [openAddItem,setOpenAddItem]=useState(openState)
  const [hasChanged,setHasChanged]=useState<boolean>(false)
  const [isDelete,setIsDelete]=useState<boolean>(false)
    const [blogId,setBlogId]=useState<string|null|undefined>(null)
    const [fireBLog,setFireBlog]=useState(undefined)
    const [localBlog,setLocalBlog]=useState(initialBlogData)
    const [progress,setProgress]=useState<number>(0)
    const [imgFile,setImgFile]=useState<any>({value:"",file:null})
  const [history,setHistory]=useState<any>([])
  const [redo,setRedo]=useState<any>([])


const generateKeywords = ()=> {
  //console.log(localBlog,"🧧")
  if (localBlog===undefined){return}
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
  // /console.log(newLocalBLog.keywords)
}

  useEffect(()=>{
    //generate new keywords
    
   // console.log(localBlog)
    if (localBlog!==undefined){
      generateKeywords()
    }
    
  },[localBlog?.tags,localBlog?.category,
    localBlog?.author,localBlog?.title])

    const getBlogById =async (id)=>{
      //console.log(id,"idGETblogBy")
      const docRef = doc(firestore,"Blogs",id)
       const docSnap = await getDoc(docRef)
       if (docSnap.exists()){
        //console.log(docSnap.data())
        setFireBlog({...docSnap.data()})
        setBlogId((prev)=>docSnap.data().id)
       
       }
    }
    useEffect(()=>{
      "settings local blog to fireBlog"
      setLocalBlog((prev)=>fireBLog)
    },[fireBLog])
    const WriteValue = {
      isWrite:isWrite,setIsWrite:setIsWrite,
      history:history,setHistory:setHistory,redo:redo,setRedo:setRedo,
      wait:wait,last:last,setLast:setLast,temp:temp,setTemp:setTemp,
      openState:openState,
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