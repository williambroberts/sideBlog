"use client"
import React, { useEffect } from 'react'
import { useBlogs } from '../../contexts/BlogContext'
import BlogLink from './blogLink'

import {v4} from "uuid"
import Animator from '../animator/animator'
const BlogList = () => {
    const {blogs}=useBlogs()
   if (blogs===null){
    return <div>Loading</div>
   } 
    
  return (
    <div className={`blog__list w-full`}>
      
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