import Link from 'next/link';
import React from 'react'
import CanEdit from './canEdit';
type theProps = {
    data?:any;
}
const DesktopLink = ({data}:theProps) => {
  return (
    <div className='text-base tracking-wide py-2'>
        <span
        className='pr-8 text-[var(--t-3)]'
        >{data?.dateCreation}</span>
        <Link href={`/blog?blogId=${data?.id}`}
        className='text-[var(--t-1)]'
        >{data?.title}</Link>
        <CanEdit id={data.id}/>
    </div>
  )
}

export default DesktopLink