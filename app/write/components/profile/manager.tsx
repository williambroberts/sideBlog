"use client"
import React, { useEffect, useState } from 'react'
import BlogsComponent from './blogs'
import ProfileComponent from './profile'
import { useAuth } from '../../../../contexts/AuthContext'
import { useSearchParams } from 'next/navigation'

const ProfileManager = () => {
    const {user}=useAuth()
    const searchParams = useSearchParams()
    const [isBlogs,setIsBlogs]=useState<boolean>(true)
    const [canEditProfile,setCanEditProfile]=useState<boolean>(false)
    useEffect(()=>{
        const who = searchParams.get("Auth")
        if (who===user.uid){
            setCanEditProfile(true)
        }
    },[])
    return (
    <div>
        {/* profile banner jhey ? */}
        <header>
            <nav>
                <button>Blogs</button>
                <button
                
                disabled={canEditProfile}
                >Edit Profile</button>
            </nav>
        </header>
        {isBlogs?
    <BlogsComponent/>
    :
    <ProfileComponent/>    
    
    }
    </div>
  )
}

export default ProfileManager