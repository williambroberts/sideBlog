"use client"
import React, { useEffect, useState,useRef } from 'react'
import BlogsComponent from './blogs'
import ProfileComponent from './profile'
import { useAuth } from '../../../../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'
import Edit from './Edit'
import { firestore } from '../../../../firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const ProfileManager = () => {
    const {user,isAdmin,profileUserUid,setProfileUserUid
    ,setRemoteUserData,setAdminEditing,
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
        }
        }catch(err){
          console.log(err)
        }
      }
   
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
        {/* profile banner jhey ? */}
        <ProfileComponent
        user={profileUserUid}
        />
        <header className='w-full'>
            <nav className='w-full flex flex-row gap-2'> 
            <span className='font-medium'>
                {isAdmin && user.uid!==profileUserUid? "Viewing as an Admin":""}
                </span>  
                <button 
                className={`hover:underline 
                hover:ring-1 ring-[var(--bg-4)]
                cursor-pointer
                px-2 py-1 rounded-sm
             ${isBlogs? "bg-[var(--bg-3)]":""}
                `}
                onClick={()=>setIsBlogs(true)}
                >Blogs</button>
                <button 
                style={{opacity:isAdmin?"1":user.uid===profileUserUid? "1":"0"}}
                className='hover:underline hover:ring-[var(--bg-4)]'
                onClick={()=>setIsBlogs(false)}
                disabled={!canEditProfile}
                >Edit Profile</button>
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