import React, { MouseEventHandler } from 'react'
type theProps = {
    disabled:boolean;
    handleClick:MouseEventHandler<HTMLButtonElement>;
}
const SaveButton = ({handleClick,disabled}:theProps) => {
  return (
    <button className='save__button'
    onClick={handleClick}
    disabled={disabled}
    >

    </button>
  )
}

export default SaveButton