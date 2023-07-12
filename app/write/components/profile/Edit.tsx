"use client"
import React,{useEffect, useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import InputReusable from '../../../signUp/components/inputReusable';
import Button from '../addTags/button';
import IconSave from '../../../../icons/save';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { firestore,auth, storage } from '../../../../firebase/firebaseConfig';
import {  getAuth, updateProfile } from 'firebase/auth';
import { useNotifications } from '../../../../contexts/NotificationContext';
import AddItem from '../addItem';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import TextAreaReusable from './textarea';

interface theProps{
   
    
}
const Edit = ({}:theProps) => {
    const {user,profileUserUid,AdminEditing,setRemoteUserData,RemoteUserData,
      setNewProfilePhotoSetter,setNewCoverPhotoSetter,
    setLocalUserData,localUserData,
    } = useAuth()
    const {setNotification,setOpenNotification}=useNotifications()
    const [coverPhotoFile,setCoverPhotoFile]=useState<any|null>({value:"",file:null})

    const [profilePhotoFile,setProfilePhotoFile]=useState<any|null>({value:"",file:null})
    
    const [progress,setProgress]=useState<number>(0)
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
    const uploadFileCoverPhoto = ()=>{
      const storageRef = ref(storage,coverPhotoFile.file.name)
      const uploadTask = uploadBytesResumable(storageRef, coverPhotoFile.file);
      uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const snapshotProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + snapshotProgress + '% done');
      setProgress((prev)=>snapshotProgress)
      //❤️progressBAR🧧
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          setNotification((prev)=>"Upload is paused")
          setOpenNotification((prev)=>true)
          break;
        case 'running':
          console.log('Upload is running');
          setNotification((prev)=>"Upload is running")
          setOpenNotification((prev)=>true)
          break;
      }
    }, (error) => {
      
      switch (error.code) {
        default:
          console.log(error,error.code)
          break
      }
    }, () => {
     
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
          //🧧set new cover photo
          setNewCoverPhotoSetter({seeBtn:true,oldUrl:RemoteUserData.coverPhoto})
        setRemoteUserData((prev)=>({...prev,coverPhoto:downloadURL}))
        
          
         
        
  
      });
    }
  );
    }
    
    const uploadFileProfilePhoto = ()=>{
      const storageRef = ref(storage,profilePhotoFile.file.name)
      const uploadTask = uploadBytesResumable(storageRef, profilePhotoFile.file);
      uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const snapshotProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + snapshotProgress + '% done');
      setProgress((prev)=>snapshotProgress)
      //❤️progressBAR🧧
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          setNotification((prev)=>"Upload is paused")
          setOpenNotification((prev)=>true)
          break;
        case 'running':
          console.log('Upload is running');
          setNotification((prev)=>"Upload is running")
          setOpenNotification((prev)=>true)
          break;
      }
    }, (error) => {
      
      switch (error.code) {
        default:
          console.log(error,error.code)
          break
      }
    }, () => {
     
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
          //🧧set new url to remoteuserPhooto

          
         setNewProfilePhotoSetter((prev)=>
         ({seeBtn:true,oldUrl:RemoteUserData.profilePhoto}))
         setRemoteUserData((prev)=>
         ({...prev,profilePhoto:downloadURL}))
        
  
      });
    }
  );
    }
    const updateProfilePhoto = (e)=>{
      let newProfilePhotoObj = {value:e.target.value,file:e.target.files[0]}
      //🧧set to profile photo as a trial ans save icon? "keep"
      setProfilePhotoFile(newProfilePhotoObj)
      
      
    }
    useEffect(()=>{
      
      profilePhotoFile.file && uploadFileProfilePhoto()
    },[profilePhotoFile])
    const updateCoverPhoto = (e)=>{
      setCoverPhotoFile((prev)=>({value:e.target.value,file:e.target.files[0]}))
    }
    useEffect(()=>{
      coverPhotoFile.file && uploadFileCoverPhoto()
    },[coverPhotoFile])

    
    const updateAbout = async()=>{
      try {
        const docRef = doc(firestore,"users",profileUserUid)
        await runTransaction(firestore, async (t)=>{
          const docSnapShot = await t.get(docRef)
          if (!docSnapShot.exists()){
            //❤️check erros
            console.log("error,no snapshot")
            return
          }
          t.update(docRef,{...localUserData})
        })
        await getUserDoc(profileUserUid)
      }catch (error){
        console.log(error,"update failed")
        setNotification(error.code)
        setOpenNotification((prev)=>true)
      } 
      
      
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
        <div className='flex flex-row w-full'>
        <AddItem name='Profile photo' 
        type='file'
        value={profilePhotoFile.value}
        className='add__item'
        placeholder='Profile photo'
        id='profilePhoto-input'
        handleChange={(e)=>updateProfilePhoto(e)}
        />
        </div>
        <div className='flex flex-row w-full'>
        <AddItem name='Cover photo' 
        type='file'
        value={coverPhotoFile.value}
        className='add__item'
        placeholder='Cover photo'
        id='coverPhoto-input'
        handleChange={(e)=>updateCoverPhoto(e)}
        />
        </div>

        <div className='w-full flex flex-col gap-1 text-[var(--t-1)] text-base'>
          <span>About</span>
         
          <TextAreaReusable
          rows={5}
          value={localUserData?.about===undefined? 
            "":localUserData.about}
          placeholder='About...'
          className='textarea'
          handleChange={(e)=>setLocalUserData((prev)=>({...prev,about:e.target.value}))}
          />
          <Button

className='edit__btn'
disabled={localUserData?.about===RemoteUserData?.about}
handleClick={updateAbout}
type='submit'>

<IconSave/> Save about
</Button>
        </div>
    </div>
  )
}

export default Edit

