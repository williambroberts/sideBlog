"use client"
import React,{useEffect, useState} from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import InputReusable from '../../../signUp/components/inputReusable';
import Button from '../addTags/button';
import IconSave from '../../../../icons/save';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { firestore,auth, storage } from '../../../../firebase/firebaseConfig';
import {  EmailAuthProvider, getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { useNotifications } from '../../../../contexts/NotificationContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import TextAreaReusable from './textarea';
import IconImages from '../../../../icons/cover';
import Icon036Profile from '../../../../icons/profile';
import IconBxPhotoAlbum from '../../../../icons/photo';
import IconPersonLinesFill from '../../../../icons/bio';
import IconUpdate from '../../../../icons/update';
import IconPadlock from '../../../../icons/auth/padlock';

interface theProps{
   
    
}
const Edit = ({}:theProps) => {
    const {user,profileUserUid,AdminEditing,setRemoteUserData,RemoteUserData,
      setNewProfilePhotoSetter,setNewCoverPhotoSetter,
    setLocalUserData,localUserData,newPassword,setNewPassword,
    } = useAuth()
    function getDevice(){
      return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
  const desktop = getDevice()
    const {setNotification,setOpenNotification,setReAuthState,
    notificationHandler}=useNotifications()
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
                        setNotification((prev)=>({type:"error",message:error.code}))
                        setOpenNotification((prev)=>true)
                      }
              }).then(async ()=> {
                setNotification((prev)=>({type:"alert",message:"Updated successfully"})),
                setOpenNotification((prev)=>true)
                //🧧reget userDocData
                await getUserDoc(profileUserUid)

              }   
                   
              ).catch((error) => {
                setNotification((prev)=>({type:"error",message:error.code}))
                setOpenNotification((prev)=>true)
              });
        }
       
        

    }
    const handleEmail =async ()=>{
        runUpdateEmail()
    }
    const runUpdateEmail = async()=>{
      //popup for password
      


      await updateEmail(auth.currentUser,
        localUserData.email).then(async(res) => {
          console.log(res)
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
          setNotification((prev)=>({type:"error",message:error.code}))
          setOpenNotification((prev)=>true)
        }



      }).then(async()=>{
        setNotification((prev)=>({type:"alert",message:"Updated successfully!"})),
        setOpenNotification((prev)=>true)
                
        await getUserDoc(profileUserUid)
      }).catch((error) => {
        setLocalUserData((prev)=>({...prev,email:RemoteUserData.email}))
        if (error.code==="auth/requires-recent-login"){
          //🧧reauthenticate user
          setReAuthState((prev)=>({open:true,type:"email",message:""}))
      }else {
        notificationHandler("error",error.code)
        console.log(error)
      }
      });
    }
    
    const handlePassword = ()=>{
      console.log("password change func")
      if (newPassword.first!==newPassword.second){
        notificationHandler("alert","Passwords do not match ✗")
        return;
      }
      const user = auth.currentUser;

      updatePassword(user, newPassword.first).then(() => {
        setNewPassword(({first:"",second:""}))
        notificationHandler("alert","Password updated ✔")
      }).catch((error) => {
        if (error.code==="auth/requires-recent-login"){
            //🧧reauthenticate user, then redo update
            setReAuthState((prev)=>({type:"password",open:true,message:""}))
        }else {
          console.log(error)
          notificationHandler("error",error.code)
        }
            //notificationHandler("error",error.code)
      });
       
       
    }
    const uploadFileCoverPhoto = ()=>{
      console.log("running uploadCoverPhoto")
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
          //console.log('Upload is paused');
          notificationHandler("alert","Upload is paused.")
         
          break;
        case 'running':
         notificationHandler("alert","Upload is running.")
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
            setProfilePhotoFile({value:"",file:null})

          notificationHandler("alert","Upload complete!")
          setNewCoverPhotoSetter({seeBtn:true,oldUrl:RemoteUserData.coverPhoto})
        setRemoteUserData((prev)=>({...prev,coverPhoto:downloadURL}))
        
          
         
        
  
      });
    }
  );
    }
    
    const uploadFileProfilePhoto = ()=>{
      console.log("uploading profile photo")
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
          notificationHandler("alert","Upload is paused.")
          break;
        case 'running':
         notificationHandler("alert","Upload is running.")
         
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
        setProfilePhotoFile({value:"",file:null})
          notificationHandler("alert","Upload complete!")
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
      //console.log(profilePhotoFile)
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
    //console.log(localUserData)
    //🧧update social media accound
  return (
    <div className='w-full text-[var(--t-1)]'>
        
        <div className='flex flex-row w-full
         items-center gap-1 px-1'>
            <span
            className='font-light uppercase text-sm'
            >Username</span>
        <InputReusable
        type='text'
        className='focus:border-[var(--bg-4)]
        
        '
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

            {/* <IconSave/> */}
             Save
            </Button>
        </div>
        {/* 🌽 */}
        <div className='flex flex-row w-full
         items-center gap-1 px-1'>
            <span
            className='font-light uppercase text-sm'
            >Email</span>
        <InputReusable
        type='text'
        className='focus:border-[var(--bg-4)]
        
        '
        value={localUserData?.email===undefined? 
            "":localUserData.email}
        handleChange={(e)=>setLocalUserData((prev)=>({...prev,email:e.target.value}))}
        placeholder='username'

        />
            <Button

            className='edit__btn'
            disabled={localUserData?.email===RemoteUserData?.email}
            handleClick={handleEmail}
            type='submit'>

            {/* <IconSave/>  */}
            Save
            </Button>
        </div>
        {/* 🍔 */} <span
        className='flex flex-row
        items-center gap-1
        text-inherit text-base
        '
        >Update your password <IconPadlock/></span><span></span>
        <div className='flex flex-row w-full
         items-center gap-1 px-1'>
            {/* <span
            className='font-light uppercase text-sm'
            >Password</span> */}
        <InputReusable
        type='password'
        className='focus:border-[var(--bg-4)]
        
        '
        value={newPassword.first}
        handleChange={(e)=>setNewPassword((prev)=>({...prev,first:e.target.value}))}
        placeholder='New password'

        />
            
        </div>

        <div className='flex flex-row w-full
         items-center gap-1 px-1'>
            {/* <span
            className='font-light uppercase text-sm'
            >Confirm Password</span> */}
        <InputReusable
        type='password'
        className='focus:border-[var(--bg-4)]
        
        '
        value={newPassword.second}
        handleChange={(e)=>setNewPassword((prev)=>({...prev,second:e.target.value}))}
        placeholder='Confirm password'

        />
            
        </div>
        <Button

            className='edit__btn'
            disabled={  
              newPassword.second.length<6&&
              newPassword.first.length<6}
            handleClick={handlePassword}
            type='submit'>

            <IconSave/> Save
            </Button>
        <span
        className='flex flex-row
        items-center gap-1
        text-inherit text-base
        '
        >Update your photos <IconUpdate/></span>
        <div className='flex flex-row w-full'>
        <label htmlFor='ipt-pp'
        className='cursor-pointer px-1 py-1 rounded-md 
        flex items-center whitespace-pre-wrap
        '
        ><IconBxPhotoAlbum/>
        <input 
        className='hidden'
         id="ipt-pp"
        type="file" value={profilePhotoFile?.value}
        onChange={(e)=>updateProfilePhoto(e)}
        />
        {desktop? <div className='label__hover'
        data-theme="dark"
        >
           Profile 
        </div>: " Profile"}
        </label>
       
        <label htmlFor='ipt-cp'
        className='cursor-pointer px-1 py-1 rounded-md 
        flex items-center whitespace-pre-wrap 
        '
        ><IconImages/> 
        <input 
        className='hidden'
         id="ipt-cp"
        type="file" value={coverPhotoFile?.value}
        onChange={(e)=>updateCoverPhoto(e)}
        />
       {desktop? <div className='label__hover'
        data-theme="dark"
        >
           Cover 
        </div>:" Cover"}
        </label>
        </div>

        <div className='w-full flex flex-col gap-1 text-[var(--t-1)] text-base'>
          <span
           className='font-light my-3 flex items-center
           gap-1
           '
          >
            <IconPersonLinesFill/>
            Bio</span>
         
          <TextAreaReusable
          rows={5}
          value={localUserData?.about===undefined? 
            "":localUserData.about}
          placeholder='About...'
          className='font-light bg-[var(--bg-3)]'
          handleChange={(e)=>setLocalUserData((prev)=>({...prev,about:e.target.value}))}
          />
          <Button

className={`flex flex-row opacity-60
items-center flex-wrap border-solid
border rounded border-[var(--bg-4)] 
gap-1 justify-center bg-[var(--bg-1)]
duration-300 transition-all ease-in-out
cursor-pointer
px-2 py-1 text-base font-light hover:opacity-100
`}
disabled={localUserData?.about===RemoteUserData?.about}
handleClick={updateAbout}
type='submit'>

<IconSave/> Save bio
</Button>
        </div>
    </div>
  )
}

export default Edit

