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
const WritePage = () => {
  function getDevice(){
    return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
const desktop = getDevice()
  const {localBlog}=useWrite()
  const {filterByAuth}=useBlogs()
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
    className='mt-16 px-0  bg-[var(--bg-1)] '
    >

<PushNoUser/>


{/* <SplitPane
className='p-0'
        split={direction.current? direction.current: "vertical"}
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={50} maxSize='80%'>
          <div className='overflow-scroll px-0 py-0 bg-transparent'>
          <Editor/>
          </div>
        
        </Pane>
        <Pane style={style('var(--bg-2)')} 
        minSize={50}
        maxSize='80%'>
          <div 
          id='right__pane'
          className={`overflow-scroll h-full w-full
           box-border flex flex-col overflow-x-hidden
           px-3 py-2
           ${direction.current==="vertical"? "pt-16":"pt-4"}
           `}>
          {filterByAuth? <BlogsComponent/>:
         
         <div className='flex flex-col 
         box-border 
         gap-1 w-full min-h-full'>
<Display source={localBlog}/>
<TagManager tags={localBlog?.tags}/>
        <AddTag/>
         </div>

         }
          </div>
       
        </Pane>
        
      </SplitPane> */}
    <SplitPaneV1
    dragBGcolor='var(--t-4)'
    direction={direction?.current}
    height='100dvh'
    width='100%'
    minSize={0}
    maxSize={100}
    >
      <Editor/>
     
      {/* {filterByAuth? <BlogsComponent/>:
         
         <div className='flex flex-col 
         box-border bg-[var(--bg-1)]
         gap-1 w-full min-h-full'>
<Display source={localBlog}/>
<TagManager tags={localBlog?.tags}/>
        <AddTag/>
         </div>

         } */}

    </SplitPaneV1>
{/* <SplitPaneV1>
<Editor/>
{filterByAuth? <BlogsComponent/>:
         
         <div className='flex flex-col 
         box-border 
         gap-1 w-full min-h-full'>
<Display source={localBlog}/>
<TagManager tags={localBlog?.tags}/>
        <AddTag/>
         </div>

         }
</SplitPaneV1> */}

    </main>
  )
}

export default WritePage