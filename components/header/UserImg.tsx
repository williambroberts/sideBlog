"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
interface theProps {
    src?:string;
    open?:boolean;
    name?:string;
}
const UserImg = ({src,open,name}:theProps) => {
     
    
  return (
    <div className='flex flex-row
     overflow-hidden
    items-center justify-center px-4 py-2 '>
        <img 
        className='w-8 h-8 rounded-full'
        style={{objectFit:"cover",
        objectPosition:"center"}}
        loading='lazy' src={src} alt=""
        sizes='(50px)'
        />

        {open? <span 
        className=' px-2 flex
        w-full box-border
        whitespace-nowrap
         text-ellipsis'
        >{name}</span>:""}
    </div>
  )
}

export default UserImg