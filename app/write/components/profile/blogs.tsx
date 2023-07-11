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
    const {userDocData}=useAuth()
    const {blogs,getBlogsByLatest}=useBlogs()
    const searchParams = useSearchParams()
    const userArgRef = useRef<string|undefined>("")
    useEffect(()=>{
        let userArg = searchParams.get("Auth")
        userArgRef.current=userArg
        // more=false,filterbyauth,userArgs
        getBlogsByLatest(false,true,userArg)
    },[])
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
userArg={userArgRef?.current}
/>
    </Animator >
    <Animator index={3}
    alignItems="flex-start"
    >
      <GetLatest 
      userArg={userArgRef?.current}
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
      userArg={userArgRef?.current}
      />
    </Animator>
    </div>
  )
}

export default BlogsComponent