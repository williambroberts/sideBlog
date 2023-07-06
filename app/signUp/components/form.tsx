"use client"
import React, { useState } from 'react'
import InputPassword from './inputPassword'
import InputReusable from './inputReusable';
type dataProps = {
    username:string;
    password:string;
    email:string;
    confirmPassword:string;
    confirmEmail:string;
}
const SignUpForm = () => {
    const [data,setData]=useState<dataProps>({username:"",password:"",
    email:"",confirmPassword:"",confirmEmail:""})
    const handleSubmit = (e)=>{
        e.preventDefault()
        
    }
    const handleInputChange = (type:string,e:React.ChangeEvent<HTMLInputElement>)=>{
        if (type==="username"){
 setData((prev)=>
        ({...prev,username:e.target.value}))
        console.log(e.target.value)
        }else if (type==="email"){
            setData((prev)=>
            ({...prev,email:e.target.value}))
            console.log(e.target.value)
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
    className='sign__up__form'
    >
        <InputReusable required={true} handleChange={(e)=>handleInputChange("username",e)}
        type='text' name='input-username' value={data.username} placeholder='Username'
        />
        <InputReusable required={true} handleChange={(e)=>handleInputChange("email",e)}
        type='email' name='input-email' value={data.email} placeholder='Email Address'
        />
        <InputReusable required={true} handleChange={(e)=>handleInputChange("confirmEmail",e)}
        type="password" name="input-password" value={data.confirmEmail}
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
        
        
    </form>
  )
}

export default SignUpForm