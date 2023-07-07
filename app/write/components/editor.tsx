"use client"
import React, { useEffect, useState } from 'react'
import { useWrite } from '../../../contexts/writeContext'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../../firebase/firebaseConfig'

const Editor = () => {
  const router = useRouter()
  const pathname= usePathname()
  const searchParams = useSearchParams()
  const [hasChanged,setHasChanged]=useState<boolean>(false)
  const {localBLog,setBlogId,blogId,
    setFireBlog,fireBLog,imgFile,setImgFile
  }=useWrite()
useEffect(()=>{
  const newBlogId = searchParams.get("blogId")
  
  setBlogId(newBlogId)
},[searchParams])

const createBlog = ()=>{
  setBlogId(null)
  //clear localBLog, dont make Fb until SAVE
}
const getFireBlog = async ()=>{
  if (blogId===null) return;
  const docRef = doc(firestore,"Blogs",blogId)
  const snapShot = await getDoc(docRef)
  if (snapShot.exists()){
    setFireBlog({...snapShot.data()})
  }
}
useEffect(()=>{
  //if just pressed save reget DOc
  console.log(hasChanged,"hasChanged",blogId,"blogId")
  if (!hasChanged && blogId!==null){
    getFireBlog()
  }

},[hasChanged,blogId])

//  useEffect(()=>{
//     //set new searchParams
//     router.push(pathname+"?"+)
//   },[blogId])
  return (
    <div>
        
    </div>
  )
}

export default Editor