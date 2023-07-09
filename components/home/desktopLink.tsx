import Link from 'next/link';
import React from 'react'
type theProps = {
    data?:any;
}
const DesktopLink = ({data}:theProps) => {
  return (
    <div>
        <span>{data?.dateCreation}</span>
        <Link href={`/blog?blogId=${data?.id}`}>{data?.title}</Link>
    </div>
  )
}

export default DesktopLink