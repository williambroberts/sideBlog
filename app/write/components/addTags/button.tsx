import React from 'react'
type theProps = {
    type?:"submit"|"reset";
    text?:string;
    className?:string;
    icon?:React.ReactNode;
}
const Button = ({type,className,text,icon}:theProps) => {
  return (
    <button className={className?
    className:
    ""}
type={type}>
    
        {icon}
        {text}
    </button>
  )
}

export default Button