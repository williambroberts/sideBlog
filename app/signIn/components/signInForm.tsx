"use client"
import React, { useState,useReducer } from 'react'
import InputReusable from '../../signUp/components/inputReusable'
import LinkToOther from '../../signUp/components/linkToOther'
import { AuthButton } from '../../signUp/components/AuthButton'
import { useAuth } from '../../../contexts/AuthContext'
import { useNotifications } from '../../../contexts/NotificationContext'
import NotificationPortal from '../../signUp/components/notificationPortal'

const SignInForm = () => {
  const {signIn}=useAuth()
  const demoUserEmail = "demo123@gmail.com"
  const demoUserPass = "padding1rem"
  const {setNotification,setOpenNotification,openNotification}=useNotifications()
    const [state,dispatch]=useReducer(reducer,{email:"",password:""})
    const [isCopied,setIsCopied]=useState({email:false,password:false})
    const handleSubmit = async (e)=>{
        e.preventDefault()
        //console.log(state.email,state.password)
      let {result,error}=await signIn(state.email,state.password)
      if (error){
        console.log(error)
        setNotification((prev)=>error.code)
        setOpenNotification((prev)=>true)
        return
      }
      window.location.assign("/")
    }
    const handleInputChange = (type:string,e:React.ChangeEvent<HTMLInputElement>)=>{
        if (type==="email"){
           dispatch({type:"email",value:e.target.value})
           // console.log(e.target.value)
        }else if (type==="password"){   
            dispatch({type:"password",value:e.target.value})
        }
       
    }
    const handleCopy = (e)=>{
      if (e.target.textContent.includes("email")){
        navigator.clipboard.writeText(demoUserEmail)
        dispatch({type:"email",value:demoUserEmail})
      }else if (e.target.textContent.includes("password")){
        navigator.clipboard.writeText(demoUserPass)
        dispatch({type:"password",value:demoUserPass})
      }
     

    setTimeout(()=>{
      setIsCopied((prev)=>({email:false,password:false}))
    },2000)
    }
  return (
    <form onSubmit={handleSubmit} className='auth__form'>
        <InputReusable type='email' placeholder='Email address'
        required={true} name='input-email' value={state.email}
        handleChange={(e)=>handleInputChange("email",e)}
        />
        <span 
        onClick={(e)=>handleCopy(e)}
        className='text-xs 
        opacity-60 hover:opacity-100
        cursor-pointer'>Demo email: demo123@gmail.com <b>🗐</b></span>
        <InputReusable type='password' placeholder='Password'
        required={true} name='input-password' value={state.password}
        handleChange={(e)=>handleInputChange("password",e)}
        />
        <span 
        
        onClick={handleCopy}
        className='text-xs opacity-60
        hover:opacity-100
        cursor-pointer'>Demo password: padding1rem  <b>🗐</b></span>
        <AuthButton text={"Sign in"} 
        type={"submit"}
        disabled={false}/>
        <LinkToOther text='Don&apos;t have an account?' textLink='Sign up'
        href='/signUp'/>

{openNotification && <NotificationPortal/>}
    </form>
  )
}
function reducer(state, action) {
    switch (action.type) {
      case "email":
        return { ...state, email:action.value };
      case "password":
        return { ...state, password:action.value};
      
      default:
        throw new Error();
    }
  }
export default SignInForm