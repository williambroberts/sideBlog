"use client"
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import React,{memo,useEffect,useState} from 'react'
import { firestore } from '../../../../firebase/firebaseConfig';
interface theProps {
  user:string;
}
const ProfileComponent = ({user}:theProps) => {
  const [userDoc,setUserDoc]=React.useState(null)
  const [loadedProfilePhoto,setLoadedProfilePhoto]=useState<boolean>(false)
  const getUserDoc =async (userUid)=>{
    //🧧get userDOc FB for whoRef for thier profile
    try {
      let docRef = doc(firestore,"users",userUid)
    const snapShot:any = await getDoc(docRef)
    if (snapShot.exists()){
      console.log(snapShot.data())
      setUserDoc(({...snapShot.data()}))
    }
    }catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    user && getUserDoc(user)
  },[user])
  return (
    <div className='profile__component'>
      <div className='
      relative
      w-full h-60 bg-[var(--bg-3)]'>
        <Image src={userDoc?.coverPhoto} 
        alt='cover Photo' 
        style={{opacity:userDoc?.coverPhoto===""?"0":"1"}}
        fill objectFit="cover" objectPosition='center'
        sizes='(min-width:1280px) 50vw, 100vw'
        />

        <Image src={userDoc?.profilePhoto} alt='user'
        width={120} height={120}

        objectFit='cover'
        objectPosition='center'
        className='profile__photo'
        />
      </div>

      <h1 className='profile__name'>{userDoc?.username}</h1>
      <p className='text-base text-inherit'>{userDoc?.about}</p>
      <div className='w-full flex flex-row gap-2 
      items-center 
      '>
        <span
        >{userDoc?.joinDate}</span>
        {/* 🧧user link */}
        <span></span>
      </div>
    </div>
  )
}

export default memo(ProfileComponent)