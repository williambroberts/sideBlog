"use client"
import React, { useState } from 'react'
import InputReusable from './inputReusable';
import { AuthButton } from './AuthButton';
import { setDoc,doc } from 'firebase/firestore';
import { useNotifications } from '../../../contexts/NotificationContext';
import { useAuth } from '../../../contexts/AuthContext';
import { firestore,auth } from '../../../firebase/firebaseConfig';
import LinkToOther from './linkToOther';
import { updateProfile } from 'firebase/auth';
type dataProps = {
    username:string;
    password:string;
    email:string;
    confirmPassword:string;
    confirmEmail:string;
}
const SignUpForm = () => {
    const alphanumericRegex = /^[a-zA-Z0-9_]*$/
    const [data,setData]=useState<dataProps>({username:"",password:"",
    email:"",confirmPassword:"",confirmEmail:""})
    const {notification,setNotification,setOpenNotification,
    notificationTime,notificationHandler}=useNotifications()
    const  {signUp} = useAuth()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if (data.username===""){
            notificationHandler("alert","Username is required ✗")
           
            return
        }
        if (alphanumericRegex.test(data.username)===false){
            notificationHandler("alert","Alphanumeric characters only ✗")
        
            return
        }
        if (data.email!==data.confirmEmail){
            notificationHandler("alert","Emails do not match ✗")
            return
        }else if (data.password!==data.confirmPassword){
           notificationHandler("alert","Passwords do not match ✗")
            return
        }else {            
         const {result,error}=await signUp(data.email,data.password)
            if (error){
                console.log(error)
                setNotification((prev)=>error.code)
                return
            }else {
                let date = new Date()
                let newDate=date.getDate()+"/"
                +(date.getMonth()+1)+"/"+date.getFullYear()
                try {
                    const docData = {
                        savedBlogs:[],
                        uid:result.user.uid,
                        email:result.user.email,
                        username:data.username,
                        profilePhoto:"https://picsum.photos/200/200",
                        coverPhoto:"https://picsum.photos/800/400",
                        // blogs:[],
                        comments:[], //❤️think
                        github:"",
                        codepen:"",
                        linkedin:"",
                        twitter:"",
                        leetcode:"",
                        about:"Add your about section",
                        joinDate:newDate,
                        admin:false,
                        toDelete:false,

                    }

                    const docRef  = doc(firestore,"users",result.user.uid)
                    await setDoc(docRef,docData)
                }catch(err) {
                    console.log(err,"error")
                }
                //🧧admin user setttings
                
                 //navigate to homepage
                window.location.assign("/")
            }
        }

       
    }
    const handleInputChange = (type:string,e:React.ChangeEvent<HTMLInputElement>)=>{
        if (type==="username"){
 setData((prev)=>
        ({...prev,username:e.target.value}))
        //console.log(e.target.value)
        }else if (type==="email"){
            setData((prev)=>
            ({...prev,email:e.target.value}))
           // console.log(e.target.value)
        }else if (type==="password"){
            setData((prev)=>
            ({...prev,password:e.target.value}))
        }else if (type==="confirmPassword"){
            setData((prev)=>
            ({...prev,confirmPassword:e.target.value}))
        }else if (type==="confirmEmail"){
            setData((prev)=>
            ({...prev,confirmEmail:e.target.value}))
        }
       
    }
  return (
    <form onSubmit={(e)=>handleSubmit(e)}
    className='auth__form'
    >
        <InputReusable required={true} handleChange={(e)=>handleInputChange("username",e)}
        type='text' name='input-username' value={data.username} placeholder='Username'
        />
        <InputReusable required={true} handleChange={(e)=>handleInputChange("email",e)}
        type='email' name='input-email' value={data.email} placeholder='Email Address'
        />
        <InputReusable required={true} handleChange={(e)=>handleInputChange("confirmEmail",e)}
        type="email" name="input-confirmEmail" value={data.confirmEmail}
        placeholder='Confirm email'
        />
        <InputReusable required={true} handleChange={(e)=>handleInputChange("password",e)}
        type="password" name="input-password" value={data.password}
        placeholder='Password'
        />
        <InputReusable required={true} handleChange={(e)=>handleInputChange("confirmPassword",e)}
        type="password" name="input-confirmPassword" value={data.confirmPassword}
        placeholder='Confirm password'
        />
        <AuthButton type={"submit"}
       text={"Sign up"}
       disabled={false}/>
        <LinkToOther text='Already have an account?' href='/signIn'
        textLink='Sign in'/>
    </form>
  )
}

export default SignUpForm