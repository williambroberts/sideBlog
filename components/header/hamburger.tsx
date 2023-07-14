
import React, { useEffect } from 'react'
import IconPlantFill from '../../icons/plant'
import HeaderLink from './headerLink'
import HeaderAuthLinkWrapper from './headerAuthLinkWrapper'
import ProfileLink from './profileLink'
import AuthLinks from './AuthLinks'
import ThemeButton from '../theme/themeButton'
import Link from 'next/link'
import IconHome from '../../icons/home'
import IconInfoSquare from '../../icons/about'
import IconMailForward from '../../icons/contact'
import IconWrite from '../../icons/write'
type theProps = {
    open:boolean;
}
const Hamburger = ({open}:theProps) => {

    useEffect(()=>{
        let htmlTag = document.querySelector("html")
        if (open){
            htmlTag.style.overflow="hidden"
        }else {
            htmlTag.style.overflow="scroll"
        }
    },[open])
  return (
    <div className={`hamburger ${open? "open":""}`}>
<nav className='w-full box-border'>
          <Link className='header__h__logo'
          href={"/"}
          ><IconPlantFill/>
          SideBlog
          <ThemeButton/>
          </Link>
          <div className='flex flex-col w-full mt-8'>
            <HeaderLink href={"/"} text='Home'
            icon={<IconHome/>}
            />
            <HeaderLink 
            icon={<IconInfoSquare/>}
            href={"/about"} text='About'/>
            <HeaderLink 
            icon={<IconMailForward/>}
            href={"/contact"} text="Contact"/>

    <HeaderAuthLinkWrapper>
      <HeaderLink 
      icon={<IconWrite/>}
      href={"/write"} text="Write"/>
      {/* <HeaderLink href={"/profile"} text='Profile'/> */}
      <ProfileLink className={"header__link"}/>
    </HeaderAuthLinkWrapper>
    <AuthLinks open={open}
    fontSize='14'
    />
          </div>
         
          
        </nav>
    </div>
  )
}

export default Hamburger