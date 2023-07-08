"use client"
import React, { useState,MouseEventHandler } from 'react'
type theProps = {
    icon:React.ReactNode;
    text?:string;
    icon2?:React.ReactNode;
    state?:boolean;
    hoverText?:string;
    handleClick?:MouseEventHandler<HTMLButtonElement>;
}
const UploadImageButton = ({hoverText,icon,
    icon2,text,handleClick,
    state}:theProps) => {
    
    //❤️HOVER TEXT
   
    return (
    <button 
    onClick={handleClick}
    className='UI__btn'>
        {state? icon2? icon2:icon :icon}
        {text}
    </button>
  )
}

export default UploadImageButton