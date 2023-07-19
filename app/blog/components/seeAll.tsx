import Link from 'next/link'
import React from 'react'
import IconBxArrowBack from '../../../icons/back'

const ClickToSeeAllBlogs = () => {
  return (
    <Link href={"/"} 
    className='flex flex-row 
    py-3 h-11 hover:underline hover:scale-95
    text-base items-center 
    gap-1 no-underline'
    >
       <IconBxArrowBack/> See all
    </Link>
  )
}

export default ClickToSeeAllBlogs