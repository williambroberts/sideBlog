"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationContext'
import NotificationPortal from '../signUp/components/notificationPortal'
import { doc, runTransaction } from 'firebase/firestore'
import { firestore } from '../../firebase/firebaseConfig'

const RequestAdmin = () => {
    const {user,isAdmin}=useAuth()
    const {setOpenNotification,setNotification,
    openNotification}=useNotifications()
    const handleRequest = async ()=>{
        //🧧get user doc 
        if (isAdmin){
            setOpenNotification(true)
            setNotification((prev)=>({type:"alert",message:"You are already"}))
        }else if(user===null){
            setOpenNotification(true)
            setNotification((prev)=>({type:"alert",message:"Please sign in"}))
        }else {

            try {
                let docRef = doc(firestore,"admins","users")
                await runTransaction(firestore,async (t)=>{
                    const docSnapShot = await t.get(docRef)
                    if (!docSnapShot.exists()){
                        console.log("err no snapshot")
                        return
                    }
                    let newAdminsRequests = docSnapShot.data().requests
                    newAdminsRequests.push(user.uid)
                    let setArr = new Set(newAdminsRequests)
                    let arrToSend = Array.from(setArr)
                    if (newAdminsRequests.includes(user.uid)){
                        setNotification((prev)=>
                        ({tpye:"alert",
                        message:"Previous requset is being handled"}))
                        setOpenNotification(true)
                        return
                    }
                    
                    t.update(docRef,{requests:arrToSend})
                    console.log("user requested admin",user.uid)
                    setOpenNotification(true)
                    setNotification((prev)=>({type:"alert",message:"Request sent"}))
                })
              
            }catch(err){
                console.log(err)
            }
        }
    }
  return (
    <button className='flex w-full items-center
    justify-center px-3 py-2 border border-[var(--bg-4)]
    rounded-md mt-4
    ' onClick={handleRequest}>
            Request to become an Admin

{openNotification && <NotificationPortal/> }
    </button>
  )
}

export default RequestAdmin