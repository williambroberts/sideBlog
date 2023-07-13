"use client"
import React from 'react'
type theProps = {
  value?:string;
  name:string;
  type:string;
  required?:boolean;
  placeholder:string;
  className?:string;
  handleChange:React.ChangeEventHandler<HTMLInputElement>
  id?:string;
  dataTheme?:string;
  icon?:React.ReactNode;
}
const AddItem = ({icon,
  dataTheme,name,handleChange,placeholder,
  type,value,required,className,id}:theProps) => {
  return (
    <div className={className}
    data-theme={dataTheme}
    >
        <span
        className='text-sm uppercase font-light 
        text-[var(--t-2)] h-full gap-1
        flex flex-row items-center mx-1
        '
        >
          {icon}
          {name}
        </span>
        <input type={type} value={value} id={id}
        required={required? required:false}
        onChange={handleChange}
        placeholder={placeholder}/>
    </div>
  )
}

export default AddItem