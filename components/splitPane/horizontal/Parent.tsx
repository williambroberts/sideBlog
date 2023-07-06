
import React from 'react'
import ChildPane from './child'
import SplitPaneHslider from './slider'
type theProps = {
  childLeft?:React.ReactNode;
  childRight?:React.ReactNode;
}
const SplitPaneParent = ({childLeft,childRight}:theProps) => {
  
  return (
    <div className='splitPane__parent__h'>
      <ChildPane>
    {childLeft}
    left
      </ChildPane>
      <SplitPaneHslider/>
      <ChildPane>
        {childRight}
        right
      </ChildPane>
    </div>
  )
}

export default SplitPaneParent