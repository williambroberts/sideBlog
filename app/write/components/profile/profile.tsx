"use client"
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import Image from 'next/image';
import React,{memo,useEffect,useState} from 'react'
import { auth, firestore } from '../../../../firebase/firebaseConfig';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNotifications } from '../../../../contexts/NotificationContext';
import { updateProfile } from 'firebase/auth';
interface theProps {
  user:string;
}
const ProfileComponent = ({user}:theProps) => {
  const {setRemoteUserData,RemoteUserData,setNewProfilePhotoSetter,
    profileUserUid,AdminEditing,
    newProfilePhotoSetter}= useAuth()
  const {setNotification,setOpenNotification}=useNotifications()
  const [loadedProfilePhoto,setLoadedProfilePhoto]=useState<boolean>(false)
  
  //console.log(RemoteUserData,"remoteUserData")
const handleKeepNewProfilePhoto =async ()=>{
  setNewProfilePhotoSetter((prev)=>({...prev,seeBtn:false}))
  const docRef = doc(firestore,"users",profileUserUid)
  try {
    await runTransaction(firestore, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        console.log("error,no snapshot")
        setNotification((prev)=>"error, no snapshot")
        setOpenNotification(true)
        return;
      }
  
      
      transaction.update(docRef,{...RemoteUserData});
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
  //❤️if not admin editing another user update display name?
  if (!AdminEditing){
    updateProfile(auth.currentUser,{
      photoURL:RemoteUserData.profilePhoto
    }).then(()=>{
      console.log("")
    }).catch((error)=>{
      console.log(error)
    })

  }
}
const handleDisgardNewProfilePhoto = ()=>{
  setNewProfilePhotoSetter((prev)=>
    ({...prev,seeBtn:false})
  )
  setRemoteUserData((prev)=>({...prev,profilePhoto:newProfilePhotoSetter.oldUrl}))
}
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
        className={`profile__photo flex flex-row items-center 
        justify-center`}
        />
        <div className={`profile__photo__setter`}>
        <button
        onClick={handleKeepNewProfilePhoto}
          className={`cursor-pointer
          hover:ring-2 hover:ring-green-700 px-2 py-1 text-sm
          `}
          style={{visibility:newProfilePhotoSetter.seeBtn===true?"visible":"hidden"}}>
            KEEP
          </button>
          <button
        onClick={handleDisgardNewProfilePhoto}
          className={`cursor-pointer
          hover:ring-2 hover:ring-red-700 px-2 py-1 text-sm
          `}
          style={{visibility:newProfilePhotoSetter.seeBtn===true?"visible":"hidden"}}>
            DISGARD
          </button>
       
        </div>
          
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