import React from 'react'
import PushNoUser from './components/PushNoUser'
import SplitPaneParent from '../../components/splitPane/horizontal/Parent'
import Editor from './components/editor'
import Display from './components/display/display'
import Parent from '../../components/ReactSplitPane/parent'

const WritePage = () => {
  return (
    <main
    className='write__main'
    >

{/* <PushNoUser/> */}
{/* <SplitPaneParent childLeft={"left"}
      childRight={"right"}
      /> */}
      {/* <Parent/> */}

      <div className='temporary'>
<Editor/>
<div className='bg-[var(--t-1)]'>

</div>
    <Display/>
      </div>

      
    


    </main>
  )
}

export default WritePage