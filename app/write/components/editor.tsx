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
  
  
  const {localBlog,setLocalBlog,setRedo,setHistory,history,
    setFireBlog,fireBLog,wait,temp,setTemp,last,setLast,
    initialBlogData,hasChanged,setHasChanged
  }=useWrite()
  

  

  const handleResize = (e)=>{
    return
    const editor = document.getElementById("editor")
    let editorHeight = editor.offsetHeight
    const textarea = document.getElementById("write__textarea")
    textarea.style.height="auto"
    let newHeight=editorHeight
    
    console.log(newHeight)
    textarea.style.height=`${newHeight}px`
  }
  const handleWriting = (e) =>{
    setTemp(e.target.value)
    //.🍏clear REDO 
    setRedo("")
    let historyCopy = history.slice()
    historyCopy.push(e.target.value)
    //❤️DEBOUNCE THE change
    setHistory(historyCopy)
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
        //console.log(localBlog,"🧧",last)
        if (last!==0){
          //🍏undo update

          setLocalBlog((prev)=>({
          ...prev,content:temp
        }))
        }
        
    },delay)
    return ()=>{
      clearTimeout(timeout)}
  },[temp])















  return (
    <div className='editor' id="editor">
      <CRUD blogId={fireBLog?.blogId}/>
     
      
        <textarea id='write__textarea'
        // autoFocus
        //resize none ,scrollHeight, auto
        placeholder={"✎ write your blog"}
        onInput={(e)=>handleResize(e)}
        className='write__textarea'
        
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