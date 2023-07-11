"use client"
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React,{memo,useEffect,useState} from 'react'
import { firestore } from '../../../../firebase/firebaseConfig';
import { useAuth } from '../../../../contexts/AuthContext';
interface theProps {
  user:string;
}
const ProfileComponent = ({user}:theProps) => {
  const {RemoteUserData}= useAuth()
  
  const [loadedProfilePhoto,setLoadedProfilePhoto]=useState<boolean>(false)
  
  console.log(RemoteUserData,"remoteUserData")
 
  return (
    <div className='profile__component'>
      <div className='
      relative
      w-full h-60 bg-[var(--bg-3)]'>
        <Image src={RemoteUserData?.coverPhoto} 
        alt='cover Photo' 
        style={{opacity:RemoteUserData?.coverPhoto===""?"0":"1"}}
        fill objectFit="cover" objectPosition='center'
        sizes='(min-width:1280px) 50vw, 100vw'
        />

        <Image src={RemoteUserData?.profilePhoto} alt='user'
        width={120} height={120}

        objectFit='cover'
        objectPosition='center'
        className='profile__photo'
        />
      </div>

      <h1 className='profile__name'>{RemoteUserData?.username}</h1>
      <p className='text-base text-inherit'>{RemoteUserData?.about}</p>
      <div className='w-full flex flex-row gap-2 
      items-center 
      '>
        <span
        >{RemoteUserData?.joinDate}</span>
        {/* 🧧user link */}
        <span></span>
      </div>
    </div>
  )
}

export default memo(ProfileComponent)