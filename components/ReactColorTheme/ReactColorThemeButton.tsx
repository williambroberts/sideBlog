"use client"
import React from 'react'
import { useReactTheme } from '../../contexts/themeContext'
import IconSun from '../theme/sun'
import IconMoon from '../theme/moon'

const ReactColorThemeButton = () => {
    const {updateTheme,theme}=useReactTheme()

    const themeChange = ()=>{
        if (theme==="light"){
            updateTheme("dark")
        }else {
            updateTheme("light")
        }
        
        let myHtml = document.querySelector('html')
        //css styles are strings even opacity
        myHtml.style.opacity="0"
        setTimeout(()=>{
          
        myHtml.style.opacity="1"
        },1)
      }


      return (


        <button className={`theme__button ${theme==="light"? "light":"dark"}`} onClick={()=>themeChange()}>
          {theme==="dark"?   <IconSun/>: <IconMoon/>}
          </button>
          
      )
    

}

export default ReactColorThemeButton