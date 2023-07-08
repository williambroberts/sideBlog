"use client"
import Image from 'next/image';
import React from 'react'
import { useWrite } from '../../../../contexts/writeContext';
type theProps = {
    src:string;
}
const DisplayCoverImage = ({src}:theProps) => {
    const [loading,setLoading]=React.useState<false>(false)
    const {localBlog}=useWrite()

  return (
    <div className={`display__coverImage ${src===""?"bg":""}`}
    
    >
        <Image 
        style={{opacity:src===""?"0":"1"}}
      sizes="(min-width:1100px) 60vw,100vw"
      src={src} alt="Cover Image" 
      
      // priority
      fill
      objectFit='cover'
      objectPosition='center'
      className={`
              duration-700 ease-in-out 
              ${
                loading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
          onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}

export default DisplayCoverImage