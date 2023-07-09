"use client"
import Image from 'next/image'
import React from 'react'
interface theProps {
    data?:any;
}
const MobileLink = ({data}:theProps) => {
  return (
    <div>
        <div>
            <span></span>
            <span></span>
        </div>
        <Image src={data?.coverImage} alt="Blog"
        width={96} height={96}
        sizes='(max-size:1280px): 200px'
        />
    </div>
  )
}

export default MobileLink