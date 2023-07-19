
import React from 'react'
import TagItem from './TagItem';
import {v4} from "uuid"
interface theProps {
  tags?:string[];
}
const TagManager = ({tags}:theProps) => {
  return (
    <div className={`tag__manager`}>
      {tags?.map((item)=>(
      <TagItem 
      tag={item}
      key={v4()}/>))}
      
    
    </div>
  )
}

export default TagManager