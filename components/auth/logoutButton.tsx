"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import IconLogout from '../../icons/signOut'

const LogoutButton = () => {
    const {signOut,user}=useAuth()
    const handleClick =async ()=>{
      const {result,error}=await signOut()
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