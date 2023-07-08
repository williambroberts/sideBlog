"use client"
import React,{useCallback, 
    memo,
    useRef, useState,useEffect} from 'react'
type theProps  = {
    position?:number;
    isMouseDown:boolean;
    setIsMouseDown:Function;
    left:number;
    setState?:Function;
   
}

const SplitPaneHslider = ({isMouseDown,
    setIsMouseDown,left,setState,
    position}:theProps) => {
    const sliderRef = useRef()
    
    
    
const start = (e)=>{
    console.log("start",e.clientX,isMouseDown)
    setIsMouseDown(true)
    setState(e.clientX)
}

    
   
   
  return (
    <div onMouseDown={(e)=>start(e)}
    style={{left:left===null?"":left}}
   ref={sliderRef}
    className='splitPane__slider__h'>

    </div>
  )
}

export default memo(SplitPaneHslider)