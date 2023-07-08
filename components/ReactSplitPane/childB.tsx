import React from 'react'
type theProps = {
    children:React.ReactNode;
}
const ChildB = ({children}:theProps) => {
  return (
    <div className='childB'>
        {children}
    </div>
  )
}

export default ChildB