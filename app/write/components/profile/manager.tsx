"use client"
import React, { useEffect, useState,useRef } from 'react'
import BlogsComponent from './blogs'
import ProfileComponent from './profile'
import { useAuth } from '../../../../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'
import Edit from './Edit'
import { firestore } from '../../../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import IconListTask from '../../../../icons/list'
import IconEdit from '../../../../icons/edit'

const ProfileManager = () => {
    const {user,isAdmin,profileUserUid,setProfileUserUid
    ,setRemoteUserData,setAdminEditing,setLocalUserData,
    }=useAuth()
   // const searchParams = useSearchParams()
    const [isBlogs,setIsBlogs]=useState<boolean>(true)
   
    const [canEditProfile,setCanEditProfile]=useState<boolean>(false)
    const getUserDoc =async (userUid)=>{
      //🧧get userDOc FB for whoRef for thier profile
      try {
        let docRef = doc(firestore,"users",userUid)
      const snapShot:any = await getDoc(docRef)
      if (snapShot.exists()){
        console.log(snapShot.data())
        setRemoteUserData(({...snapShot.data()}))
        setLocalUserData(({...snapShot.data()}))
      }
      }catch(err){
        console.log(err)
      }
    }
    
    useEffect(()=>{
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    },[])
    

    useEffect(()=>{
      profileUserUid && getUserDoc(profileUserUid)
    },[profileUserUid])
   
    useEffect(()=>{
        console.log(profileUserUid,"profileuserUid")
        if (profileUserUid===user.uid){
            setCanEditProfile(true)
        }
       //💭ADMIN CAN EDIT TOO
       console.log(user.displayName,user,isAdmin)
       if (isAdmin){
        setCanEditProfile(true)
       }
       if(isAdmin && profileUserUid!==user.uid){
        setAdminEditing((prev)=>true)
       }
       if (profileUserUid===undefined&& user){
        console.log(profileUserUid,user.uid)
        setProfileUserUid(user.uid)
      
      }
       if (profileUserUid===null&& user){setProfileUserUid(user.uid)}
    },[profileUserUid])
    return (
    <div className='w-full'>
      
        <ProfileComponent
        user={profileUserUid}
        />
        <header className='w-full text-[var(--t-2)] my-2'>
            <nav className='w-full flex flex-row gap-2'> 
            <span className='font-medium'>
                {isAdmin && user.uid!==profileUserUid? "Viewing as an Admin":""}
                </span>  
                <button 
                className={`opacity-60 hover:opacity-100
                duration-300 ease-in-out transition-all
                hover:ring-1 ring-[var(--bg-4)]
                cursor-pointer
                flex flex-row items-center gap-1
                px-2 py-1 rounded-sm
             ${isBlogs? "bg-[var(--bg-3)]":""}
                `}
                onClick={()=>setIsBlogs(true)}
                ><IconListTask/> Blogs</button>
                <button 
                style={{opacity:isAdmin?"1":user.uid===profileUserUid? "1":"0"}}
                className={` opacity-60 hover:opacity-100
                duration-300 ease-in-out transition-all
                hover:ring-1 ring-[var(--bg-4)]
                cursor-pointer flex flex-row items-center
                px-2 py-1 rounded-sm gap-1
             ${!isBlogs? "bg-[var(--bg-3)]":""}
                `}
                onClick={()=>setIsBlogs(false)}
                disabled={!canEditProfile}
                ><IconEdit/> Edit Profile</button>
            </nav>
        </header>
        {isBlogs?
    <BlogsComponent/>
    :
    <Edit 
    
    />    
    
    }
    </div>
  )
}

export default ProfileManager