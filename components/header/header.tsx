"use client"
import React, { useState } from 'react'

import logo from "../../public/images/android-chrome-384x384.png"
import IconPlantFill from '../../icons/plant'
import HeaderLink from './headerLink'
import HeaderAuthLinkWrapper from './headerAuthLinkWrapper'
import AuthLinks from './AuthLinks'
import Link from 'next/link'
import ProfileLink from './profileLink'
import IconMenuLeft from '../../icons/menu'
import Hamburger from './hamburger'
import ReactColorThemeButton from '../ReactColorTheme/ReactColorThemeButton'
import Image from 'next/image'
import { useReactTheme } from '../../contexts/themeContext'
const HeaderHorizontal = () => {
  const [hamburger,setHamburger]=useState<boolean>(false)
  const {theme}=useReactTheme()
  return (
    <header className='header__h'>
        <nav className='desktop'>
          <Link
          aria-label='home'
          className={`header__h__logo no-underline`}
          href={"/"}
          ><span className='font-medium
          text-xl
          
          '>
            <Image 
            width={24} height={24}
            src={logo} alt="/" className={`logo__img ${theme==="dark"?"dark":""}`}/>
            </span></Link>
          <div className='header__h__middle'>
            <HeaderLink href={"/"} text='Home'/>
            <HeaderLink href={"/about"} text='About'/>
            <HeaderLink href={"/contact"} text="Contact"/>

    <HeaderAuthLinkWrapper>
      <HeaderLink href={"/write"} text="Write"/>
      {/* <HeaderLink href={"/profile"} text='Profile'/> */}
      <ProfileLink className={"header__link"}/>
    </HeaderAuthLinkWrapper>
    <AuthLinks fontSize='inherit'/>
          </div>
          <div className='header__h__right'>
           
            <ReactColorThemeButton/>
          </div>
          
        </nav>
    <nav className='mobile'>
      <button 
      aria-label='nav menu'
      className='cursor-pointer
      rounded-sm bg-[var(--bg-1)] 
      p-2 text-base font-medium'
      onClick={()=>setHamburger(true)}
      ><IconMenuLeft/></button>
    </nav>
    <div 
    style={{display:hamburger?"":"none"}}
    onClick={()=>setHamburger(false)}
    className='blur'>

    </div>
    <Hamburger open={hamburger}/>
    
    </header>
  )
}

export default HeaderHorizontal