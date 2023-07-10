"use client"
import React from 'react'
import Animator from '../../../../components/animator/animator'
import SearchBar from '../../../../components/searchBar/searchbar'
import GetLatest from '../../../../components/home/getLatest'
import BlogList from '../../../../components/home/blogList'
import FetchMoreBlogs from '../../../../components/home/fetchMore'
import { useAuth } from '../../../../contexts/AuthContext'

const BlogsComponent = () => {
    const {userDocData}=useAuth()
  return (
    <div>
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
<SearchBar/>
    </Animator >
    <Animator index={3}
    alignItems="flex-start"
    >
      <GetLatest/>
    </Animator>
    <Animator index={4}
    alignItems="flex-start">
      <BlogList/>
    </Animator>
    <Animator index={5}
    alignItems="flex-start">
      <FetchMoreBlogs/>
    </Animator>
    </div>
  )
}

export default BlogsComponent