"use client"
import React, { useEffect } from 'react'
import { useBlogs } from '../../contexts/BlogContext'
import BlogLink from './blogLink'

import {v4} from "uuid"
const BlogList = () => {
    const {blogs}=useBlogs()
   if (blogs===null){
    return <div>Loading</div>
   } 
    
  return (
    <div className="blog__list">
      
       {blogs?.map((item,index)=><div key={v4()}>
    
        <BlogLink data={item}/>
       </div>)}
    </div>
  )
}

export default BlogList