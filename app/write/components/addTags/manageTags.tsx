import React from 'react'
interface theProps {
  tags?:string[];
}
const TagManager = ({tags}:theProps) => {
  return (
    <div className='tag__manager'>
      {tags.map((item)=>)}
    </div>
  )
}

export default TagManager