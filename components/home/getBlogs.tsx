"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useBlogs } from '../../contexts/BlogContext'

const GetBlogsComponent = () => {
    const searchParmas = useSearchParams()
    const {getBlogsByLatest,getBlogsByTag}=useBlogs()
    useEffect(()=>{
        let tag = searchParmas.get("tag")
       if(tag===null){
        getBlogsByLatest()
       }else {
        
        getBlogsByTag(tag)
       }
    },[])
    return (
    <div></div>
  )
}

export default GetBlogsComponent