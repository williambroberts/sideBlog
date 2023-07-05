import React from 'react'
type AuthIconProps = {
 icon?:any
}
const AuthIcon = ({icon}:AuthIconProps) => {
  return (
    <div className='auth__icon'>
        {icon}
    </div>
  )
}

export default AuthIcon