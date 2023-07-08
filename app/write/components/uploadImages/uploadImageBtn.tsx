import React from 'react'
type theProps = {
    icon:React.ReactNode;
    text:string;
    icon2?:React.ReactNode;
}
const UploadImageButton = ({icon,icon2,text}:theProps) => {
  return (
    <button className='UI__btn'>
        {icon}
        {text}
    </button>
  )
}

export default UploadImageButton