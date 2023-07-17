import React from 'react'
type theProps = {
    type?:"submit"|"reset";
    text?:string;
    className?:string;
    icon?:React.ReactNode;
    children?:React.ReactNode;
    disabled?:boolean;
    handleClick?:React.MouseEventHandler<HTMLButtonElement>
    dataTheme?:string;
    hoverText?:string;
}
const Button = ({hoverText,dataTheme,handleClick,disabled,
  children,type,className,text,icon}:theProps) => {
  return (
    <button 
    data-theme={dataTheme}
    disabled={disabled}
    onClick={handleClick}
    className={className?
    className :
    ""}
type={type}>
    {children}
        {icon}
        {text}

        <div className='button__hover'
        data-theme="dark"
        >
          {hoverText}
        </div>
    </button>
  )
}

export default Button