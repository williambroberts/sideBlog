"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'


const FetchMoreBlogs = () => {
    const {fetchMore}=useBlogs()
  return (
    <button 
    className='
    fetch__btn
    '
    onClick={()=>fetchMore()}>
        More
    </button>
  )

}

export default FetchMoreBlogs