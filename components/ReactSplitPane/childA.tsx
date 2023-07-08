"use client"
import React from 'react'
type theProps = {
    children?:React.ReactNode;
    width?:number;
    start?:Function;
}
const ChildA = ({children,width,start}) => {
  return (
    <div className='childA'
    style={{width:width===null?"":`${width}px`}}
    >
        {children}
        <div
        className='childA__slider' 
        onMouseDown={start}>

        </div>
    </div>
  )
}

export default ChildA