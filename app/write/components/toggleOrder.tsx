"use client"
import React, { MouseEventHandler } from 'react'
type theProps = {
    icon?:React.ReactNode;
    direction:string;
    id:string;
}
const ToggleOrderBtn = ({id,icon,direction}:theProps) => {
    const handleToggle =(direction,index)=> {

    }
  return (
   <button
   onClick={handleToggle}
   className='write__toggle__btn'
   ></button>
  )
}

export default ToggleOrderBtn