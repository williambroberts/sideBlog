"use client"
import React, { MouseEventHandler } from 'react'
import { useWrite } from '../../../contexts/writeContext'
import { doc,runTransaction,setDoc
} from 'firebase/firestore'
import { firestore } from '../../../firebase/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import IconSave from '../../../icons/save'
import { getBlogReadTime } from '../../../firebase/CLientFunctions'
type theProps = {
    
}
const SaveButton = ({}:theProps) => {
  const {user}=useAuth()
  const {hasChanged,setHasChanged,
  localBlog,setLocalBlog,blogId
  }=useWrite()
  const handleUpdateToFirebase =async ()=>{
    //❤️use callback
    //if SAVE criteria met
    if (localBlog.title!=="" && localBlog.coverImage!==""){
      if (blogId){
        //🧧improve length function
        localBlog.readTime=getBlogReadTime(localBlog.content)
        
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
        let newLocalBLog = {...localBlog}
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
      }
    }else{
      //💭notify need cover and title
      console.log("not saving")
    }
  }
  const handleClick = ()=>{
    setHasChanged(true)
    console.log("saving")
    handleUpdateToFirebase()
  }
  return (
    <button className='save__button'
    onClick={handleClick}
    disabled={!hasChanged}
    >
      <IconSave/> SAVE
    </button>
  )
}

export default SaveButton