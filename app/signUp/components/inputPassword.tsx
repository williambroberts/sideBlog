"use client"
import React,{memo} from 'react'

const inputPassword = ({password,handlePassword}) => {
  return (
   <input
   className='input__password' value={password} onChange={(e)=> handlePassword(e)}
   type='password' required={true} placeholder='Password' name="password-input"/>
  )
}

export default memo(inputPassword)