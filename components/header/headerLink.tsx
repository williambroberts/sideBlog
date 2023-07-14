"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
type theProps = {
    href:string;
    text:string;
    icon?:React.ReactNode | null;
}
const HeaderLink = ({icon,href,text}:theProps) => {
    const pathname=usePathname()

    const myStyles = {
        backgroundColor:pathname===href? "var(--bg-3)":"",
        color:pathname===href? "var(--t-1)":"",
      border:pathname===href? "1px solid var(--bg-4)":"",
    }
  return (
    <Link href={href} style={{...myStyles}}
    className='header__link'
    >
      {icon}
      {text}</Link>
  )
}

export default HeaderLink