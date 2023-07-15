"use client"
import React, { useEffect, useState } from 'react'
import { useWrite } from '../../../contexts/writeContext'

import { doc, getDoc, runTransaction, setDoc } from 'firebase/firestore'
import { firestore,storage } from '../../../firebase/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import { getStorage, ref, 
  getDownloadURL,
  uploadBytesResumable 
} from "firebase/storage";
import AddTitle from './addItem'
import AddItem from './addItem'
import UploadedImages from './uploadImages/uploadedImages'
import AddTag from './addTags/addTag'
import TagManager from './addTags/manageTags'
import CRUD from './CRUD'
import IconUpload from '../../../icons/upload'
import IconBxCategory from '../../../icons/category'
import IconFormatTitle from '../../../icons/title'
import IconWrite from '../../../icons/write'

const Editor = () => {
  
  
  
  const {user,setUserDocData,userDocData}=useAuth()
  
  const {localBlog,setBlogId,blogId,setLocalBlog,
    setFireBlog,fireBLog,imgFile,setImgFile,wait,temp,setTemp,last,setLast,
    initialBlogData,setProgress,hasChanged,setHasChanged
  }=useWrite()
  

  

  const handleResize = (e)=>{
    const textarea = document.getElementById("write__textarea")
    textarea.style.height="auto"
    textarea.style.height=`${textarea.scrollHeight}px`
  }
  const handleWriting = (e) =>{
    setTemp(e.target.value)
    //❤️DEBOUNCE THE change
   
    if( !hasChanged){
      setHasChanged((prev)=>true)
    }
    
    
  }

  useEffect(()=>{
    //🧧period debounce handler
    let NOW = new Date().getTime()
    
    let delay  = Math.max(0,(last+wait-NOW))
    let timeout = setTimeout(()=>{
        setLast(NOW)
        console.log(localBlog,"🧧",last)
        if (last!==0){
          setLocalBlog((prev)=>({
          ...prev,content:temp
        }))
        }
        
    },delay)
    return ()=>{
      clearTimeout(timeout)}
  },[temp])















  return (
    <div className='editor'>
      <CRUD blogId={fireBLog?.blogId}/>
     
      {/* <UploadedImages images={localBlog?.uploadedImages}/> */}
      <div className='w-full flex flex-row items-center gap-1'>
      
      
       
       
      </div>
      

{/* 
        <span className='text-sm inline-flex items-center gap-1
        uppercase font-light leading-tight'>
           <IconWrite/> Write your blog 
        </span> */}
        <textarea id='write__textarea'
        // autoFocus

        placeholder={"✎ write your blog"}
        onInput={(e)=>handleResize(e)}
        className='box-border resize-none
        h-full w-full border-none
        '
        value={temp}
        onChange={(e)=>handleWriting(e)}
        >
          
        </textarea>
        {/* <TagManager tags={localBlog?.tags}/>
        <AddTag/> */}
        {/* save to firebase */}
    </div>
  )
}

export default Editor