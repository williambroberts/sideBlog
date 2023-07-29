"use client"
import React,{memo, useEffect} from 'react'
import { useBlogs } from '../../contexts/BlogContext'
import Animator from '../animator/animator'
import BlogLink from './blogLink'
import {v4} from "uuid"
interface theProps {

}
const MostViewedBlogs = ({}:theProps) => {
    const {mostViewedBlogs,handleGetMostViewedBlogs}=useBlogs()
    //console.log(mostViewedBlogs)

    useEffect(()=>{
handleGetMostViewedBlogs()
    },[])
  return (
    <div className='
    mt-12
    w-full flex flex-col
    
    '>
      <span
      className='flex px-3 py-4'
      >Most Viewed Blogs</span>
        {mostViewedBlogs?.map((item,index)=><div key={v4()} 
       className='w-full'
       >
      <Animator alignItems='flex-start' index={index}>
         <BlogLink data={item} topViewed={true}
         rank={index+1}/>
      </Animator>
       
       </div>)}
    </div>
  )
}

export default memo(MostViewedBlogs)