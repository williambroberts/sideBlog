import Link from 'next/link';
import React from 'react'
type theProps = {
    text:string;
    href:string;
    textLink:string;

}
const LinkToOther = ({text,href,textLink}:theProps) => {
  return (
    <div className='link__to__other'>
        {text}
<Link href={href}>{textLink}</Link>
    </div>
  )
}

export default LinkToOther