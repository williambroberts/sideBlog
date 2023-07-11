"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'
type theProps= {
  filterByAuthor?:boolean;
  userArg?:string;
}

const FetchMoreBlogs = ({filterByAuthor,userArg}:theProps) => {
    const {fetchMore}=useBlogs()
  return (
    <button 
    className="btn u py-4"
    onClick={()=>fetchMore(filterByAuthor,userArg)}>
        More
    </button>
  )

}

export default FetchMoreBlogs