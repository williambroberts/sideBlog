"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'


const FetchMoreBlogs = () => {
    const {fetchMore}=useBlogs()
  return (
    <button 
    className="btn u"
    onClick={()=>fetchMore()}>
        More
    </button>
  )

}

export default FetchMoreBlogs