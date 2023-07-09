import React from 'react'
interface theProps {
    category:string;
}
const DisplayCategory = ({category}:theProps) => {
  return (
    <div
    className='display__category'
    >{category}</div>
  )
}

export default DisplayCategory