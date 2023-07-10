"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'
type theProps= {
  filterByAuthor?:boolean;
  userArg?:string;
}
const GetLatest = ({filterByAuthor,userArg}:theProps) => {
    const {getBlogsByLatest}=useBlogs()
  return (
    <button 
    onClick={()=>getBlogsByLatest(false,filterByAuthor,userArg)}
    className="btn py-4">
        See Latest Blogs
    </button>
  )
}

export default GetLatest