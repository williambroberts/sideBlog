"use client"
import React, { useEffect } from 'react'
import Button from './addTags/button'
import { useWrite } from '../../../contexts/writeContext';
import { useAuth } from '../../../contexts/AuthContext';
import SaveButton from './saveButton';
import { useBlogs } from '../../../contexts/BlogContext';
import IconCreateSharp from '../../../icons/new';
import IconDelete from '../../../icons/delete';
import IconListTask from '../../../icons/list';
interface theProps {
blogId:string;
}
const CRUD = ({blogId}:theProps) => {
    const {user,setUserDocData,userDocData,profileUserUid}=useAuth()
    const {hasChanged,setHasChanged,setBlogId,setImgFile,imgFile,
    setLocalBlog,localBlog,initialBlogData,fireBLog,isDelete,setIsDelete}=useWrite()
    const {setFilterByAuth}= useBlogs()
    console.log("fb",fireBLog,"loc",localBlog,"blogid",blogId)

    const createBlog = ()=>{
      setFilterByAuth(false)
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
      
      newBlogData.author = userDocData?.username 
      if (userDocData?.profilePhoto!==undefined){
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
        console.log("making new blog")
        createBlog()
      }
   },[])
  const handleEdit = ()=>{
    //get all user blogs from firebase and display them in the display
    setFilterByAuth(true)
  }
  const handleDelete = ()=>{
    if (blogId===null){
        //❤️create BLog
        createBlog()
        return
    }
    //delete blog from firebase,NOtification


    ///🧧create new blog

  }
  return (
    <header className='editor__header'>
        <Button
        className='editor__header__btn'
        handleClick={()=>createBlog()}
        >
            <IconCreateSharp/> NEW 
        </Button>
        <button className={`delete__btn ${isDelete?
      "px-0":"px-0"  
      }`}
        style={{width:isDelete?"0px":""}}
        onClick={()=>setIsDelete(true)}
        >
          <IconDelete/> Delete

        </button>
        <button className={`delete__btn ${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={()=>setIsDelete((prev)=>false)}
        style={{width:isDelete?"":"0px"}}
        >
          Cancel
        </button>
        <button className={`delete__btn ${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={handleDelete}
         style={{width:isDelete?"":"0px"}}
        >
          Delete
        </button>
        <Button
        className='editor__header__btn'
        handleClick={handleEdit}
        >
            <IconListTask/> Blogs
        </Button>
        <SaveButton/>
    </header>
  )
}

export default CRUD