"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import LogoutButton from '../auth/logoutButton'
import HeaderLink from './headerLink'
import IconLogout from '../../icons/signOut'
import IconFormatListGroupPlus from '../../icons/signUp'
import IconWebauthn from '../../icons/signIn'
interface theProps {
  fontSize?:string;
  open?:boolean;
}
const AuthLinks = ({fontSize,open}:theProps) => {
  const [windowSize,setWindowSize]=React.useState<[]>([])
    const {user}=useAuth()


    return (
    <div 
    style={{fontSize:`${fontSize}px`}}
    className='text-inherit'>
      
        {user? 
        
        
        <LogoutButton/>:
        <HeaderLink 
        icon={open? <IconWebauthn/> : null}
        href='signIn' text='Sign In'/>
          


}
{open&&<HeaderLink href='signUp'
icon={<IconFormatListGroupPlus/>}
        text='Sign Up'/>}
    </div>
  )
}

export default AuthLinks