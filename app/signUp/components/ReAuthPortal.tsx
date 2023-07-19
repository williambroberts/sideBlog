import React from 'react'
import ReactDom from "react-dom"
import { useNotifications } from '../../../contexts/NotificationContext'
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth'
import { auth, firestore } from '../../../firebase/firebaseConfig'
import { useAuth } from '../../../contexts/AuthContext'
import { doc, runTransaction } from 'firebase/firestore'
import { getUserDoc } from '../../../firebase/CLientFunctions'
const ReAuthPortal = () => {
     const {newPassword,localUserData,setLocalUserData,RemoteUserData,
        setNewPassword}=useAuth()
    const {reAuthState,setReAuthState,notificationHandler,
    setNotification,setOpenNotification}=useNotifications()
   const [password,setPassword]=React.useState<string>("")
function handleSubmit (){
    const CurrentUser = auth.currentUser;
    const credential = EmailAuthProvider.credential(
        CurrentUser.email,
        password
    )
    reauthenticateWithCredential(
       CurrentUser, 
        credential
    ).then(async ()=>{
        //run update email or pw function 👍🏻
        if (reAuthState.type==="email"){
            await updateEmail(auth.currentUser,
                localUserData.email).then(async() => {
                try {
                  let docRef = doc(firestore,"users",CurrentUser.uid)
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
                setNotification((prev)=>({type:"alert",message:"Email updated ✔"})),
                setOpenNotification((prev)=>true)
                        
                await getUserDoc(CurrentUser.uid)
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
        }else if (reAuthState.type==="password"){
           

            updatePassword(CurrentUser, newPassword.first).then(() => {
              notificationHandler("alert","Password updated ✔")
              setNewPassword(({first:"",second:""}))
            }).catch((error) => {
              if (error.code==="auth/requires-recent-login"){
                  //🧧reauthenticate user, then redo update
                  setReAuthState((prev)=>({type:"password",message:"",open:true}))
              }else {
                console.log(error)
                notificationHandler("error",error.code)
              }
                  //notificationHandler("error",error.code)
            });
        }
    }).then(()=>{

        setReAuthState((prev)=>({...prev,open:false}))
    }).catch((error)=>console.log(error))
    
}

  return ReactDom.createPortal (
    <div
    data-theme="light"
    className='flex flex-col items-center'
    >
        <form onSubmit={handleSubmit}
        className='w-72 flex flex-col gap-1'>
            <span>Re-enter your password:</span>
            <input 
            className='px-1 py-1'
            value={password}
            placeholder='Password'
            type='password'/>
            <button className='auth__button'>OK</button>
        </form>
    </div>,
    document.getElementById("portal")
  )
}

export default ReAuthPortal