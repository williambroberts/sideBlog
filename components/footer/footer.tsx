import Image from 'next/image'
import React from 'react'
import img from "../../public/images/android-chrome-384x384.png"
const FooterHorizontal = () => {
  return (
    <footer className='bg-[var(--bg-3)] flex flex-row
    items-center justify-between 
    '>
      <span></span>
        <span className='footer__mid'>
          <Image src={img} alt='' width={24} height={24}/> 
          </span>
        <span></span>
    </footer>
  )
}

export default FooterHorizontal