"use client"
import React, { MouseEventHandler } from 'react'
import { useWrite } from '../../../contexts/writeContext';
type theProps = {
    icon?:React.ReactNode;
    direction:string;
    id:string;
}
const ToggleOrderBtn = ({id,icon,direction}:theProps) => {
    const {localBLog}=useWrite()
    const handleToggle =(direction,id)=> {
        for (let i=0;i<localBLog.content.length;i++){
            if (localBLog.content[i].id===id){
                if (i===0 && direction==="up"){
                    return
                }else if (i===localBLog.content.length-1&&direction==="down"){
                    return
                }else{
                    let newContent = [...localBLog.content]
                    let item = newContent.splice(i,1)
                    if (direction==="up"){
                        newContent.splice(i-1,0,item)
                    }else if (direction==="down"){
                        newContent.splice(i+1,0,item)
                    }
                }
                
                
                
            }
        }
    }
  return (
   <button
   onClick={()=>handleToggle(direction,id)}
   className='write__toggle__btn'
   >{icon}</button>
  )
}

export default ToggleOrderBtn