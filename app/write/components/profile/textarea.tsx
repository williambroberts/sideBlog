import React from 'react'
interface theProps {
    rows?:number;
    cols?:number;
    placeholder?:string;
    name?:string;
    id?:string;
    width?:string;
    className?:string;
    required?:boolean;
    value?:string;
    handleChange:React.ChangeEventHandler<HTMLTextAreaElement>

}
const TextAreaReusable = ({
    required,value,handleChange,
    rows,cols,placeholder,name,id,width,className}:theProps) => {
  return (
    <textarea
    onChange={handleChange}
    value={value}
    id={id}
    rows={rows}
    cols={cols}
    name={name}
    placeholder={placeholder}
    className={className}
    style={{width:width}}
    required={required}>
        
    </textarea>
  )
}

export default TextAreaReusable