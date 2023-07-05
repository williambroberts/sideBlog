import React from 'react'
type AuthBannerProps = {
    text?:string
}
const AuthBanner = ({text}:AuthBannerProps) => {
  return (
    <h2
    className='auth__banner'
    >{text}</h2>
  )
}

export default AuthBanner