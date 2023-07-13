"use client"
import React, { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'

const PushNoUser = () => {
  const  {user}=useAuth()
    useEffect(()=>{
      if (user===null || user===undefined){
         window.location.assign("/")
      }
       
    },[user])
    return (
    <div className='pushNoUser'></div>
  )
}

export default PushNoUser