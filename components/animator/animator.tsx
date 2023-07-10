"use client"
import React, { useEffect, useState } from 'react'
import styles from "./animator.module.css"
type theProps = {
    children?:React.ReactNode;
    index:number;
    alignItems?:string;
}
const Animator = ({alignItems,children,index}:theProps) => {
    const wait = 0.13
   
  return (
    <div className={`${styles.animator}`} style={{animationDelay:`${index*wait}s`
    ,alignItems:alignItems? alignItems:""
    }}>
       
        {children}
    </div>
  )
}

export default Animator