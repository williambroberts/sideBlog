"use client"
import React,{useEffect, useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import InputReusable from '../../../signUp/components/inputReusable';
import Button from '../addTags/button';
import IconSave from '../../../../icons/save';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { firestore,auth } from '../../../../firebase/firebaseConfig';
import {  getAuth, updateProfile } from 'firebase/auth';
import { useNotifications } from '../../../../contexts/NotificationContext';

interface theProps{
   
    
}
const Edit = ({}:theProps) => {
    const {user,profileUserUid,AdminEditing,setRemoteUserData,RemoteUserData} = useAuth()
    const {setNotification,setOpenNotification}=useNotifications()
    
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
        profileUserUid && getUserDoc(profileUserUid)
      },[profileUserUid])
    
   
    //🧧only admin or user=user.uid can see this page
    
    const updateUsername =async ()=>{
        
        if (!AdminEditing){
            updateProfile(auth.currentUser, {
                displayName:localUserData.username
              }).then(async () => {
                    
                    try {
                        let docRef = doc(firestore,"users",profileUserUid)
                        await runTransaction(firestore, async (t)=>{
                          const docSnapShot = await t.get(docRef)
                          if (!docSnapShot.exists()){
                            //❤️check erros
                            console.log("error,no snapshot")
                            return
                          }
                          t.update(docRef,{...localUserData})
                        })
                      }catch (error){
                        console.log(error,"update failed")
                        setNotification(error.code)
                        setOpenNotification((prev)=>true)
                      }
              }).then(async ()=> {
                setNotification((prev)=>"updated successfully"),
                setOpenNotification((prev)=>true)
                //🧧reget userDocData
                await getUserDoc(profileUserUid)

              }   
                   
              ).catch((error) => {
                    setNotification(error.code)
                    setOpenNotification((prev)=>true)
              });
        }
       
        

    }
    const updateEmail = ()=>{

    }
    const updatePassword = ()=>{

    }
    const updateProfilePhoto = ()=>{

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
        value={localUserData?.username===undefined? 
            "":localUserData.username}
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