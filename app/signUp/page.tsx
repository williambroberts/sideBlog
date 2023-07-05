import React from 'react'
import SignUpForm from './components/form'
import AuthBanner from './components/banner'
import AuthIcon from './components/AuthIcon'
import IconPadlock from '../../icons/auth/padlock'

const signUpPage = () => {
  return (
    <main>
        sign up
        <AuthIcon icon={<IconPadlock/>}/>
        <AuthBanner/>
        <SignUpForm/>
    </main>
  )
}

export default signUpPage