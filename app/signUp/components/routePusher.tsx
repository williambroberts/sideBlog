"use client"
import React, { useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'


const RoutePusher = () => {
    const {user}=useAuth()
    useEffect(()=>{
        if (user!==null){
            window.location.assign("/")
        }
    },[user])
  return (
    <div className='route__pusher'>

    </div>
  )

}

export default RoutePusher