"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'
import BlogLink from './blogLink'

const BlogList = () => {
    const {blogs}=useBlogs()
  return (
    <div className='blogs__list'>
        {blogs?.map((item)=>{
            <BlogLink data={item}/>
        })}
    </div>
  )
}

export default BlogList