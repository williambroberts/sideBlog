"use client"
import React from 'react'
import { useWrite } from '../../../contexts/writeContext';
type theProps = {
    id:string;
}
const DeleteContentItem = ({id}:theProps) => {
    const {localBLog}=useWrite()
    const handleDelete = ()=>{

    }
  return (
    <button onClick={handleDelete} 
    className='write__delete__content'
    ></button>
  )
}

export default DeleteContentItem