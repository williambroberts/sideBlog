"use client"
import React,{memo} from 'react'
interface theProps {
    tags:string[];
}
const DisplayTags = ({tags}:theProps) => {
    console.log(tags)
    const handleClick = (tag)=>{
        //❤️search all blogs on home page for that tag
    }
  return (
    <div className='display__tags'>
        {tags?.map((item)=>
            <span 
            onClick={()=>handleClick(item)}
            className='display__tag'>
                #{item}
            </span>
        )}
    </div>
  )
}

export default memo(DisplayTags)