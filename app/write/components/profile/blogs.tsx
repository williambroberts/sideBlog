"use client"
import React, { useEffect, useRef } from 'react'
import Animator from '../../../../components/animator/animator'
import SearchBar from '../../../../components/searchBar/searchbar'
import GetLatest from '../../../../components/home/getLatest'
import BlogList from '../../../../components/home/blogList'
import FetchMoreBlogs from '../../../../components/home/fetchMore'
import { useAuth } from '../../../../contexts/AuthContext'
import { useBlogs } from '../../../../contexts/BlogContext'
import { useSearchParams } from 'next/navigation'

const BlogsComponent = () => {
    const {userDocData,profileUserUid,user}=useAuth()
    const {blogs,getBlogsByLatest}=useBlogs()
    const searchParams = useSearchParams()
    
    useEffect(()=>{
       
        // more=false,filterbyauth,userArgs
        if (profileUserUid===undefined && user.uid){
          getBlogsByLatest(false,true,user?.uid)
        }else if (user===undefined || user===null){
          window.location.assign("/")
        }else{
           getBlogsByLatest(false,true,profileUserUid)
        }
       
    },[profileUserUid])
  return (
    <div className='w-full'>
        <Animator index={2}
    alignItems="flex-start"
    >
    <div className="text-[var(--t-3)] 
    font-normal 
    tracking-tight
    ">
      {/* Blog posts 🧧 get user details from params
      and display them
      */}
      </div>
    </Animator>

    <Animator index={2}
    alignItems="flex-start"
    >
<SearchBar
filterByAuthor={true}
userArg={profileUserUid}
/>
    </Animator >
    <Animator index={3}
    alignItems="flex-start"
    >
      <GetLatest 
      userArg={profileUserUid}
      filterByAuthor={true}
      />
    </Animator>
    <Animator index={4}
    alignItems="flex-start">
      <BlogList/>
    </Animator>
    <Animator index={5}
    alignItems="flex-start">
      <FetchMoreBlogs 
      filterByAuthor={true}
      userArg={profileUserUid}
      />
    </Animator>
    </div>
  )
}

export default BlogsComponent