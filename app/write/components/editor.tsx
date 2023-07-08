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

const Editor = () => {
  const router = useRouter()
  const pathname= usePathname()
  const searchParams = useSearchParams()
  const {user,setUserDocData,userDocData}=useAuth()
  const [hasChanged,setHasChanged]=useState<boolean>(false)
  const {localBlog,setBlogId,blogId,setLocalBlog,
    setFireBlog,fireBLog,imgFile,setImgFile,
    initialBlogData,setProgress,
  }=useWrite()
  // const add = (type)=>{
  //   let id = new Date().getTime().toString()
   
  //   let newContentItem = {type:type,id:id,text:""}
  //   let newLocalBlog = {...localBlog}
  //   newLocalBlog.content.push(newContentItem)
  //   setLocalBlog((prev)=>newLocalBlog)
  // }
  const handleWriting = (e) =>{
    let newLocalBlog = {...localBlog}
    newLocalBlog.content = e.target.value
    //❤️DEBOUNCE THE change
    setLocalBlog((prev)=>newLocalBlog)
    if( !hasChanged){
      setHasChanged((prev)=>true)
    }
    
    
  }
  const handleNewImage = (e)=>{
    //❤️SAVE button
    let newImgFile = {file:e.target.files[0]}
    setImgFile((prev)=>newImgFile)
    
    
  }

useEffect(()=>{
  const uploadFile = ()=>{
    const storageRef = ref(storage,imgFile.name)
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

     
        localBlog.uploadedImages.push(downloadURL)
      if (!hasChanged){
          setHasChanged((prev)=>true)
        }
      

    });
  }
);
  }
console.log(imgFile)
imgFile && uploadFile()
},[imgFile])

useEffect(()=>{
  const newBlogId = searchParams.get("blogId")
  
  setBlogId(newBlogId)
},[searchParams])


const createBlog = ()=>{
  setBlogId(null)
  let newBlogData = {...initialBlogData}
  //author, authorId, ❤️all fields filled in
   newBlogData.authorId = user.uid;

  newBlogData.author = userDocData.username 
  newBlogData.userPhoto = userDocData.profilePhoto
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
const handleUpdateToFirebase =async ()=>{
  //❤️use callback
  //if SAVE criteria met
  if (localBlog.title!=="" && localBlog.coverImage!==""){
    if (blogId){
      try {
        let blogRef = doc(firestore,"Blogs",localBlog.id)
        await runTransaction(firestore, async (t)=>{
          const docSnapShot = await t.get(blogRef)
          if (!docSnapShot.exists()){
            //❤️check erros
            console.log("error,no snapshot")
            return
          }
          t.update(blogRef,{...localBlog})
        })
      }catch (err){
        console.log(err,"update failed")
      }
    }else {
      //make new blog
      //❤️check all fields are added in createBlog and here
      //blogId gives creation timestamp
      let timestamp = new Date().getTime().toString()
      let newBlogId = user?.uid+"blog"+timestamp
      localBlog.latestUpdateTimeStamp = timestamp
      const docRef = doc(firestore,"Blogs",newBlogId)
      await setDoc(docRef,localBlog)
    }
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
  console.log(newLocalBlog.key,e.target.value)
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
      editor
      {/* create or edit */}
      {/* uploadedImages real */}
      <UploadedImages images={["a","v","a","c","e","e"]}/>
      <AddItem name='Upload Image' 
        type='file'
        className='add__item'
        placeholder='Upload Image'
        value={imgFile}
        handleChange={(e)=>handleNewImage(e)}
        />
        {/* title */}
        <AddItem name='Category' 
        type='text'
        className='add__item'
        placeholder='Category'
        value={localBlog.category}
        handleChange={(e)=>handleAddItem("category",e)}
        />
        <AddItem 
        name='Title'
        type='text'
        className='add__item'
        placeholder='Blog title'
        value={localBlog.title}
        handleChange={(e)=>handleAddItem("title",e)}/>
{/* cover image */}


        <textarea
        // autoFocus
        className='write__textarea'
        value={localBlog.content}
        onChange={(e)=>handleWriting(e)}
        >
          
        </textarea>
        {/* save to firebase */}
    </div>
  )
}

export default Editor