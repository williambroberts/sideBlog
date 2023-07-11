"use client"
import React, { useEffect, useState,useRef } from 'react'
import BlogsComponent from './blogs'
import ProfileComponent from './profile'
import { useAuth } from '../../../../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'
import Edit from './Edit'

const ProfileManager = () => {
    const {user,isAdmin}=useAuth()
    const searchParams = useSearchParams()
    const AdminEditing = useRef<boolean>(false)
    const [isBlogs,setIsBlogs]=useState<boolean>(true)
    const whoRef = useRef<string>("")
    const [canEditProfile,setCanEditProfile]=useState<boolean>(false)
   
   
    useEffect(()=>{
        const who = searchParams.get("Auth")
        whoRef.current=who
        if (who===user.uid){
            setCanEditProfile(true)
        }
       //💭ADMIN CAN EDIT TOO
       console.log(user.displayName,user,isAdmin)
       if (isAdmin){
        setCanEditProfile(true)
       }
       if(isAdmin && who!==user.uid){
        AdminEditing.current=true
       }
    },[])
    return (
    <div className='w-full'>
        {/* profile banner jhey ? */}
        <ProfileComponent
        user={whoRef?.current}
        />
        <header className='w-full'>
            <nav className='w-full flex flex-row gap-2'> 
            <span className='font-medium'>
                {isAdmin && user.uid!==whoRef.current? "Viewing as an Admin":""}
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
    isAdminEditing={AdminEditing?.current}
    userFromSearchParmas={whoRef?.current}/>    
    
    }
    </div>
  )
}

export default ProfileManager