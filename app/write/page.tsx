import React from 'react'
import PushNoUser from './components/PushNoUser'
import SplitPaneParent from '../../components/splitPane/horizontal/Parent'

const WritePage = () => {
  return (
    <main
    className='write__main'
    >

{/* <PushNoUser/> */}
<SplitPaneParent childLeft={"left"}
      childRight={"right"}
      />

    </main>
  )
}

export default WritePage