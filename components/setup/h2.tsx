import React from 'react'
interface theProps {
    children:React.ReactNode;
    
}
const H2 = ({children}:theProps) => {
  return (
    <h2>
        
        {children}
    </h2>
  )
}

export default H2