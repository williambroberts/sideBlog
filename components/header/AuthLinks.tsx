"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import LogoutButton from '../auth/logoutButton'
import HeaderLink from './headerLink'

const AuthLinks = () => {
    const {user}=useAuth()
    return (
    <div>
        {user? <LogoutButton/>:
        <HeaderLink href='signIn' text='Sign In'/>
        
        }
    </div>
  )
}

export default AuthLinks