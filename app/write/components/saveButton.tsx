"use client"
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useWrite } from '../../../contexts/writeContext'
import { doc,runTransaction,setDoc
} from 'firebase/firestore'
import { firestore } from '../../../firebase/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import IconSave from '../../../icons/save'
import { getBlogReadTime } from '../../../firebase/CLientFunctions'
import { useRouter } from 'next/navigation'
import { useNotifications } from '../../../contexts/NotificationContext'
import NotificationPortal from '../../signUp/components/notificationPortal'
import IconContentSaveCheckOutline from '../../../icons/saveYes'
type theProps = {
    
}
const SaveButton = ({}:theProps) => {
  const {user}=useAuth()
  const {setNotification,setOpenNotification
  ,openNotification}=useNotifications()
  const [success,setSuccess]=useState<boolean>(false)
  const {hasChanged,setHasChanged,
  localBlog,setLocalBlog,blogId
  }=useWrite()
const router = useRouter()
  useEffect(()=>{
    if (success){
      setTimeout(()=>{
        setSuccess(false)
      },2000)
    }
  },[success])
  const handleUpdateToFirebase =async ()=>{
    //❤️use callback
    //if SAVE criteria met
    if (localBlog.title!=="Untitled document"){
      if (blogId){
        //🧧improve length function
        let newReadTime= await getBlogReadTime(localBlog.content)
        //console.log(newReadTime,"newREADtime")
        setLocalBlog((prev)=>({...prev,readTime:newReadTime}))
        let newLocalBLog = {...localBlog,readTime:newReadTime}
        try {
          let blogRef = doc(firestore,"Blogs",localBlog.id)
          await runTransaction(firestore, async (t)=>{
            const docSnapShot = await t.get(blogRef)
            if (!docSnapShot.exists()){
              //❤️check erros
              console.log("error,no snapshot")
              return
            }
            t.update(blogRef,newLocalBLog)
          })
          setSuccess(true)
          setHasChanged((prev)=>false)
        }catch (err){
          console.log(err,"update failed")
        }
      }else {
        //make new blog
        //❤️check all fields are added in createBlog and here
        //blogId gives creation timestamp
        let newLocalBLog = {...localBlog}
        let timestamp = new Date().getTime().toString()
        let newBlogId = newLocalBLog.authorId+"blog"+timestamp
        
        newLocalBLog.latestUpdateTimeStamp = timestamp
        newLocalBLog.creationTimeStamp = parseInt(timestamp)
        //add blogId to doc.data()
        newLocalBLog.id =newBlogId
        if (newLocalBLog.userPhoto===undefined){
          newLocalBLog.userPhoto = ""
        }
        console.log(newLocalBLog)
        const docRef = doc(firestore,"Blogs",newBlogId)
        await setDoc(docRef,newLocalBLog)
        let newRoute= `/write?blogId=${newBlogId}`
        router.push(newRoute)
      }
    }else{
      //💭notify need cover and title
      console.log("not saving")
      setNotification((prev)=>
      ({type:"alert",message:"Please rename your document"}))
      setOpenNotification(true)
    }
  }
  const handleClick = ()=>{
    //setHasChanged(false)
    console.log("saving")
    handleUpdateToFirebase()
  }
  return (
    <button className='save__button CRUD__btn'
    style={{opacity:hasChanged?"1":"0.5"}}
    onClick={handleClick}
    disabled={!hasChanged}
    >
      {success? <IconContentSaveCheckOutline/> :<IconSave/>}
      {openNotification && <NotificationPortal/>}

      <div className='button__hover'>
          SAVE
      </div>
    </button>
  )
}

export default SaveButton