"use client"
import React, { useEffect, useState } from 'react'
import styles from "./animator.module.css"
type theProps = {
    children?:React.ReactNode;
    index:number;
}
const Animator = ({children,index}:theProps) => {
    const wait = 0.13
    const [seen,setSeen]=useState<boolean>(false)
    useEffect(()=>{
        setTimeout(()=>{
            setSeen((prev)=>true)
        },index*wait)
    },[])
  return (
    <div className={styles.animator} style={{opacity:seen?"1":"0"}}>
        <div
        style={{animationDelay:`${index*wait}s`}}
        ></div>
        {children}
    </div>
  )
}

export default Animator