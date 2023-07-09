"use client"
import React, { createContext,useContext,useState } from 'react'
interface BlogContextProps {
    blogs?:any;
    setBlogs?:Function;
   

}
type ChildProps = {
    children:React.ReactNode;
}
const BlogContext = createContext<BlogContextProps|null>(null)
const BlogProvider = ({children}:ChildProps) => {
    const [blogs,setBlogs]=React.useState()
    const BlogValue = {
        blogs:blogs,setBlogs:setBlogs,

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