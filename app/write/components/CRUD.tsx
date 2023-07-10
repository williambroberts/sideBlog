"use client"
import React, { useEffect } from 'react'
import Button from './addTags/button'
import { useWrite } from '../../../contexts/writeContext';
import { useAuth } from '../../../contexts/AuthContext';
import SaveButton from './saveButton';
interface theProps {
blogId:string;
}
const CRUD = ({blogId}:theProps) => {
    const {user,setUserDocData,userDocData}=useAuth()
    const {hasChanged,setHasChanged,setBlogId,setImgFile,imgFile,
    setLocalBlog,localBlog,initialBlogData,fireBLog}=useWrite()
    console.log("fb",fireBLog,"loc",localBlog,"blogid",blogId)

    const createBlog = ()=>{
      console.log("new blog")
      if (!hasChanged){
        setHasChanged(true)
      }
      
     
      let newImgFile = {value:"",file:null}
      setImgFile(newImgFile)
      setBlogId(null)
      let newBlogData = {...initialBlogData}
      //author, authorId, ❤️all fields filled in
       newBlogData.authorId = user.uid;
      
      newBlogData.author = userDocData.username 
      if (userDocData.profilePhoto!==undefined){
        newBlogData.userPhoto = userDocData.profilePhoto
        console.log(userDocData.profilePhoto)
      }
      
      let date = new Date()
          let fullDate = date.getDate().toString()+"/"
          +(1+date.getMonth()).toString()+"/"
           + date.getFullYear().toString()
      newBlogData.dateCreation = fullDate
      setLocalBlog(newBlogData)
      //clear localBlog, dont make Fb until SAVE
    }
   useEffect(()=>{
      if (blogId===null || blogId===undefined){
        createBlog()
      }
   },[])
  const handleEdit = ()=>{
    //get all user blogs from firebase and display them in the display

  }
  const deleteBlog = ()=>{
    if (blogId===null){
        //❤️create BLog
        createBlog()
        return
    }
    //delete blog from firebase,NOtification

  }
  return (
    <header className='editor__header'>
        <Button
        className='editor__header__btn'
        handleClick={()=>createBlog()}
        >
            NEW BLOG
        </Button>
        <Button
        className='editor__header__btn'
        handleClick={deleteBlog}
        >
            DELETE BLOG 
        </Button>
        <Button
        className='editor__header__btn'
        handleClick={handleEdit}
        >
            EDIT ANOTHER
        </Button>
        <SaveButton/>
    </header>
  )
}

export default CRUD