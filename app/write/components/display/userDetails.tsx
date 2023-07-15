"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { useAuth } from '../../../../contexts/AuthContext';
import IconCalendarOutline from '../../../../icons/date';
type theProps={
    usePhoto:string;
    author:string;
    dateCreation:string;
    userUid?:string;
}
const UserDetails = ({userPhoto,author,dateCreation,userUid}) => {
    //console.log(userPhoto,"userphoto")
    const [loading,setLoading]=useState<boolean>(false)
    const {setProfileUserUid} = useAuth()
    const handleClick = ()=> {
        //🌮set profileUseruid to this blogs
        setProfileUserUid((prev)=>userUid)
       // window.location.assign("/profile")
    }
    return (
    <div className="display__user__details">
        <Link href={`/profile`}>
       
        <Image src={userPhoto} alt='/' onClick={()=>handleClick()}
        width={50}
        
        height={50}
        style={{objectFit:"cover",objectPosition:"center"}}
        className={`hover:ring-2 hover:ring-black rounded-full transition-all
            duration-300 ease-in-out w-[50px] h-[50px] cursor-pointer
            mr-2 ring-2 ring-slate-400 my-10
            ${
                loading?
                "blur-2xl grayscale opacity-0":
                "blur-0 grayscale-0 opacity-100"
            }
            hover:ring-2 ring-black`}
        onLoadingComplete={()=>setLoading(false)}
        />
         </Link>
        <div className='
        font-[var(--font-size-14)]
        flex flex-col gap-0 '>
        <Link 
        className='hover:underline'
        onClick={()=>handleClick()}
        href={`/profile?`}>{author}</Link>
        <span
         className="flex flex-row items-center gap-1"
        >
            <IconCalendarOutline/> {dateCreation}</span>
        </div>
    </div>
  )
}

export default UserDetails