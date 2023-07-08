import React, { ChangeEventHandler } from 'react'

type theProps = {
    handleChange:ChangeEventHandler<HTMLInputElement>;
   value:string;

}
const AddImage = ({handleChange,value}:theProps) => {
  return (
    <div className='add__image'>
        <span></span>
        <input type='file' onChange={handleChange}
        value={value}
        
        />
       
    </div>
  )
}

export default AddImage