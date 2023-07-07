"use client"
import React from 'react'
import { useWrite } from '../../../contexts/writeContext';
type theProps = {
    id:string;
}
const DeleteContentItem = ({id}:theProps) => {
    const {localBlog,setLocalBlog}=useWrite()
    const handleDelete = ()=>{
        let newLocalBLog = {...localBlog}
        let newContent = localBlog.content.filter((item)=>item.id!==id)
        newLocalBLog.content=newContent
        setLocalBlog((prev)=>newLocalBLog)
    }
  return (
    <button onClick={handleDelete} 
    className='write__delete__content'
    ></button>
  )
}

export default DeleteContentItem