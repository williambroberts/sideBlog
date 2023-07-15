"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePathname, useRouter } from 'next/navigation';
import Icon036Profile from '../../icons/profile';
import { useWrite } from '../../contexts/writeContext';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationPortal from '../../app/signUp/components/notificationPortal';
interface theProps {
className?:string;
open?:boolean;
}
const ProfileLink = ({className,open}:theProps) => {
  const {user,setProfileUserUid}=useAuth()
const {hasChanged}=useWrite()
const {openNotification,setOpenNotification,setNotification}=useNotifications()
  const pathname=usePathname()
  const router = useRouter()
  const handleClick = ()=>{
    console.log(user.uid)
    setProfileUserUid((prev)=>user.uid)
    if (!hasChanged){
      router.push(`/profile?id=${user?.uid}`)
    }else {
      setNotification({type:"alert",message:"Please save your changes"})
      setNotification(true)
    }

  }
    const myStyles = {
        backgroundColor:pathname==="/profile"? "var(--bg-3)":"",
        color:pathname==="/profile"? "var(--t-1)":"",
        border:pathname==="/profile"? "1px dashed var(--bg-4)":"",
    }
  return (
    <div 
    style={{...myStyles}}
    className={className}
    onClick={handleClick}
    >
      {open?  <Icon036Profile/>:""}
      Profile

      {openNotification && <NotificationPortal/>}
    </div>
  )
}

export default ProfileLink