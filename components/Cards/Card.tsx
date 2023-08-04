import React from 'react'
import laptop  from "../../public/images/laptop.webp"
import letters from "../../public/images/fancyLetters.jpeg"
import coffee from "../../public/images/coffee.webp"
interface theProps {
    icon:any;
    index:number;
    text:string;
}
export const Card = ({text,icon,index}:theProps) => {
   const classes=["one","two","three"]
  return (
    <div 
    
    className={`Card ${classes[index]}`}>
        <div className='Card__blur'>
        <span
        className='font-bold '
        >{icon}</span>
        <span>{text}</span>
        </div>
      
    </div>
  )
}
