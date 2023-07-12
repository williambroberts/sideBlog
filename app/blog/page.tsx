"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import Display from '../write/components/display/display'
import { firestore } from '../../firebase/firebaseConfig'
import { doc, getDoc, runTransaction } from 'firebase/firestore'
import { useWrite } from '../../contexts/writeContext'

const BlogPage = () => {
    const searchParams = useSearchParams()
    const newBlogId = searchParams.get("blogId")
    const {setFireBlog,blogId,fireBLog}=useWrite()
    const getUserDoc = async (userUid)=>{
      const docRef = doc(firestore,"users",userUid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()){
        return {...docSnap.data()}
      }
    }
    const updateBlogDoc =async (newData,id)=>{
      const docRef = doc(firestore,"Blogs",id)
      try {
        await runTransaction(firestore,async (t)=>{
          const docSnapShot = await t.get(docRef)
          if (!docSnapShot.exists()){
            //❤️check erros
            console.log("error,no snapshot")
            return
          }
          t.update(docRef,{...newData})
        })
      }catch (error){
        console.log(error,"update failed")
        
      }
       
      }
    
    const getFireBlogById = async (id)=>{
      //❤️use callback
      //if (blogId===null) return;
      const docRef = doc(firestore,"Blogs",id)
      const snapShot = await getDoc(docRef)
      if (snapShot.exists()){
        let blogData = {...snapShot.data()}
       // console.log(snapShot.data().authorId)
        await getUserDoc(snapShot.data().authorId).then(async (userData)=>{
          console.log(blogData.userPhoto,userData.profilePhoto)
            if (blogData.userPhoto!==userData.profilePhoto){
              blogData.userPhoto = userData.profilePhoto
            }
            if (blogData.author!==userData.username){
              blogData.author = userData.username
            }
           await updateBlogDoc(blogData,id)
            
            //./❤️user Socials


        }).then(()=>{
          setFireBlog({...blogData})
        })
       
      }
    }
    useEffect(()=>{
      getFireBlogById(newBlogId)
    },[])
  
  return (
    <main className='page'>
        <Display source={fireBLog}/>
    </main>
  )
}

export default BlogPage