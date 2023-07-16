import Link from 'next/link'
import React from 'react'
import IconBxArrowBack from '../../../icons/back'

const ClickToSeeAllBlogs = () => {
  return (
    <Link href={"/"} 
    className='flex flex-row text-base items-center 
    gap-1 underline'
    >
       <IconBxArrowBack/> See all
    </Link>
  )
}

export default ClickToSeeAllBlogs