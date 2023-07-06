import React,{memo} from 'react'
type ChildrenProps={
    children:React.ReactNode
}
const ChildPane = ({children}:ChildrenProps) => {
  return (
    <div className='splitPane__child__h'>
{children}
    </div>
  )
}

export default memo(ChildPane)