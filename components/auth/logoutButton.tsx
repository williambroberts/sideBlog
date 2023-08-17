"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import IconLogout from '../../icons/signOut'

import { useNotifications } from '../../contexts/NotificationContext'
export const callFunctions = {
  run:()=>{}
}
const LogoutButton = () => {
    const {signOut,user}=useAuth()
    const {setNotification,setOpenNotification}=useNotifications()
    
    const handleClick =async ()=>{
      callFunctions.run()
      setNotification(({type:"alert",message:"Signed Out"}))
      const {result,error}=await signOut()
      window.location.assign("/")
    }
  return (
    <button 
    aria-label='logout'
    onClick={handleClick}
    className='logout__button'
    >
      <IconLogout/>
      Sign out

    </button>
  )
}

export default LogoutButton