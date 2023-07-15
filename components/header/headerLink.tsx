"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
type theProps = {
    href:string;
    text:string;
    icon?:React.ReactNode | null;
}
const HeaderLink = ({icon,href,text}:theProps) => {
    const pathname=usePathname()
    const router = useRouter()
    const {user}=useAuth()
  const handleSearchParams = ()=>{
    console.log(href,"href")
    if (href!=="/write"){return};
    const newRoute=`/write?&blogId=${user.uid}
    `
    router.push(newRoute)
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
      {text}
    </div>:
    <Link href={href} style={{...myStyles}}
    className='header__link'
    
    
    >
      {icon}
      {text}</Link>
  )
}

export default HeaderLink