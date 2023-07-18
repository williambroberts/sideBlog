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
    style={{fontSize:`${fontSize}px`,flexDirection:open?"column":"row",
  alignItems:open?"flex-start":"center",
  }}
    className='text-inherit flex 
    
    
    '>
      
        {user? 
        
        
        <LogoutButton/>:
        <HeaderLink 
        icon={open? <IconWebauthn/> : null}
        href='signIn' text='Sign In'/>
          


}
{!user&&<HeaderLink href='signUp'
icon={open? <IconFormatListGroupPlus/>:null}
        text='Sign Up'/>}
    </div>
  )
}

export default AuthLinks