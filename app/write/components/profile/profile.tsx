"use client"
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import Image from 'next/image';
import React,{memo,useEffect,useState} from 'react'
import { auth, firestore } from '../../../../firebase/firebaseConfig';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNotifications } from '../../../../contexts/NotificationContext';
import { updateProfile } from 'firebase/auth';
import IconCrossCircled from '../../../../icons/cross';
import IconTickCircle from '../../../../icons/tick';
import NotificationPortal from '../../../signUp/components/notificationPortal';
import { useSearchParams } from 'next/navigation';
import { getUserDoc } from '../../../../firebase/CLientFunctions';
interface theProps {
  user:string;
}
const ProfileComponent = ({user}:theProps) => {
  const {setRemoteUserData,RemoteUserData,setNewProfilePhotoSetter,
    profileUserUid,AdminEditing,newCoverPhotoSetter,
    newProfilePhotoSetter,setNewCoverPhotoSetter}= useAuth()
  const {setNotification,setOpenNotification,openNotification}=useNotifications()
  const [loadedProfilePhoto,setLoadedProfilePhoto]=useState<boolean>(false)
  const searchParams = useSearchParams()

  useEffect(()=>{
    const profileID = searchParams.get("id")
    getUserDoc(profileID).then((data)=>{
      setRemoteUserData({...data})
    }).catch((err)=>console.log(err))
  },[])

  const handleRunTransaction =async ()=>{
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
  }
  //console.log(RemoteUserData,"remoteUserData")
const handleKeepNewProfilePhoto =async ()=>{
  setNewProfilePhotoSetter((prev)=>({...prev,seeBtn:false}))
  await handleRunTransaction()
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
const handleKeepNewCover = async ()=> {
  setNewCoverPhotoSetter((prev)=>({...prev,seeBtn:false}))
  await handleRunTransaction()
}
const handleDisgardNewCover = ()=>{
  setNewCoverPhotoSetter((prev)=>
    ({...prev,seeBtn:false})
  )
  setRemoteUserData((prev)=>({...prev,coverPhoto:newCoverPhotoSetter.oldUrl}))
}
console.log(RemoteUserData,"remoteusrdata")
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
        <div className={`cover__photo__setter`}
        data-theme="dark"
        style={{visibility:newCoverPhotoSetter.seeBtn===true?"visible":"hidden"}}
        >
          <div className='arrowCover'></div>
          <button onClick={handleKeepNewCover}>
            Keep <IconTickCircle/>
          </button>
          <button onClick={handleDisgardNewCover}>
            Disgard <IconCrossCircled/>
          </button>
          
        </div>
        <Image src={RemoteUserData?.profilePhoto} alt='user'
        width={120} height={120}
        
        objectFit='cover'
        objectPosition='center'
        className={`profile__photo flex flex-row items-center 
        justify-center`}
        />
        <div data-theme='dark'
        style={{visibility:newProfilePhotoSetter.seeBtn===true?"visible":"hidden"}}
       
        className={`profile__photo__setter 
        group
        `}
        
        >
        <button
        onClick={handleKeepNewProfilePhoto}
          className={`cursor-pointer flex items-center flex-nowrap gap-1
          px-2 py-1 text-sm w-full justify-center
          `}
          style={{visibility:newProfilePhotoSetter.seeBtn===true?"visible":"hidden"}}>
            Keep <IconTickCircle/>
          </button>
          <button
        onClick={handleDisgardNewProfilePhoto}
          className={`cursor-pointer flex items-center flex-nowrap
           px-2 py-1 text-sm w-full justify-center
          gap-1
          `}
          style={{visibility:newProfilePhotoSetter.seeBtn===true?"visible":"hidden"}}>
            Disgard <IconCrossCircled/>
          </button>
        <div className='arrow'>

        </div>
        </div>
          
      </div>

      <h1 className='profile__name'>{RemoteUserData?.username}</h1>
      <p className='text-base text-inherit
      first-letter:text-lg my-2
      '>{RemoteUserData?.about}</p>
      <div className='w-full flex flex-row gap-2 
      items-center 
      '>
        <span
        >{RemoteUserData?.joinDate}</span>
        {/* 🧧user link */}
        <span></span>
      </div>

      {openNotification && <NotificationPortal/>}
    </div>
  )
}

export default memo(ProfileComponent)