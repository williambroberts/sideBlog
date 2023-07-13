"use client"
import React, { useEffect, useState } from 'react'
import { useWrite } from '../../../contexts/writeContext'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  const router = useRouter()
  const pathname= usePathname()
  const searchParams = useSearchParams()
  const {user,setUserDocData,userDocData}=useAuth()
  const [temp,setTemp]=useState<string>("")
  const wait = 1000
  const [last,setLast]=useState<number>(0)
  const {localBlog,setBlogId,blogId,setLocalBlog,
    setFireBlog,fireBLog,imgFile,setImgFile,
    initialBlogData,setProgress,hasChanged,setHasChanged
  }=useWrite()
  

  useEffect(()=>{
    const newBlogId = searchParams.get("blogId")
    setBlogId(newBlogId)
    console.log("blogID",blogId)//💭remove log
    blogId && getFireBlog()
  },[])

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
        console.log(localBlog,"🧧")
        if (last!==0){
          setLocalBlog((prev)=>({
          ...prev,content:temp
        }))
        }
        
    },delay)
    return ()=>{
      clearTimeout(timeout)}
  },[temp])

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
  console.log(imgFile,"imgFile")
}
},[imgFile])

useEffect(()=>{
  const newBlogId = searchParams.get("blogId")
  
  setBlogId(newBlogId)
},[searchParams])


const createBlog = ()=>{
  if (!hasChanged){
    setHasChanged(true)
  }
  setImgFile({value:"",file:null})
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

const getFireBlog = async ()=>{
  //❤️use callback
  if (blogId===null) return;
  const docRef = doc(firestore,"Blogs",blogId)
  const snapShot = await getDoc(docRef)
  if (snapShot.exists()){
    setFireBlog({...snapShot.data()})
  }
}

const handleAddItem = (key,e)=>{
  
  let newLocalBlog = {...localBlog}
  if (key==="title"){
    newLocalBlog.title=e.target.value
  }else if (key==="category"){
    newLocalBlog.category = e.target.value
  }else if (key==="coverImage"){
    newLocalBlog.coverImage = e.target.value
  }
  //newLocalBlog.key = e.target.value
  console.log(key,e.target.value)
  //debounce❤️
  setLocalBlog(newLocalBlog)
  if (!hasChanged){
    setHasChanged((prev)=>true)
  }

}


useEffect(()=>{
  //if just pressed save reget DOc
  console.log(hasChanged,"hasChanged",blogId,"blogId")
  //hasChanged FALSE when press save=>handleUpdateToFirebase
  if (!hasChanged && blogId!==null){
    getFireBlog()
  }

},[hasChanged,blogId])

//  useEffect(()=>{
//     //set new searchParams
//     router.push(pathname+"?"+)
//   },[blogId])
  return (
    <div className='editor'>
      <CRUD blogId={fireBLog?.blogId}/>
      {/* create or edit */}
      {/* uploadedImages real */}
      <UploadedImages images={localBlog?.uploadedImages}/>
      <AddItem name='Upload Image' 
        type='file'
        dataTheme="light"
        icon={<IconUpload/>}
        value={imgFile?.value}
        className='add__item'
        placeholder='Upload Image'
        id='imgFile-input'
        handleChange={(e)=>handleNewImage(e)}
        />
        {/* title */}
        <AddItem name='Category' 
        type='text'
        icon={<IconBxCategory/>}
        className='add__item'
        placeholder='Category'
        value={localBlog?.category}
        handleChange={(e)=>handleAddItem("category",e)}
        />
        <AddItem 
        name='Title'
        type='text'
        icon={<IconFormatTitle/>}
        className='add__item'
        placeholder='Blog title'
        value={localBlog?.title}
        handleChange={(e)=>handleAddItem("title",e)}/>
{/* cover image */}

        <span className='text-sm inline-flex items-center gap-1
        uppercase font-light leading-tight'>
           <IconWrite/> Write your blog 
        </span>
        <textarea id='write__textarea'
        // autoFocus
        placeholder={"Blog content"}
        onInput={(e)=>handleResize(e)}
        className='
        
        '
        value={localBlog?.content}
        onChange={(e)=>handleWriting(e)}
        >
          
        </textarea>
        <TagManager tags={localBlog?.tags}/>
        <AddTag/>
        {/* save to firebase */}
    </div>
  )
}

export default Editor