"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { useWrite } from '../../contexts/writeContext'
import { useNotifications } from '../../contexts/NotificationContext'
import NotificationPortal from '../../app/signUp/components/notificationPortal'
type theProps = {
    href:string;
    text:string;
    icon?:React.ReactNode | null;
}
const HeaderLink = ({icon,href,text}:theProps) => {
    const pathname=usePathname()
    const router = useRouter()
    const {user}=useAuth()
    const {openNotification,setOpenNotification,setNotification}=useNotifications()
    const {hasChanged}=useWrite()
  const handleSearchParams = ()=>{
    console.log(href,"href")
    if (href!=="/write"){return};
    const newRoute=`/write?&blogId=${user.uid}
    `
    if (!hasChanged){
      router.push(newRoute)
    }else {
      setOpenNotification(true)
      setNotification({type:"alert",message:"Please save your changes"})
    }
    
  }

  const handleClick = ()=>{
    if (!hasChanged){
      router.push(href)
    }else {
      setOpenNotification(true)
      setNotification({type:"alert",message:"Please save your changes"})
    }
  }
    const myStyles = {
        backgroundColor:pathname===href? "var(--bg-3)":"",
        color:pathname===href? "var(--t-1)":"",
      border:pathname===href? "1px dashed var(--bg-4)":"",
    }
  return (
    href==="/write"?
    <div className='header__link'
    style={{...myStyles}}
    onClick={handleSearchParams}>
      {icon}
      {text}
     
    </div>:
    <div style={{...myStyles}}
    className='header__link'
    onClick={handleClick}
    
    >
      {icon}
      {text}
      
      </div>
  )
}

export default HeaderLink