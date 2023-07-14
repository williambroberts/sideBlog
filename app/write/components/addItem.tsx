"use client"
import React, { useState } from 'react'
import { useWrite } from '../../../contexts/writeContext';
type theProps = {
  value?:string;
  name:string;
  type:string;
  required?:boolean;
  placeholder:string;
  className?:string;
  handleChange:React.ChangeEventHandler<HTMLInputElement> | React.MouseEventHandler<HTMLButtonElement>
  id?:string;
  dataTheme?:string;
  icon?:React.ReactNode;
  openType?:string;
}
const AddItem = ({icon,openType,
  dataTheme,name,handleChange,placeholder,
  type,value,required,className,id}:theProps) => {
    const {openAddItem,setOpenAddItem,openState}=useWrite()
    const handleOpen = ()=>{
      let temp = openAddItem[openType]
      let newYes=!openAddItem["yes"]
      let newState = {...openState}
      newState[openType]=!temp
      newState["yes"]=newYes
      console.log(newState)
      setOpenAddItem({...newState})
    }
    const close = openAddItem["yes"]
  return (
    <div className={`className flex flex-row 
    duration-200 transition-all ease-in-out delay-700
    overflow-hidden 
    ${(openAddItem["yes"]===true&&openAddItem[openType]===false)? 
    "px-0 max-w-0":""}
    `}

    
    data-theme={dataTheme}
    style={{width:(openAddItem["yes"]===true&&openAddItem[openType]===false)?"0px":""}}

    >
        <span
        onClick={type==="file"?handleChange :()=>handleOpen()}
        className={`text-sm uppercase font-light 
        text-[var(--t-2)] h-full gap-1
        flex flex-row items-center mx-1 flex-nowrap
        ${(openAddItem["yes"]===true&&openAddItem[openType]===false)? 
        "px-0 max-w-0":""}
        `}
        >
          {icon}
          {name}
        </span>
        
        <input 
        className={`duration-200 transition-all
        ease-in-out overflow-hidden box-border

        ${openAddItem[openType]? "":"px-0 min-w-0 border-none "}
        `}
        style={{width:openAddItem[openType]?"":"0px"
      }}
        type={type} value={value} id={id}
        required={required? required:false}
        onChange={handleChange}
        placeholder={placeholder}/>
    </div>
  )
}

export default AddItem