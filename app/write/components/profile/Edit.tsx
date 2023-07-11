"use client"
import React,{useEffect, useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import InputReusable from '../../../signUp/components/inputReusable';
import Button from '../addTags/button';
import IconSave from '../../../../icons/save';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { firestore,auth } from '../../../../firebase/firebaseConfig';
import { updateProfile } from 'firebase/auth';
interface theProps{
    userFromSearchParmas?:string;
    isAdminEditing:boolean
}
const Edit = ({userFromSearchParmas,isAdminEditing}:theProps) => {
    const {user} = useAuth()
    const [RemoteUserData,setRemoteUserData]=useState(null)
    const [localUserData,setLocalUserData]=useState(null)
    const getUserDoc =async (userUid)=>{
        //🧧get userDOc FB for whoRef for thier profile
        try {
          let docRef = doc(firestore,"users",userUid)
        const snapShot:any = await getDoc(docRef)
        if (snapShot.exists()){
          console.log(snapShot.data())
          setRemoteUserData(({...snapShot.data()}))
          setLocalUserData(({...snapShot.data()}))
        }
        }catch(err){
          console.log(err)
        }
      }
      
      useEffect(()=>{
        userFromSearchParmas && getUserDoc(userFromSearchParmas)
      },[userFromSearchParmas])
    
    const handleChange=(type,e)=>{
        if (type==="username"){
            setLocalUserData((prev)=>({...prev,username:e.target.value}))
        }
    }
    //🧧only admin or user=user.uid can see this page
    const updateUsername =async ()=>{
        if (isAdminEditing) {
            //🟩admn sdk
        }else {
            updateProfile(auth.currentUser, {
                displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              });
        }
       
        try {
            let docRef = doc(firestore,"users",user)
            await runTransaction(firestore, async (t)=>{
              const docSnapShot = await t.get(docRef)
              if (!docSnapShot.exists()){
                //❤️check erros
                console.log("error,no snapshot")
                return
              }
              t.update(docRef,{...localUserData})
            })
          }catch (err){
            console.log(err,"update failed")
          }
    }
    const updateEmail = ()=>{

    }
    const updatePassword = ()=>{

    }
    const updateProfilePhotp = ()=>{

    }
    const updateCoverPhoto = ()=>{

    }
    const updateAbout = ()=>{

    }
    //🧧update social media accound
  return (
    <div className='w-full'>
        <div className='flex flex-row w-full'>
            <span>Username</span>
        <InputReusable
        type='text'
        value={localUserData?.username}
        handleChange={(e)=>setLocalUserData((prev)=>({...prev,username:e.target.value}))}
        placeholder='username'

        />
            <Button

            className='edit__btn'
            disabled={localUserData?.username===RemoteUserData?.username}
            handleClick={updateUsername}
            type='submit'>

            <IconSave/> Save
            </Button>
        </div>
        

    </div>
  )
}

export default Edit