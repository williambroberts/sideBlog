import React,{memo} from 'react'
interface theProps {
    title:string;
}
const DisplayTitle = ({title}:theProps) => {
  return (
<h1
className='
text-[var(--t-1)]
text-primary text-3xl
 font-bold tracking-tight
  leading-tight'>
    {title}
</h1>
  )
}

export default memo(DisplayTitle)