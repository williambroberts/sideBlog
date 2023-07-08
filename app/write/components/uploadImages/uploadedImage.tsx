"use client"
import Image from 'next/image'
import React from 'react'
import { useWrite } from '../../../../contexts/writeContext';
type theProps = {
    src:string;
}
const UploadedImage = ({src}:theProps) => {
  const {localBlog}=useWrite()
    const [isClicked,setIsClicked]=React.useState<boolean>(false)
  return (
    <div className='UI__image'>
        
        <Image 
        className={isClicked? "blur-2xl":""}
        src="/" alt='/' fill sizes='200px'/>
        <div className='UI__image__grid'>
            <div 
            className='flex flex-row items-center'>
                
            </div>
        </div>
    </div>
  )
}

export default UploadedImage

