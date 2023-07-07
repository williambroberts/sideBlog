import React from 'react'
import PushNoUser from './components/PushNoUser'
import SplitPaneParent from '../../components/splitPane/horizontal/Parent'
import Editor from './components/editor'
import Display from './components/display'

const WritePage = () => {
  return (
    <main
    className='write__main'
    >

{/* <PushNoUser/> */}
{/* <SplitPaneParent childLeft={"left"}
      childRight={"right"}
      /> */}
    <Editor/>
    <Display/>


    </main>
  )
}

export default WritePage