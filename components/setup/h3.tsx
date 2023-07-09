import React from 'react'
interface theProps {
    children:React.ReactNode;
    
}
const H3 = ({children}:theProps) => {
  return (
    <h3>
        
        {children}
    </h3>
  )
}

export default H3