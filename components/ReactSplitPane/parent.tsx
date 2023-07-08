"use client"
import React from 'react'
import ChildA from './childA';
import ChildB from './childB';
type theProps = {
    childA?:React.ReactNode;
    childB?:React.ReactNode;
}

const Parent = ({childA,childB}:theProps) => {
    const [isMouseDown,setIsMouseDown]=React.useState<boolean>(false)
    const [startX,setStartX]=React.useState<number|null>(null)
    const [width,setWidth]=React.useState<number|null>(null)
    const end = (e)=>{

        console.log("end",e.clientX,startX,isMouseDown)
        if (!isMouseDown) return;
        setIsMouseDown(false)
        setWidth((prev)=>e.clientX)
      }
      const start = (e)=>{
        console.log("start",e.clientX,isMouseDown)
        setIsMouseDown(true)
        setStartX((prev)=>e.clientX)
        
    }
      const run = (e)=>{
        e.preventDefault()
        
        if (!isMouseDown)return;
        console.log("run")
         
      }

  return (
    <div 
    onMouseMove={(e)=>run(e)}
    onMouseUp={(e)=>end(e)}
    className='SP__parent'>
<ChildA
width={width}
start={start}

>
    {childA}
blaaa
</ChildA>
<ChildB>
{childB}
</ChildB>
    </div>
  )

}

export default Parent