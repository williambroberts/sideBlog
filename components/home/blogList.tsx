"use client"
import React, { useCallback, useEffect } from 'react'
import { useBlogs } from '../../contexts/BlogContext'
import BlogLink from './blogLink'

import {v4} from "uuid"
import Animator from '../animator/animator'
import IconTags from '../../icons/tags'
import IconClear from '../../icons/clear'
const BlogList = () => {
    const {blogs,mode,stateTag,
    getBlogsByLatest,setMode,
    }=useBlogs()
   
   
    const handleClear = useCallback(()=>{
        getBlogsByLatest(false,false)
        setMode("none")
    },[])

    if (blogs===null){
      return <div>Loading</div> 
     } 
  return (
    <div className={`blog__list w-full`}>
      {mode==="tag"? 
      <div
      className='flex flex-row items-center gap-1
      '
      ><IconTags/>{stateTag} 
      <button 
      className='flex flex-row items-center
      px-1 relative'
      onClick={handleClear}>
        <IconClear/>
      </button>
      </div>
      :""}
       {blogs?.map((item,index)=><div key={v4()} 
       className='w-full'
       >
      <Animator alignItems='flex-start' index={index}>
         <BlogLink data={item}/>
      </Animator>
       
       </div>)}
    </div>
  )
}

export default BlogList