"use client"
import React from 'react'
import { useBlogs } from '../../contexts/BlogContext'
interface theProps {

}
const MostViewedBlogs = ({}:theProps) => {
    const {mostViewedBlogs}=useBlogs()
  return (
    <div>

    </div>
  )
}

export default MostViewedBlogs