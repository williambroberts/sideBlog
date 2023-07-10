"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'

const GetLatest = () => {
    const {getBlogsByLatest}=useBlogs()
  return (
    <button 
    onClick={()=>getBlogsByLatest()}
    className="btn py-4">
        See Latest Blogs
    </button>
  )
}

export default GetLatest