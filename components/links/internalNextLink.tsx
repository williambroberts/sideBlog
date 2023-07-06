import Link from 'next/link'
import React from 'react'
type LinkProps = {
    text:string;
    href:string;
}
const InternalNextLink = ({href,text}:LinkProps) => {
  return (
    <Link href={href}
    className='internal__link'
    >{text}</Link>
  )

  }
export default InternalNextLink