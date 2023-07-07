import React, { ChangeEventHandler } from 'react'
import Toggle from './toggle';
type theProps = {
    handleChange:ChangeEventHandler<HTMLInputElement>;
    index:number;
    id:string;

}
const AddImage = ({handleChange,index,id}:theProps) => {
  return (
    <div className='add__image'>
        <span>{}</span>
        <input type='file' onChange={handleChange}/>
        <Toggle id={id} />
    </div>
  )
}

export default AddImage