"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import Display from '../write/components/display/display'
import { firestore } from '../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useWrite } from '../../contexts/writeContext'

const BlogPage = () => {
    const searchParams = useSearchParams()
    const newBlogId = searchParams.get("blogId")
    const {setFireBlog,blogId,fireBLog}=useWrite()
    const getFireBlog = async ()=>{
      //❤️use callback
      //if (blogId===null) return;
      const docRef = doc(firestore,"Blogs",newBlogId)
      const snapShot = await getDoc(docRef)
      if (snapShot.exists()){
        setFireBlog({...snapShot.data()})
      }
    }
    useEffect(()=>{
      getFireBlog()
    },[])
  
  return (
    <main className='page'>
        <Display source={fireBLog}/>
    </main>
  )
}

export default BlogPage