import React from 'react'
import ThemeButton from '../theme/themeButton'
import IconPlantFill from '../../icons/plant'
import HeaderLink from './headerLink'
import HeaderAuthLinkWrapper from './headerAuthLinkWrapper'
import AuthLinks from './AuthLinks'
import Link from 'next/link'
import ProfileLink from './profileLink'
const HeaderHorizontal = () => {
  return (
    <header className='header__h'>
        <nav>
          <Link className='header__h__logo'
          href={"/"}
          ><IconPlantFill/></Link>
          <div className='header__h__middle'>
            <HeaderLink href={"/"} text='Home'/>
            <HeaderLink href={"/about"} text='About'/>
            <HeaderLink href={"/contact"} text="Contact"/>

    <HeaderAuthLinkWrapper>
      <HeaderLink href={"/write"} text="Write"/>
      {/* <HeaderLink href={"/profile"} text='Profile'/> */}
      <ProfileLink className={"header__link"}/>
    </HeaderAuthLinkWrapper>
    <AuthLinks/>
          </div>
          <div className='header__h__right'>
            <ThemeButton/>
          </div>
          
        </nav>
    </header>
  )
}

export default HeaderHorizontal