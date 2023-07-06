import React from 'react'
import AuthBanner from '../signUp/components/banner'
import AuthIcon from '../signUp/components/AuthIcon'
import IconPadlock from '../../icons/auth/padlock'
import SignInForm from './components/signInForm'
import RoutePusher from '../signUp/components/routePusher'

const SignInPage = () => {
  return (
    <main className='signUp'>
        <AuthIcon icon={<IconPadlock/>}/>
        <AuthBanner text='Welcome back to sideBlog'/>
        <SignInForm/>
        <RoutePusher/>
    </main>
  )
}

export default SignInPage