"use client"
import React, { createContext,useContext,useState } from 'react'

interface ReactThemeContextValues {
    theme:"light"|"dark";
    setTheme:Function;
    updateTheme:Function;
}
const ReactThemeContext = createContext<ReactThemeContextValues|undefined>(undefined)

function getInitialTheme(){
    const persistedThemePreference =  localStorage.getItem("color-theme")
    const hasPersistedThemePreference = typeof(persistedThemePreference)==="string"
    if (hasPersistedThemePreference){
        return persistedThemePreference
    }
    const mql = window.matchMedia('(prefers-color-scheme:dark)')
    const hasMediaQueryPrefence = typeof(mql.matches)==="boolean"
    if (hasMediaQueryPrefence){
        return mql.matches? 'dark':'light'
    }
   

    return "light"
}

const ReactThemeProvider = ({children}:{children:React.ReactNode}) => {
  const [theme,setTheme]=useState<any>(getInitialTheme)
  
  const updateTheme = (value)=>{
    
    setTheme(value)
    window.localStorage.setItem("color-theme",value)
  }
  
  const ThemeValues={
    updateTheme:updateTheme,
    theme:theme,setTheme:setTheme,
  }
    return (
   <ReactThemeContext.Provider value={ThemeValues}>
    {children}
    </ReactThemeContext.Provider>
  )
}

export default ReactThemeProvider

export function useReactTheme(): ReactThemeContextValues {
    const RTC = useContext(ReactThemeContext)
    if(!RTC){
        throw new Error("useBlogs must be used inside BlogsProvider")
    }
    return RTC;
}