"use client"
import React, { useEffect, useState } from 'react'
import PushNoUser from './components/PushNoUser'
import SplitPaneParent from '../../components/splitPane/horizontal/Parent'
import Editor from './components/editor'
import Display from './components/display/display'
import { useWrite } from '../../contexts/writeContext'
import { useBlogs } from '../../contexts/BlogContext'
import BlogsComponent from './components/profile/blogs'
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
const WritePage = () => {
  const {localBlog}=useWrite()
  const {filterByAuth}=useBlogs()
  const direction = React.useRef<"vertical"|"horizontal">("vertical")
  const mediaBreakPoint = 768
  const [sizes, setSizes] = useState([100, '30%', 'auto']);
  const [windowSize,setWindowSize]=useState({width:0,height:0})
  useEffect(()=>{
 let sashCollection = document.querySelectorAll(".react-split__sash")
  //console.log(sashCollection)
sashCollection.forEach((element:any)=>{
  element.childNodes.forEach((child:any)=>{
    child.style.backgroundColor="var(--t-4)"
  })
  let paneCollection = document.querySelectorAll(".react-split__pane")
paneCollection.forEach((element:any)=>{
  element.style.overflow ="scroll"
})
})
//let innerSashCollectio
  },[])
  
    useEffect(()=>{
      function updateWindowSizeState(){
        setWindowSize({width:window.innerWidth,height:window.innerHeight})
        if (window.innerWidth<mediaBreakPoint){
          direction.current="horizontal"
        }else if (direction.current!=="vertical"){
          direction.current="vertical"
        }
      }
      if (window!==undefined){
        window?.addEventListener("resize",updateWindowSizeState)
        //window resize function🍔
      }
      
      return ()=>{
          window.removeEventListener("resize",updateWindowSizeState)
      }
    },[])
  function style (color) {
    return {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color
    };
  }
  return (
    <main
    className='mt-16 px-2'
    >

<PushNoUser/>


<SplitPane
        split={direction.current? direction.current: "vertical"}
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={50} maxSize='80%'>
          <div className='overflow-scroll h-full'>
          <Editor/>
          </div>
        
        </Pane>
        <Pane style={style('var(--bg-2)')} 
        minSize={50}
        maxSize='80%'>
          <div className={`overflow-scroll h-full w-full px-2 
           box-border
           ${direction.current==="vertical"? "pt-16":"pt-4"}
           `}>
          {filterByAuth? <BlogsComponent/>:
         <Display source={localBlog}/>}
          </div>
       
        </Pane>
        
      </SplitPane>
    


    </main>
  )
}

export default WritePage