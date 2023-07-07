"use client"
import React,{useCallback, useRef, useState,useEffect} from 'react'
type theProps  = {
    position?:number;
}

const SplitPaneHslider = ({position}:theProps) => {
    const [startX,setStartX]=useState<number|undefined>(undefined)
    const  [isDragging,setIsDragging]=useState<Boolean>(false)
    const [loaded,setLoaded]=useState(false)
    let div = null
    useEffect(()=>{
        setLoaded(true)
    },[])
   
   
    useEffect(()=>{
        const start = (e)=>{
            console.log("start")
            setIsDragging(true)
        }
        const end = (e)=>{
            console.log("end")
            setIsDragging(false)
        }
        const move = (e)=>{
            console.log("end")
            if (!isDragging) return;
            console.log(e.clientX)
        }
        if(loaded){
        let div = document.querySelector(".splitPane__slider__h")
        
        document.addEventListener("mousemove",move)
        div.addEventListener("mousedown",start)
        document.addEventListener("mouseup",end)
        }
        return ()=>{
            document.removeEventListener("mousemove",move)
            document.removeEventListener("mouseup",end)
            div.removeEventListener("mousedown",start)
        }

    },[isDragging,loaded])
   
    
    
    if (!loaded){
        return
    }
   
  return (
    <div 
   
    className='splitPane__slider__h'>

    </div>
  )
}

export default SplitPaneHslider