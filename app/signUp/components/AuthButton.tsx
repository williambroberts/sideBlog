import React from 'react'
type AuthButtonProps = {
    text:string;
   
    type:string;
    disabled?:boolean;
}
export const AuthButton = ({text,type,disabled}) => {
  return (
    <button type={type} 
    className='auth__button'
    disabled={disabled}
    >{text}</button>
  )
}
