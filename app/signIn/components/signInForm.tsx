"use client"
import React, { useState,useReducer } from 'react'
import InputReusable from '../../signUp/components/inputReusable'
import LinkToOther from '../../signUp/components/linkToOther'
import { AuthButton } from '../../signUp/components/AuthButton'
import { useAuth } from '../../../contexts/AuthContext'
import { useNotifications } from '../../../contexts/NotificationContext'

const SignInForm = () => {
  const {signIn}=useAuth()
  const {setNotification,setOpenNotification}=useNotifications()
    const [state,dispatch]=useReducer(reducer,{email:"",password:""})
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
  return (
    <form onSubmit={handleSubmit} className='auth__form'>
        <InputReusable type='email' placeholder='Email address'
        required={true} name='input-email' value={state.email}
        handleChange={(e)=>handleInputChange("email",e)}
        />
        <InputReusable type='password' placeholder='Password'
        required={true} name='input-password' value={state.password}
        handleChange={(e)=>handleInputChange("password",e)}
        />
        <AuthButton text={"Sign in"} 
        type={"submit"}
        disabled={false}/>
        <LinkToOther text='Don&apos;t have an account?' textLink='Sign up'
        href='/signUp'/>


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