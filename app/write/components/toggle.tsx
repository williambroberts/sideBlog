import React from 'react'
import ToggleOrderBtn from './toggleOrder'
import IconCaretUp from '../../../icons/write/up'
import DeleteContentItem from './deleteContentItem';
type theProps = {
    id:string;
}
const Toggle = ({id}:theProps) => {
  return (
    <div className='write__toggle'>
        <ToggleOrderBtn icon={<IconCaretUp/>} direction={"up"}
        id={id}
        />
    <DeleteContentItem id={id}/>
    <ToggleOrderBtn icon={<IconCaretUp/>} direction={"up"}
        id={id}
        />
    </div>
  )
}

export default Toggle