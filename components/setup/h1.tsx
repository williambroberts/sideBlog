import React from 'react'
interface theProps {
    children:React.ReactNode;
    
}
const H1 = ({children}:theProps) => {
  return (
    <h1>
        
        {children}
    </h1>
  )
}

export default H1