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
    const {userDocData,profileUserUid,user,setProfileUserUid}=useAuth()
    const {blogs,getBlogsByLatest,filterByAuth}=useBlogs()
    const searchParams = useSearchParams()
    
    useEffect(()=>{
       console.log(filterByAuth,"filterByAUths",profileUserUid)
        // more=false,filterbyauth,userArgs
        if ((profileUserUid===undefined && user.uid) ||
        (profileUserUid===null && user.uid)){
          getBlogsByLatest(false,true,user?.uid)
          setProfileUserUid(user.uid)
        }else if (user===undefined || user===null){
          window.location.assign("/")
        }else{
          console.log("else",profileUserUid,user.uid)
           getBlogsByLatest(false,true,profileUserUid)
        }
       
    },[profileUserUid,filterByAuth])
  return (
    <div className='w-full overflow-scroll bg-[var(--bg-1)] pt-[60px]'>
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