
"use client"
import React from 'react'
import Button from './button';
import IconCrossCircled from '../../../../icons/cross';
import { useWrite } from '../../../../contexts/writeContext';
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
    className='editor__tag__item'
    >{tag}
        <Button handleClick={()=>handleDelete(tag)}
        
        >
            <IconCrossCircled/>
        </Button>
    </div>
  )
}

export default TagItem