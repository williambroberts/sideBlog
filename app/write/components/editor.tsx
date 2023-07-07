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

const Editor = () => {
  const router = useRouter()
  const pathname= usePathname()
  const searchParams = useSearchParams()
  const {user}=useAuth()
  const [hasChanged,setHasChanged]=useState<boolean>(false)
  const {localBLog,setBlogId,blogId,setLocalBlog,
    setFireBlog,fireBLog,imgFile,setImgFile,
    initialBlogData,setProgress,
  }=useWrite()
  const handleNewImage = (type,id,e)=>{
    if (type==="body"){
      //❤️get index of input type img with id from localblog.content
      let newImgFile = {type:type,index:index,file:e.target.files[0]}
      setImgFile((prev)=>newImgFile)
    }else if (type==="cover"){
      let newImgFile = {type:type,file:e.target.files[0]}
      setImgFile((prev)=>newImgFile)
    }
    
    
  }

useEffect(()=>{
  const uploadFile = ()=>{
    const storageRef = ref(storage,imgFile.name)
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const snapshotProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + snapshotProgress + '% done');
    setProgress((prev)=>snapshotProgress)
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
      //❤️if imgFile is for cover or normal
      if (imgFile.type==="cover"){
        localBLog.cover=downloadURL
      }else if (imgFile.type==="body"){
        //❤️set url text for that img input component & localBlog corresponding 
        localBLog.content[imgFile.index].src=downloadURL

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
  let date = new Date()
      let fullDate = date.getDate().toString()+"/"
      +(1+date.getMonth()).toString()+"/"
       + date.getFullYear().toString()
  newBlogData.dateCreation = fullDate
  setLocalBlog(newBlogData)
  //clear localBLog, dont make Fb until SAVE
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
  if (localBLog.title!=="" && localBLog.coverImage!==""){
    if (blogId){
      try {
        let blogRef = doc(firestore,"Blogs",localBLog.id)
        await runTransaction(firestore, async (t)=>{
          const docSnapShot = await t.get(blogRef)
          if (!docSnapShot.exists()){
            //❤️check erros
            console.log("error,no snapshot")
            return
          }
          t.update(blogRef,{...localBLog})
        })
      }catch (err){
        console.log(err,"update failed")
      }
    }else {
      //make new blog
      
      
      let timestamp = new Date().getTime().toString()
      let newBlogId = user?.uid+"blog"+timestamp
      
      const docRef = doc(firestore,"Blogs",newBlogId)
      await setDoc(docRef,localBLog)
    }
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
    <div>
        
    </div>
  )
}

export default Editor