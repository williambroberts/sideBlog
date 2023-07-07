"use client"
import React, {useContext,useState,createContext} from 'react'
type WriteContextValues = {
localBLog?:any;
fireBLog?:any;
setBlogId?:Function;
setLocalBlog?:Function;
setFireBlog?:Function;
setImgFile?:Function;
imgFile?:any;
blogId:string;
}
type ChildProps = {
    children:React.ReactNode;
}
const WriteContext = createContext<WriteContextValues|undefined>(undefined)
const WriteProvider = ({children}:ChildProps) => {
    const [blogId,setBlogId]=useState<string|null|undefined>(null)
    const [fireBLog,setFireBlog]=useState(undefined)
    const [localBlog,setLocalBlog]=useState(
      {
        content:[
          {type:"title",text:""},
          {type:"coverImage",text:""},

        ],
        views:0,
        author:"",
        authorId:"",
        tags:[],
        category:"",
        dateCreation:"",
        id:"",
        lastUpdate:"",
      }
    )
    const [imgFile,setImgFile]=useState(null)
    const WriteValue = {
      localBlog:localBlog,
      fireBLog:fireBLog,
      blogId:blogId,
      setBlogId:setBlogId,
      setLocalBlog:setLocalBlog,
      setFireBlog:setFireBlog,
      imgFile:imgFile,setImgFile:setImgFile,

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