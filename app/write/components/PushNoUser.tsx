"use client"
import React, { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'

const PushNoUser = () => {
  const  {user}=useAuth()
    useEffect(()=>{
        window.location.assign("/")
    },[user])
    return (
    <div>PushNoUser</div>
  )
}

export default PushNoUser