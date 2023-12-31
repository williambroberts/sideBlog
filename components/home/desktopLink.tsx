"use client"
import Link from 'next/link';
import React,{memo, useState} from 'react'
import CanEdit from './canEdit';
import MobileLink from './mobileLink';
import { useAuth } from '../../contexts/AuthContext';

import Image from 'next/image';
import IconPinned from '../../icons/pin';
type theProps = {
    data?:any;
    topViewed?:boolean;
    rank?:number;
}
const DesktopLink = ({rank,data,topViewed}:theProps) => {
  
  const {setProfileUserUid}=useAuth()
  const [position,setPosition]=useState({left:0,top:0,display:""})
  const handleImage = (e)=>{
    let parent = e.target.parentElement
    //console.log(parent.tagName,e.target.tagName)
    if (parent.className==="canEdit__desktop"){
      setPosition((prev)=>({...prev,display:"none"}))
      return;}
    if ((e.target.tagName!=="SPAN" &&parent.tagName!=="DIV")
    || (e.target.tagName!=="A" && parent.tagName!=="DIV") 
    ||(e.target.tagName==="DIV")||(e.target.tagName==="IMG")){
      setPosition((prev)=>({...prev,display:"none"}))
      return;}
    let innerBounds= e.target.getBoundingClientRect()
    let Parentbounds = parent.getBoundingClientRect()
    let x = e.clientX-Parentbounds.left-160
    let y = e.clientY-Parentbounds.top-(210)
    let newPosition = {left:x,top:y,display:""}
    //console.log(x)
    setPosition(({...newPosition}))
  }
  const handleClick = ()=>{
    //🧧set profileUserUid to the data.authorId
    console.log(data.authorId,"setting profileUId")
    setProfileUserUid(data.authorId)
    let newHref = `/profile?id=${data.authorId}`
    window.location.assign(newHref)
  }
  return (
    <div className='w-full flex-col'>
      <div className='sm:hidden w-full'>
        <MobileLink data={data} rank={rank}
        topViewed={topViewed}
        />
      </div>

     
    <div className='hidden gap-1 px-1 
    text-sm tracking-tight sm:flex
    items-center text-[var(--t-3)]
    '
    style={{display:topViewed?"":"none"}}
    >
     <IconPinned/> Top Viewed #{rank}
     {/* <div className='popular__'>popular</div> */}
    </div>
    <div
    onMouseMove={handleImage} 
    className='text-base tracking-wide pb-2 pt-0
    hidden
    sm:block group'>

       <div
       onClick={handleClick}
        className='text-[var(--t-1)] pr-4
        no-underline inline-flex cursor-pointer

        hover:underline'
        >{data?.author}</div>
        <span
        className='pr-8 text-[var(--t-3)]'
        >{data?.dateCreation}</span>
        <Link href={`/blog?blogId=${data?.id}`}
        className='text-[var(--t-1)] no-underline
        
        hover:underline'
        >{data?.title}</Link>
        <CanEdit id={data.authorId} blogId={data?.id}/>

        <div 
        style={{
          clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          backgroundImage:`url(${data?.coverImage})`,
          display:position.display,
          transform:`translate(${position.left}px,${position.top}px)`
      }}
        className='hidden group-hover:inline-block w-80 h-40 bg-[var(--t-4)]
        absolute rounded-md z-20 overflow-hidden left-0  
        bg-center bg-cover
        '>
          
          <div className='w-full h-hull overflow-hidden z-10'>
            <img loading='lazy'
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