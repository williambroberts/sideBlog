"use client"

import React, { useContext, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useNotifications } from '../../../contexts/NotificationContext'

const NotificationPortal = ({}) => {
    
    const {notification,setOpenNotification,notificationTime}=useNotifications()
    useEffect(()=>{
        setTimeout(()=>{
            setOpenNotification((prev)=>false)
        },notificationTime)
    },[])
  return ReactDom.createPortal(
    <div 
    data-theme="dark"
    className={`rounded-md text-[var(--t-1)] text-base
    px-2 py-2  h-min absolute 
    bg-[var(--bg-3)] flex 
    notification`}>
       {notification?.message}
    </div>,
    document.getElementById("portal")
  )
}

export default NotificationPortal