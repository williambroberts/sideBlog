"use client"
import Link from 'next/link';
import React,{memo, useState} from 'react'
import CanEdit from './canEdit';
import MobileLink from './mobileLink';
import { useAuth } from '../../contexts/AuthContext';
import Parent from '../ReactSplitPane/parent';
import Image from 'next/image';
type theProps = {
    data?:any;
}
const DesktopLink = ({data}:theProps) => {
  const {setProfileUserUid}=useAuth()
  const [position,setPosition]=useState({left:0,top:0})
  const handleImage = (e)=>{
    let parent = e.target.parentElement
    console.log(parent,e.target)
    if (parent.className==="canEdit__desktop"){return;}
    let innerBounds= e.target.getBoundingClientRect()
    let Parentbounds = parent.getBoundingClientRect()
    let x = e.clientX-Parentbounds.left-160
    let y = e.clientY-Parentbounds.top-(180)
    let newPosition = {left:x,top:y}
    //console.log(x)
    setPosition(({...newPosition}))
  }
  const handleClick = ()=>{
    //🧧set profileUserUid to the data.authorId
    console.log(data.authorId,"setting profileUId")
    setProfileUserUid(data.authorId)

  }
  return (
    <div className='w-full'>
      <div className='sm:hidden w-full'>
        <MobileLink data={data}/>
      </div>

     
    
    <div
    onMouseMove={handleImage}
    className='text-base tracking-wide py-2  sm:block group'>
       <Link href={`/profile`}
       onClick={handleClick}
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
        style={{
          backgroundImage:`url(${data?.coverImage})`,
          transform:`translate(${position.left}px,${position.top}px)`
      }}
        className='hidden group-hover:inline-block w-80 h-40 bg-[var(--t-4)]
        absolute rounded-md z-10 overflow-hidden left-0  
        '>
          
          <div className='w-full h-hull overflow-hidden'>
            <img 
            className='w-full h-full'
            src={data?.coverImage} alt="/"
            
            />
           
            {/* <Image src={data?.coverImage} alt="blog"
        fill 
        style={{objectFit:"cover",objectPosition:"center"}}
        objectFit='cover'
        objectPosition='center'
          /> */}
          </div>
        </div>
    </div>
    </div>
  )
}

export default (DesktopLink)