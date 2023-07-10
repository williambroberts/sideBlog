"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePathname } from 'next/navigation';
interface theProps {
className?:string;
}
const ProfileLink = ({className}:theProps) => {
  const {user}=useAuth()

  const pathname=usePathname()

    const myStyles = {
        backgroundColor:pathname==="/profile"? "var(--bg-3)":"",
        color:pathname==="/profile"? "var(--t-1)":"",
    }
  return (
    <Link href={`/profile?Auth=${user?.uid}`}
    style={{...myStyles}}
    className={className}
    >
      Profile
    </Link>
  )
}

export default ProfileLink