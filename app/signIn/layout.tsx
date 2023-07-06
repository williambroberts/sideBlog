


import React from 'react'
import HeaderHorizontal from '../../components/header/header'
import FooterHorizontal from '../../components/footer/footer'

export const metadata = {
    title: 'sign Ip'
}


const SignInLayout = ({children}) => {
  return (
    <div className='layout__div'>
      <HeaderHorizontal/>
      {children}
      <FooterHorizontal/>
      </div>
  )
}

export default SignInLayout