"use client"
import React, { useState } from 'react'
import InputPassword from './inputPassword'
import InputReusable from './inputReusable';
type dataProps = {
    username:string;
    password:string;
    email:string;
}
const SignUpForm = () => {
    const [data,setData]=useState<dataProps>({username:"",password:"",email:""})
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
        <InputPassword password={data.password} 
        handlePassword={(e)=>setData((prev)=>e.target.value)}/>
    </form>
  )
}

export default SignUpForm