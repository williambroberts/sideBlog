"use client"
import React from 'react'
type theProps = {
  value:string;
  name:string;
  type:string;
  required?:boolean;
  placeholder:string;
  className?:string;
  handleChange:React.ChangeEventHandler<HTMLInputElement>
}
const AddItem = ({name,handleChange,placeholder,
  type,value,required,className}:theProps) => {
  return (
    <div className={className}>
        <span>{name}</span>
        <input type={type} value={value}
        required={required? required:false}
        onChange={handleChange}
        placeholder={placeholder}/>
    </div>
  )
}

export default AddItem