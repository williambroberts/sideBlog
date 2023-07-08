"use client"
import React,{memo, useEffect} from 'react'
type ChildrenProps={
    children:React.ReactNode
    delta?:number;
}
const ChildPane = ({children,delta}:ChildrenProps) => {
  console.log(delta)
  const prevDelta = React.useRef<number|null>(null)
  const [width,setWidth]=React.useState<number|null>(null)
  useEffect(()=>{ 
   
      let element = document.querySelector(".splitPane__child__h")
      if (element instanceof HTMLElement){
        let width=element.offsetWidth
        setWidth((prev)=>width+delta-prevDelta?.current)
      }
   
    
    
  },[delta])
  return (
    <div className='splitPane__child__h'
    style={{width:`${delta? width:""}px`}}
    >
{children}
    </div>
  )
}

export default memo(ChildPane)