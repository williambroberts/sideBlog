"use client"
import React, { useEffect, useState } from 'react'
import PushNoUser from './components/PushNoUser'
import Editor from './components/editor'
import Display from './components/display/display'
import { useWrite } from '../../contexts/writeContext'
import { useBlogs } from '../../contexts/BlogContext'
import BlogsComponent from './components/profile/blogs'
import 'split-pane-react/esm/themes/default.css';
import TagManager from './components/addTags/manageTags'
import AddTag from './components/addTags/addTag'
import SplitPaneV1 from '../../components/splitPane/SplitPane'
import { init } from 'next/dist/compiled/@vercel/og/satori'
const WritePage = () => {
  function getDevice(){
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
const desktop = getDevice()
  const {localBlog,isWrite,setIsWrite}=useWrite()
  const {filterByAuth,setFilterByAuth}=useBlogs()
  const direction = React.useRef<"column"|"row">(desktop?"row":"column")
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
        //🧧scroll to top 
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
        setWindowSize({width:window.innerWidth,height:window.innerHeight})
        if (window.innerWidth<mediaBreakPoint){
          direction.current="column"
        }else if (direction.current!=="row"){
          direction.current="row"
        }
      }
      if (window!==undefined){
        let initialWidth = window.innerWidth
        if (initialWidth<mediaBreakPoint){
          direction.current="column"
        }
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
  const handleToggle =()=>{
    if (filterByAuth){
      setFilterByAuth(false)
    }else {
      setIsWrite((prev)=>!prev)
    }
  }
  return (
    <main
    className='mt-16 px-0  bg-[var(--bg-1)] '
    >

<PushNoUser/>


    {desktop&&direction.current==="row"?
    <SplitPaneV1
    position={"fixed"}
    dragBGcolor='var(--t-4)'
    direction={"row"}
    height=''
    width='100%'
    minSize={10}
    
    maxSize={90}
    >
      <Editor/>
     
      {filterByAuth? <BlogsComponent/>:
         
         <div className='flex flex-col 
         box-border bg-[var(--bg-1)]
         gap-1 w-full min-h-full'>
        
<Display source={localBlog}/>

        
         </div>

         }
         {/* <div>{"text"}ok</div>
         <div>{"text"}</div> */}
    </SplitPaneV1>:
  <div className='write__mobile__grid'>
    <div className='write__mobile__grid__top'
    data-theme=""
    >
   
    {isWrite&&!filterByAuth? <Editor/>:!isWrite&&!filterByAuth?
    <Display source={localBlog}/>
  :filterByAuth? <BlogsComponent/>
  :"null"  }
  
  <button 
  data-theme="dark"
  onClick={handleToggle}
  className='write__mobile__mode__btn'>
    <pre>
    {isWrite&&!filterByAuth?"View Blog":
    !isWrite&&!filterByAuth?"Edit":"Back"}
    </pre>
    
  </button>
    </div>
  
      
 {/* {filterByAuth? <BlogsComponent/>:
         
        
<Display source={localBlog}/>


         }   */}

  </div>}

    </main>
  )
}

export default WritePage