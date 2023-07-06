import React from 'react'
import ThemeButton from '../theme/themeButton'
import IconPlantFill from '../../icons/plant'
import HeaderLink from './headerLink'
import HeaderAuthLinkWrapper from './headerAuthLinkWrapper'

const HeaderHorizontal = () => {
  return (
    <header>
        <nav>
          <div className='header__h__logo'><IconPlantFill/></div>
          <div className='header__h_middle'>
            <HeaderLink href={"/"} text='Home'/>
            <HeaderLink href={"/about"} text='About'/>
            <HeaderLink href={"/contact"} text="Contact"/>

    <HeaderAuthLinkWrapper>
      <HeaderLink href={"/createEdit"} text="Editor"/>
      <HeaderLink href={"/profile"} text='Profile'/>
    </HeaderAuthLinkWrapper>

          </div>
          <div className='header__h__right'>
            <ThemeButton/>
          </div>
          
        </nav>
    </header>
  )
}

export default HeaderHorizontal