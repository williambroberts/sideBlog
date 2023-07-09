"use client"
import {v4} from "uuid"
import React,{memo} from 'react'
import { useBlogs } from '../../../../contexts/BlogContext';
interface theProps {
    tags:string[];
}
const DisplayTags = ({tags}:theProps) => {
    const {getBlogsByTag}=useBlogs()
    console.log(tags)
    const handleClick = (tag)=>{
        console.log("tag search",tag)
        //window.location.assign("/")
       // getBlogsByTag(tag)
        //❤️search all blogs on home page for that tag
    }
  return (
    <div className='display__tags'>
        {tags?.map((item)=>
            <button key={v4()}
            onClick={()=>handleClick(item)}
            className='display__tag'>
                #{item}
            </button>
        )}
    </div>
  )
}

export default (DisplayTags)