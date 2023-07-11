"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePathname } from 'next/navigation';
interface theProps {
className?:string;
}
const ProfileLink = ({className}:theProps) => {
  const {user,setProfileUserUid}=useAuth()

  const pathname=usePathname()
  const handleClick = ()=>{
    console.log(user.uid)
    setProfileUserUid((prev)=>user.uid)
  }
    const myStyles = {
        backgroundColor:pathname==="/profile"? "var(--bg-3)":"",
        color:pathname==="/profile"? "var(--t-1)":"",
    }
  return (
    <Link href={`/profile`} 
    style={{...myStyles}}
    className={className}
    onClick={handleClick}
    >
      Profile
    </Link>
  )
}

export default ProfileLink