"use client"
import React, {useContext,useState,createContext} from 'react'
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
}
type ChildProps = {
    children:React.ReactNode;
}
const WriteContext = createContext<WriteContextValues|undefined>(undefined)
const WriteProvider = ({children}:ChildProps) => {
  const initialBlogData = {
    content:[
      

    ],
    uploadedImages:[],
    title:"",
    coverImage:"",
    views:0,
    author:"",
    authorId:"",
    tags:[],
    category:"",
    dateCreation:"",
    id:"",
    lastUpdate:"",
  }
    const [blogId,setBlogId]=useState<string|null|undefined>(null)
    const [fireBLog,setFireBlog]=useState(undefined)
    const [localBlog,setLocalBlog]=useState(initialBlogData)
    const [progress,setProgress]=useState<number>(0)
    const [imgFile,setImgFile]=useState(null)
    const WriteValue = {
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