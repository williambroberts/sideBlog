"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import IconLogout from '../../icons/signOut'
import { useRouter } from 'next/navigation'
import { useNotifications } from '../../contexts/NotificationContext'

const LogoutButton = () => {
    const {signOut,user}=useAuth()
    const {setNotification,setOpenNotification}=useNotifications()
    const router = useRouter()
    const handleClick =async ()=>{
      setNotification(({type:"alert",message:"Signed Out"}))
      const {result,error}=await signOut()
      router.push("/")
    }
  return (
    <button onClick={handleClick}
    className='logout__button'
    >
      <IconLogout/>
      Sign out

    </button>
  )
}

export default LogoutButton