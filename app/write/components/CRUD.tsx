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
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore, storage } from '../../../firebase/firebaseConfig';
import IconTickCircle from '../../../icons/tick';
import IconCancel from '../../../icons/cancel';
import IconBxArrowBack from '../../../icons/back';
import IconUpload from '../../../icons/upload';
import AddItem from './addItem';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import IconFormatTitle from '../../../icons/title';
import IconBxCategory from '../../../icons/category';
import IconCardImage from '../../../icons/image';
import { getABlogFromFirebase, getUserDoc, handleBlur } from '../../../firebase/CLientFunctions';
import { useRouter, useSearchParams } from 'next/navigation';
interface theProps {
blogId:string;
}
const CRUD = ({blogId}:theProps) => {
    const {user,setUserDocData,userDocData,profileUserUid}=useAuth()
    const {hasChanged,setHasChanged,setBlogId,setImgFile,imgFile,
    setLocalBlog,localBlog,initialBlogData,fireBLog,isDelete,setIsDelete
  ,setProgress,setFireBlog,setTemp,
  }=useWrite()
  const [titleWidth,setTitleWidth]=React.useState<number>(130)
    const {setFilterByAuth,filterByAuth}= useBlogs()
    const searchParams=useSearchParams()
    const router = useRouter()

  useEffect(()=>{
    fireBLog.content && setTemp((prev)=>fireBLog.content)
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
      const blogIdParam = searchParams.get("blogId")
      let authorId = blogIdParam.split("blog")[0]
      setTemp("")
      setFilterByAuth(false)
      //console.log("new blog")
      if (!hasChanged){
        setHasChanged(true)
      }
      
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
    }
   
   useEffect(()=>{

    let blogIdQP = searchParams.get("blogId")
    let timestamp = blogIdQP.split("blog")[1]
     console.log("🟩🧧❤️👍🏻🍔🌮",timestamp)
      if (timestamp===""){
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
   },[hasChanged,blogId,searchParams])
  const handleEdit = ()=>{
    console.log("get view of all blogs")
    //get all user blogs from firebase and display them in the display
    setFilterByAuth((prev)=>!prev)
    
  }
  const handleDelete = async(id)=>{
    if (blogId===null){
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
  return (
    <header className='editor__header'>
      <div className={`flex flex-row items-center
      gap-1 w-full 
      
      `}>
      <input
      onBlur={handleBlurTitle}
      style={{width:`${titleWidth}px`}}
      id="title-input"
      className='editor__title__input'
      value={localBlog?.title}
      onChange={(e)=>handleAddItem("title",e)}
      type="text"
      />
      </div>
      <div 
      id="write__header__div__bottom"
      className='flex flex-row 
      gap-1 
      items-center h-9'>

      
        {/* <AddItem 
        name='Title'
        type='text'
        
        icon={<IconFormatTitle/>}
        className='add__item'
        placeholder='Blog title'
        value={localBlog?.title}
        handleChange={(e)=>handleAddItem("title",e)}/> */}


        <Button
        className='py-1'
        handleClick={()=>createBlog()}
        >
            <IconCreateSharp/> NEW 
        </Button>
        <button className={`delete__btn ${isDelete?
      "px-0":"px-3 py-1"  
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
        <IconCancel/>  Cancel
        </button>
        <button className={`delete__btn ${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={()=>handleDelete(blogId)}
         style={{width:isDelete?"":"0px"}}
        >
         <IconTickCircle/> Delete
        </button>
        <Button
        className='py-1'
        handleClick={handleEdit}
        >
            {filterByAuth?
            <div className='flex flex-row items-center'>
              <IconBxArrowBack/> Back
            </div> 
            :
            <div className='flex flex-row items-center'>
              <IconListTask/> Blogs</div>}
        </Button>
        <SaveButton/>
        

        <label htmlFor='imgFile-input'
        className='cursor-pointer p-1 rounded-md 
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
        {/* <AddItem name="Image" 
        type='file'
        dataTheme="light"
        icon={<IconUpload/>}
        value={imgFile?.value}
        className='add__item'
        placeholder='Image'
        id='imgFile-input'
        
        handleChange={(e)=>handleNewImage(e)}
        /> */}

<AddItem name='Category' 
        type='text'
        icon={<IconBxCategory/>}
        className='add__item'
        placeholder='Category'
        
        value={localBlog?.category}
        handleChange={(e)=>handleAddItem("category",e)}
        />
        </div>
    </header>
  )
}

export default CRUD