"use client"
import React from 'react'
import { useReactTheme } from '../contexts/themeContext'

const ContextConsumer = ({children}:{children:React.ReactNode}) => {
    const {theme}=useReactTheme()
    return (
    <div className='flex flex-col w-full flex-auto'
    data-theme={theme}
    >
        {children}
    </div>
  )
}

export default ContextConsumer

