import React from 'react'
interface theProps {
    category:string;
}
const DisplayCategory = ({category}:theProps) => {
  return (
    <div
    className='flex flex-row items-center bg-[var(--bg-3)]
    tracking-wide mt-6
    px-1 py-1 rounded-sm box-border text-sm text-clip w-min uppercase
    '
    >{category}</div>
  )
}

export default DisplayCategory