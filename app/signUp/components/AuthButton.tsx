import React from 'react'
type AuthButtonProps = {
    text:string;
}
export const AuthButton = ({text}) => {
  return (
    <button
    className='auth__button'
    >{text}</button>
  )
}
