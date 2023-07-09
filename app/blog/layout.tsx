import React from 'react'
import HeaderHorizontal from '../../components/header/header';
import FooterHorizontal from '../../components/footer/footer';
type ChildrenProps = {
    children:React.ReactNode;
}
export const metadata = {
    title: 'blog'
}

const WriteLayout = ({children}:ChildrenProps) => {
  return (
    <div
    className='layout__div'
    >
      
      <HeaderHorizontal/>
       
       {children}
      
        <FooterHorizontal/>
    </div>
  )
}

export default WriteLayout