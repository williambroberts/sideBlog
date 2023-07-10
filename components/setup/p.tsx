import React from 'react'
interface theProps {
    children:React.ReactNode;
    
}
const P = ({children}:theProps) => {
  return (
    <p>
        
        {children}
    </p>
  )
}

export default P