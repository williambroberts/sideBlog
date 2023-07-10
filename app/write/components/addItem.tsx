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
}
const AddItem = ({name,handleChange,placeholder,
  type,value,required,className,id}:theProps) => {
  return (
    <div className={className}>
        <span>{name}</span>
        <input type={type} value={value} id={id}
        required={required? required:false}
        onChange={handleChange}
        placeholder={placeholder}/>
    </div>
  )
}

export default AddItem