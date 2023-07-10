"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
type theProps={
    usePhoto:string;
    author:string;
    dateCreation:string;
    userUid?:string;
}
const UserDetails = ({userPhoto,author,dateCreation,userUid}) => {
    const [loading,setLoading]=useState<boolean>(false)
    
    return (
    <div className="display__user__details">
        <Image src={userPhoto} alt='/'
        width={50}
        objectFit='cover'
        objectPosition='center'
        height={50}
        className={`
            duration-300 ease-in-out
            ${
                loading?
                "blur-2xl grayscale":
                "blur-0 grayscale-0"
            }
        `}
        onLoadingComplete={()=>setLoading(false)}
        />
        <div className='
        font-[var(--font-size-14)]
        flex flex-col gap-0 '>
        <Link 
        className='hover:underline'
        href={`/profile?Auth=${userUid}`}>{author}</Link>
        <span>{dateCreation}</span>
        </div>
    </div>
  )
}

export default UserDetails