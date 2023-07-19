
"use client"
import React from 'react'
import Button from './button';
import IconCrossCircled from '../../../../icons/cross';
import { useWrite } from '../../../../contexts/writeContext';
import IconTagRemove from '../../../../icons/tagRemove';
interface theProps {
    tag:string;
}
const TagItem = ({tag}:theProps) => {
  const {localBlog,setLocalBlog,hasChanged,setHasChanged}=useWrite()
  const handleDelete = (tag)=>{
    if (!hasChanged){
      setHasChanged((prev)=>true)
    }
    let newLocalBlog = {...localBlog}
    let newTags = newLocalBlog.tags.filter((item)=>item!==tag)
    newLocalBlog.tags=newTags
    setLocalBlog(newLocalBlog)
  }
  return (
    <div
    className='inline-flex gap-1 
    px-1 py-0 uppercase first-letter:text-red-950 
    bg-[var(--bg-3)] items-center rounded-md 
    text-sm flex-row'
    >{tag}
        <Button handleClick={()=>handleDelete(tag)}
        className='hover:opacity-100 opacity-60
        duration-300 ease-in-out 
        p-1
        transition-all
        cursor-pointer'
        >
            {/* <IconCrossCircled/> */}
            <IconTagRemove/>
        </Button>
    </div>
  )
}

export default TagItem