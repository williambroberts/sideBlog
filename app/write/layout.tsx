import React from 'react'
import HeaderHorizontal from '../../components/header/header';
import FooterHorizontal from '../../components/footer/footer';
import WriteProvider from '../../contexts/writeContext';
type ChildrenProps = {
    children:React.ReactNode;
}
export const metadata = {
    title: 'write'
}

const WriteLayout = ({children}:ChildrenProps) => {
  return (
    <div
    className='layout__div'
    >
      
      <HeaderHorizontal/>
       <WriteProvider>
       {children}
      </WriteProvider>
        <FooterHorizontal/>
    </div>
  )
}

export default WriteLayout