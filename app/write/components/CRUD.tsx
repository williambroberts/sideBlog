"use client"
import React, { useEffect, useState } from 'react'
import Button from './addTags/button'
import { useWrite } from '../../../contexts/writeContext';
import { useAuth } from '../../../contexts/AuthContext';
import SaveButton from './saveButton';
import { useBlogs } from '../../../contexts/BlogContext';
import IconCreateSharp from '../../../icons/new';
import IconDelete from '../../../icons/delete';
import IconListTask from '../../../icons/list';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore, storage } from '../../../firebase/firebaseConfig';
import IconTickCircle from '../../../icons/tick';
import IconCancel from '../../../icons/cancel';
import IconBxArrowBack from '../../../icons/back';
import IconUpload from '../../../icons/upload';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import IconFormatTitle from '../../../icons/title';
import IconBxCategory from '../../../icons/category';
import IconCardImage from '../../../icons/image';
import { getABlogFromFirebase, getUserDoc, handleBlur, useBoolean } from '../../../firebase/CLientFunctions';
import { useRouter, useSearchParams } from 'next/navigation';
import UploadedImages from './uploadImages/uploadedImages';
import AddTag from './addTags/addTag';
import IconDocumentAdd from '../../../icons/newdocument';
import UndoManager from './undo/undoManager';
import IconBasic_elaboration_document_check from '../../../icons/newDocTick';
interface theProps {
blogId:string;
}
const CRUD = ({blogId}:theProps) => {
    const {user,setUserDocData,userDocData,profileUserUid}=useAuth()
    const {hasChanged,setHasChanged,setBlogId,setImgFile,imgFile,
    setLocalBlog,localBlog,initialBlogData,fireBLog,isDelete,setIsDelete
  ,setProgress,setFireBlog,setTemp,
  }=useWrite()
  const [isCreateBlogClicked,handleCreateBlogClicked]=useState(false)
  const [isCategory,setIsCategory]=useState<any>(false)
  const [catWidth,setCatWidth]=React.useState<number>(80)
  const [titleWidth,setTitleWidth]=React.useState<number>(130)
    const {setFilterByAuth,filterByAuth}= useBlogs()
    const searchParams=useSearchParams()
    const router = useRouter()

  useEffect(()=>{
    fireBLog?.content && setTemp((prev)=>fireBLog?.content)
  },[fireBLog?.content])

    const handleNewImage = (e)=>{
      //❤️SAVE button

      let newImgFile = {file:e.target.files[0],value:e.target.value}
      console.log(e.target.value,e.target.files[0])
      setImgFile((prev)=>newImgFile)
    }
    const uploadFile = ()=>{
      const storageRef = ref(storage,imgFile.file.name)
      const uploadTask = uploadBytesResumable(storageRef, imgFile.file);
      uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const snapshotProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + snapshotProgress + '% done');
      setProgress((prev)=>snapshotProgress)
      //❤️progressBAR
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        default:
          console.log(error,error.code)
          break
      }
    }, () => {
     
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
          let newLocalBlog = {...localBlog}
          console.log(newLocalBlog)
          newLocalBlog.uploadedImages.push(downloadURL)
          setLocalBlog((prev)=>newLocalBlog)
         
        if (!hasChanged){
            setHasChanged((prev)=>true)
          }
        
  
      });
    }
  );
    }



  useEffect(()=>{
  //💭if imgFile not null , null on pageload and reset and noFB blog
  if (imgFile?.file!==null){
    imgFile.file && uploadFile()
  }
  return ()=>{
    //console.log(imgFile,"imgFile")
  }
  },[imgFile])

    const createBlog =async ()=>{
      console.log("creatingBLog")
      const blogIdParam = searchParams.get("blogId")
      let authorId = blogIdParam.split("blog")[0]
      setTemp("")
      setFilterByAuth(false)
      //console.log("new blog")
      setHasChanged(false) //🟩cannot save unchanched doc
      try {
        let userData = await getUserDoc(authorId)
        let newImgFile = {value:"",file:null}
        setImgFile(newImgFile)
        setBlogId(null)
        let newBlogData = {...initialBlogData}
        //author, authorId, ❤️all fields filled in
         newBlogData.authorId =authorId
        newBlogData.author = userData?.username 
        
        newBlogData.userPhoto = userData?.profilePhoto
         
        
        
        let date = new Date()
            let fullDate = date.getDate().toString()+"/"
            +(1+date.getMonth()).toString()+"/"
             + date.getFullYear().toString()
        newBlogData.dateCreation = fullDate
        //console.log(newBlogData,"newBlogData🟩")
        setLocalBlog(newBlogData)
        let newRoute = `/write?blogId=${authorId}blognewBlog`
        router.push(newRoute)
        //clear localBlog, dont make Fb until SAVE
      }catch(err){
        console.log(err)
      }
      
    }
   
   useEffect(()=>{

    let blogIdQP = searchParams.get("blogId")
    let timestamp = blogIdQP.split("blog")[1]
     console.log("🟩🧧❤️👍🏻🍔🌮",timestamp,"timestamp")
      if (timestamp===""||timestamp==="newBlog"
      ||timestamp===undefined){
        console.log("making new blog❤️🧧🟩")
        createBlog()  
      }else if (timestamp!=="newBlog"){
        setBlogId(blogIdQP)
        getABlogFromFirebase(blogIdQP).then((theBlog)=>{
          setFireBlog({...theBlog})
          setLocalBlog({...theBlog})
          console.log(theBlog)
        }).catch((error)=>console.log(error))
      }
   },[searchParams])
  const handleEdit = ()=>{
    console.log("get view of all blogs")
    //get all user blogs from firebase and display them in the display
    setFilterByAuth((prev)=>!prev)
    
  }
  const handleDelete = async(id)=>{
    console.log(id,"handleDelete")
    if (id===null || id===undefined){
        //❤️create BLog
        createBlog()
        return
    }
    //delete blog from firebase,NOtification
    const docRef =doc(firestore,"Blogs",id)
    await deleteDoc(docRef)
    createBlog()

    ///🧧create new blog

  }
  const handleAddItem = (key,e)=>{
  
    let newLocalBlog = {...localBlog}
    if (key==="title"){
        let inputTag = document.getElementById("title-input")
        let newWidth=inputTag.scrollWidth
        setTitleWidth(newWidth)
        newLocalBlog.title=e.target.value
      
      
    }else if (key==="category"){
      let inputTag = document.getElementById("ip-cat")
        let newWidth=inputTag.scrollWidth
        setCatWidth(newWidth)
       
     
        newLocalBlog.category = e.target.value
      
      
    }else if (key==="coverImage"){
      if (e.target.value===""){
        newLocalBlog.coverImage = "https://picsum.photos/320/200"
      }else {
        newLocalBlog.coverImage = e.target.value
      }
      
    }
    //newLocalBlog.key = e.target.value
    console.log(key,e.target.value)
    //debounce❤️
    setLocalBlog(newLocalBlog)
    if (!hasChanged){
      setHasChanged((prev)=>true)
    }
  
  }
  const handleBlurTitle = (event)=>{
    if (event.target.value===""){
      setTitleWidth(130)
      setLocalBlog((prev)=>({...prev,title:"Untitled document"}))
    }
  }
  const handleCreateBlog = ()=>{
    createBlog()
    handleCreateBlogClicked((prev)=>!prev)
    setTimeout(()=>{handleCreateBlogClicked((prev)=>!prev)},2000)
  }
  useEffect(()=>{
    function closeCategory(e){
      let elem = e.target
      let x = e.clientX
      let y = e.clientY
      let label = document.getElementById("label-category")
      if (label!==undefined){
        let labelRect = label.getBoundingClientRect()
        if (x >labelRect.right || x<labelRect.left ||
          y<labelRect.top || y>labelRect.bottom){
            setIsCategory(false)
          }
      }
      
      //console.log(labelRect,e.clientX)
      
    }
    document.addEventListener("mousedown",closeCategory)
    return ()=>{
      document.removeEventListener("mousedown",closeCategory)
    }
  },[])
  const handleBlurCategory = (e)=>{
    e.preventDefault()
    if (e.target.value===""){
      setLocalBlog((prev)=>({...prev,category:"Category"}))
    }
  }
  const handleCategory = (e)=>{
    e.preventDefault()
    setIsCategory((prev)=>!prev)
  }
  return (
    <header className='editor__header'
    data-theme="dark"
    > <div className='flex flex-col'>
      <div className={`flex flex-row items-center
      gap-1 w-full py-0 text-base
      
      `}>
        <IconFormatTitle/>
      <input
      onBlur={handleBlurTitle}
      style={{width:`${titleWidth}px`}}
      id="title-input"
      className='editor__title__input'
      value={localBlog?.title===undefined?"":localBlog?.title}
      onChange={(e)=>handleAddItem("title",e)}
      type="text"
      />
      
      </div>
      <div 
      id="write__header__div__bottom"
      className='flex flex-row 
      gap-1 
      items-center h-[30px]'>

      
   


        <Button
        hoverText='New'
        className={`py-1 px-1 static CRUD__btn `}
        handleClick={()=>handleCreateBlog()}
        >
           {isCreateBlogClicked?<IconBasic_elaboration_document_check/>
            :<IconDocumentAdd/> }
        </Button>
        <button className={`delete__btn CRUD__btn ${isDelete?
      "px-0":"px-1 py-0"  
      }`}
        style={{width:isDelete?"0px":""}}
        onClick={()=>setIsDelete(true)}
        >
          <IconDelete/> 

          <div className='button__hover'>
            Delete
          </div>
        </button>
        <button className={`delete__btn 
        CRUD__btn
        ${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={()=>setIsDelete((prev)=>false)}
        style={{width:isDelete?"":"0px"}}
        >
        <IconCancel/>  
        <div className='button__hover'>
          Cancel
        </div>
        </button>
        <button className={`delete__btn CRUD__btn ${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={()=>handleDelete(blogId)}
         style={{width:isDelete?"":"0px"}}
        >
         <IconTickCircle/> 
         <div className='button__hover'>
          Delete
         </div>
        </button>
        <Button
        className='py-0'
        handleClick={handleEdit}
        >
            {filterByAuth?
            <div className={`flex flex-col items-center
            CRUD__btn
            `}>
              <IconBxArrowBack/>
              <div className='button__hover'>
                Back
              </div>
            </div> 
            :
            <div className={`flex flex-col items-center
            CRUD__btn
            `}>
              <IconListTask/>
              <div className='button__hover'>
            View blogs
          </div>
              </div>}
        </Button>
        <UndoManager/>
        <SaveButton/>
        

        <label htmlFor='imgFile-input'
        className='cursor-pointer px-1 py-0 rounded-md 
        flex items-center 
        '
        ><IconCardImage/>
        <input 
        className='hidden'
         id="imgFile-input"
        type="file" value={imgFile?.value}
        onChange={(e)=>handleNewImage(e)}
        />
        <div className='label__hover'
        data-theme="dark"
        >
            Upload Image
        </div>
        </label>
        
        <label id="label-category"
        htmlFor='ip-cat'
        
        className='flex items-center
        rounded-md
        px-0 py-0 cursor-pointer
        '>
          <button className='
          px-1 py-0 box-border flex items-center
          h-full '
          
          onClick={handleCategory}>
             <IconBxCategory/>
          </button>
         
            <input type='text' 
           
            onBlur={handleBlurCategory}
            className='px-0 py-0 border-none 
            rounded-md'
            style={{width:isCategory?`${catWidth}px`:"0px"}}
            value={localBlog?.category===undefined?
              "":localBlog?.category}
              id="ip-cat"
              placeholder='category'
              onInput={(e)=>handleAddItem("category",e)}
              />
              <div className='label__hover'
        data-theme="dark"
        >
            Category
        </div>
        </label>

{/* <AddItem name='Category' 
        type='text'
        icon={<IconBxCategory/>}
        className='add__item'
        placeholder='Category'
        
        
        handleChange={(e)=>handleAddItem("category",e)}
        /> */}
        
        </div>
        </div>
        <UploadedImages images={localBlog?.uploadedImages}/>
        <AddTag/>
    </header>
  )
}

export default React.memo(CRUD)