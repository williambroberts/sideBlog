"use client"
import React,{memo, useEffect} from 'react'
import { useBlogs } from '../../contexts/BlogContext'
import Animator from '../animator/animator'
import BlogLink from './blogLink'
import {v4} from "uuid"
import TopBlogLink from './TopBlogLink'
interface theProps {

}
const MostViewedBlogs = ({}:theProps) => {
  function getDevice(){
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
const desktop = getDevice()

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
      <section className={`grid grid-cols-1  ${desktop? "gap-0":"gap-4"} w-full`}>
      {mostViewedBlogs?.map((item,index)=><div key={v4()} 
       className='w-full'
       >
      <Animator alignItems='center' index={index}>
        {desktop?       <BlogLink data={item} topViewed={true}
         rank={index+1}/> : 
         <TopBlogLink data={item} rank={index+1}/>
         }
   
         
      </Animator>
       
       </div>)}
      </section>
      
    </div>
  )
}

export default (MostViewedBlogs)