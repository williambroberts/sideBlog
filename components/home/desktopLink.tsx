"use client"
import Link from 'next/link';
import React,{memo, useState} from 'react'
import CanEdit from './canEdit';
import MobileLink from './mobileLink';
type theProps = {
    data?:any;
}
const DesktopLink = ({data}:theProps) => {
  const [position,setPosition]=useState({left:null,top:null})
  const handleImage = (e)=>{
    let x = e.clientX
    let y = e.clientY
    let newPosition = {left:x,top:y}
    console.log(x)
    //setPosition(({...newPosition}))
  }
  return (
    <div className='w-full'>
      <div className='sm:hidden w-full'>
        <MobileLink data={data}/>
      </div>

     
    
    <div
    onMouseMove={handleImage}
    className='text-base tracking-wide py-2 hidden sm:block group'>
       <Link href={`/profile?Auth=${data?.authorId}`}
        className='text-[var(--t-1)] pr-4 hover:underline'
        >{data?.author}</Link>
        <span
        className='pr-8 text-[var(--t-3)]'
        >{data?.dateCreation}</span>
        <Link href={`/blog?blogId=${data?.id}`}
        className='text-[var(--t-1)] hover:underline'
        >{data?.title}</Link>
        <CanEdit id={data.authorId}/>

        <div 
        style={{left:position.left,top:position.top}}
        className='hidden group-hover:inline-block w-80 h-40 bg-[var(--t-4)]
        absolute rounded-md
        '>

        </div>
    </div>
    </div>
  )
}

export default (DesktopLink)