"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
type ChildrenProps = {
    children:React.ReactNode;
}
const HeaderAuthLinkWrapper = ({children}:ChildrenProps) => {
    const {user}= useAuth()

    return (
    <div className='auth__link__wrapper'
    style={{display:user?"":"none"}}
    >{children}</div>
  )
}

export default HeaderAuthLinkWrapper