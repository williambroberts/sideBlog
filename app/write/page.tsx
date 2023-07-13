"use client"
import React from 'react'
import PushNoUser from './components/PushNoUser'
import SplitPaneParent from '../../components/splitPane/horizontal/Parent'
import Editor from './components/editor'
import Display from './components/display/display'
import Parent from '../../components/ReactSplitPane/parent'
import { useWrite } from '../../contexts/writeContext'
import { useBlogs } from '../../contexts/BlogContext'
import BlogsComponent from './components/profile/blogs'

const WritePage = () => {
  const {localBlog}=useWrite()
  const {filterByAuth}=useBlogs()
  return (
    <main
    className='write__main'
    >

<PushNoUser/>


      <div className='temporary'>
<Editor/>
<div className='bg-[var(--t-1)]'>

</div> 
   <div className='mt-16'>
    
    
   {filterByAuth? <BlogsComponent/>:
 <Display source={localBlog}/>
}
   
   </div>
   
      </div>

      
    


    </main>
  )
}

export default WritePage