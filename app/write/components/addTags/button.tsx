import React from 'react'
type theProps = {
    type?:"submit"|"reset";
    text?:string;
    className?:string;
    icon?:React.ReactNode;
    children?:React.ReactNode;
    handleClick:React.MouseEventHandler<HTMLButtonElement>
}
const Button = ({handleClick,
  children,type,className,text,icon}:theProps) => {
  return (
    <button 
    onClick={handleClick}
    className={className?
    className:
    ""}
type={type}>
    {children}
        {icon}
        {text}
    </button>
  )
}

export default Button