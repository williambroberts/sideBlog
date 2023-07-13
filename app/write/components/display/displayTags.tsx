"use client"
import {v4} from "uuid"
import React,{memo} from 'react'
import { useBlogs } from '../../../../contexts/BlogContext';
import IconClock from "../../../../icons/clock";
import IconTags from "../../../../icons/tags";
interface theProps {
    tags:string[];
}
const DisplayTags = ({tags}:theProps) => {
    const {getBlogsByTag,setMode,setStateTag}=useBlogs()
    //console.log(tags)
    const handleClick = async (tag)=>{
        console.log("tag search",tag)
        setMode((prev)=>"tag")
        setStateTag(tag)
       //await getBlogsByTag(tag)
         window.location.assign(`/?tag=${tag}`)
        //❤️search all blogs on home page for that tag
    }
  return (
    <div className='display__tags'>
        <span className="flex flex-row 
        text-[var(--t-3)] pr-2 items-center gap-1
        flex-wrap">

            <IconClock/> ~ {}min
        </span>
        <span className=" ml-2 text-[var(--t-2)]
        
        "><IconTags/></span>
        {tags?.map((item)=>
            <button key={v4()}
            onClick={()=>handleClick(item)}
            className='flex flex-row items-center gap-1 px-1
            hover:underline
            '>
                #{item}
            </button>
        )}
    </div>
  )
}

export default (DisplayTags)