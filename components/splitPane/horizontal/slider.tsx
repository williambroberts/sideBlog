"use client"
import React,{useCallback, useRef, useState,useEffect} from 'react'
type theProps  = {
    position?:number;
}
type LeftProps = {
    initial:number|null;
    current:number|null;
}
const SplitPaneHslider = ({position}:theProps) => {
    const [Left,setLeft]=useState<LeftProps>({initial:null,current:null})
    const  [isDragging,setIsDragging]=useState<Boolean>(false)
    
    const handleMouseUp =(e)=>{
        setIsDragging((prev)=>false)  
    }
    const handleMouseDown = (e)=>{
        setIsDragging((prev)=>true)
    }
    useEffect(()=>{
        const handleMouseMove = (e)=>{
            if (isDragging){
                //debounce
    
                const newValue = e.clientX
                console.log(newValue)
            }
        }
        document.addEventListener("mousemove",handleMouseMove)
        return ()=>{
            document.removeEventListener("mousemove",handleMouseMove)
        }
    },[isDragging])
    
        
    
    
    
   
  return (
    <div 
    onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
    className='splitPane__slider__h'>

    </div>
  )
}

export default SplitPaneHslider