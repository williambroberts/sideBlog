"use client"
import React, { useEffect, useState } from 'react'
import {v4} from "uuid"
type theProps = {
    images:string[];
}
const UploadedImages = ({images}:theProps) => {
    const [index,setIndex]=useState(0)
    const [maxIndex,setMaxIndex]=useState(0)
    useEffect(()=>{
        //❤️debounce
        let timeout = setTimeout(()=>{
            //calc new max index
            let frame:HTMLElement = document.querySelector(".UI__frame")
            
            let frameWidth = frame.offsetWidth
            let newMaxIndex =images?.length-Math.floor(frameWidth/114)
            setMaxIndex((prev)=>newMaxIndex)
        },400)
        return ()=>{
            clearTimeout(timeout)
        }

    },[window.innerWidth])
        const handleClick = (direction)=>{
            //calc max index
            if (index===0 && direction==="left") return;
            else if (index>=maxIndex&& direction==="right") return;
            else if(direction==="left"){
                setIndex((prev)=>prev-1)
            }else if (direction==="right"){
                setIndex((prev)=>prev+1)
            }
        }
      
    
  return (
    <div className='UI__frame'>
        <div className='UI__parent' style={{left:`${index*-114}px`}}>
            {images.map((item,index)=>(
                <div className='UI__item' key={v4()}>
                        img {index}
                </div>
            )
            
            )}
            
        </div>
        <button 
        onClick={()=>handleClick("left")}
        className='UI__button' 
        style={{left:"17px"}}>
                L
            </button>
            <button 
             onClick={()=>handleClick("right")}
            className='UI__button' 
            style={{right:"17px"}}>
                R
            </button>
    </div>
  )
}

export default UploadedImages