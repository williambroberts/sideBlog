"use client"
import React,{useState,useRef} from 'react'
import ChildPane from './child'
import SplitPaneHslider from './slider'
type theProps = {
  childLeft?:React.ReactNode;
  childRight?:React.ReactNode;
}
const SplitPaneParent = ({childLeft,childRight}:theProps) => {
  const [isMouseDown,setIsMouseDown]=React.useState<boolean>(false)
  const [endX,setEndX]=useState<number|null>(null)
  const [startX,setStartX]=useState<number|null>(null)
  const wait = 100
  const lastRunTime = useRef<number|null>(null)
  const [debouncedEndX,setDebouncedEndX]=useState<number|null>(null)
  const end = (e)=>{

    console.log("end",e.clientX,startX,isMouseDown)
    if (!isMouseDown) return;
    setIsMouseDown(false)
    //❤️below is wrong eg if no move then left ==0 not prev shift not stay
    setDebouncedEndX((prev)=>prev+e.clientX-startX)
  }
  
  const run = (e)=>{
    e.preventDefault()
    
    if (!isMouseDown)return;
    console.log("run")
     if (isMouseDown){
      
      let NOW = new Date().getTime()
      setEndX((prev)=>prev+e.clientX-startX)
      //setDebouncedEndX((prev)=>e.clientX-startX)
      if (NOW-lastRunTime.current<wait)return;
      else{
        
        lastRunTime.current=NOW
      }
      

      
    }
  }
  return (
    <div className='splitPane__parent__h'
    onMouseMove={(e)=>run(e)}
    onMouseUp={(e)=>end(e)}
    >
      <ChildPane delta={debouncedEndX}>
    {childLeft}
    left
      </ChildPane>
      <SplitPaneHslider
      left={debouncedEndX}
      setState={setStartX}
     
      
      isMouseDown={isMouseDown}
      setIsMouseDown={setIsMouseDown}
      />
      <ChildPane>
        {childRight}
        right
      </ChildPane>
    </div>
  )
}

export default SplitPaneParent