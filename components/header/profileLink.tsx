"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePathname } from 'next/navigation';
import Icon036Profile from '../../icons/profile';
interface theProps {
className?:string;
open?:boolean;
}
const ProfileLink = ({className,open}:theProps) => {
  const {user,setProfileUserUid}=useAuth()

  const pathname=usePathname()
  const handleClick = ()=>{
    console.log(user.uid)
    setProfileUserUid((prev)=>user.uid)
  }
    const myStyles = {
        backgroundColor:pathname==="/profile"? "var(--bg-3)":"",
        color:pathname==="/profile"? "var(--t-1)":"",
        border:pathname==="/profile"? "1px dashed var(--bg-4)":"",
    }
  return (
    <Link href={`/profile?id=${user?.uid}`} 
    style={{...myStyles}}
    className={className}
    onClick={handleClick}
    >
      {open?  <Icon036Profile/>:""}
      Profile
    </Link>
  )
}

export default ProfileLink