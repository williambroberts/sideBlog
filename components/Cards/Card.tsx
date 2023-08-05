import React from 'react'
import laptop  from "../../public/images/laptop.webp"
import letters from "../../public/images/fancyLetters.jpeg"
import coffee from "../../public/images/coffee.webp"
import Link from 'next/link';
interface theProps {
    icon:any;
    index:number;
    text:string;
}
export const Card = ({text,icon,index}:theProps) => {
   const classes=["one","two","three"]
  return (
    <div 
    data-theme="dark"
    className={`Card ${classes[index]}`}>
        <div className='Card__blur'>
        <span
        className='font-bold
        text-lg
        text-white '
        >{icon}</span>
        <span
        className='text-center'
        >{text}</span>
        {/* <Link href={"/"}
        className='Card__button'
        >Start now</Link> */}
        </div>
      
    </div>
  )
}

//discorver,access all blogs, create an account
//write -->start now, create posts, edit posts
//read -->start now, search blogs,