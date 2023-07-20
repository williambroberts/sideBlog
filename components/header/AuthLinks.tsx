"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import LogoutButton from '../auth/logoutButton'
import HeaderLink from './headerLink'
import IconLogout from '../../icons/signOut'
import IconFormatListGroupPlus from '../../icons/signUp'
import IconWebauthn from '../../icons/signIn'
import UserImg from './UserImg'
interface theProps {
  fontSize?:string; 
  open?:boolean;
}
const AuthLinks = ({fontSize,open}:theProps) => {
  const [windowSize,setWindowSize]=React.useState<[]>([])
    const {user,userDocData}=useAuth()


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

        {user && <UserImg 
        open={open}
        name={userDocData?.username}
        src={userDocData?.profilePhoto}/>}
    </div>
  )
}

export default AuthLinks