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
//const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore exercitationem ut eum provident cum in, nesciunt iusto molestias recusandae ex explicabo nihil tempora veritatis facere fugiat eaque similique animi tenetur illo doloribus beatae aliquam consequuntur! Quidem tenetur laboriosam a nam dolor laborum quia, minima laudantium ut repellat omnis temporibus minus molestias dolorum inventore eos, excepturi exercitationem soluta nesciunt! Ratione, eaque. Quisquam nisi quas voluptate alias pariatur corrupti commodi nobis velit, eaque, illo quam repudiandae! Rerum ipsa, voluptatem reiciendis perspiciatis assumenda magni commodi possimus aliquid iure atque tempora impedit error vitae fugiat laboriosam in nihil! Facere quisquam rerum quod sint eum iusto similique perferendis velit deleniti. Blanditiis repellat debitis beatae quidem ipsam dolores provident sint natus minima! Obcaecati, molestias nulla sed aliquam quidem eius quia. Magnam obcaecati adipisci nisi dolorum quas tenetur optio. Explicabo nam cum nobis, odit voluptas atque necessitatibus cumque laboriosam quaerat qui dolorum ipsa sequi recusandae excepturi quidem. Animi sequi velit provident voluptas quos similique veritatis saepe illum facilis fuga culpa inventore delectus commodi, nam dignissimos itaque placeat dolor? Tempore dolor iste unde earum, ipsam sed fugiat mollitia consectetur laborum rem distinctio labore consequuntur quaerat aspernatur! Atque autem cumque voluptatem consequuntur voluptas itaque libero reprehenderit repellendus unde incidunt aperiam fugit magni necessitatibus, harum aliquam labore maiores tenetur repudiandae, ex tempore ea at mollitia rem! Veniam autem minima molestiae aliquid provident harum recusandae illum repellat corrupti consectetur error, reiciendis, voluptate velit fugiat! Delectus ex magnam, earum itaque fugit incidunt sunt accusamus fuga libero nulla nisi. Repellat quo nemo iusto perspiciatis itaque nulla id dolorum incidunt quidem aut? Nulla, repudiandae! Iusto maxime labore error magnam architecto, molestias, incidunt voluptate voluptas deleniti cum ipsa vel. Est libero ducimus officiis labore quis accusamus dolor doloremque, ab asperiores ad culpa aliquam dolores amet voluptatem, laborum tempore consequatur distinctio, dignissimos quam nihil vitae molestiae ipsum illum deserunt? Voluptas tempore corporis sint et itaque. Doloribus suscipit natus perspiciatis eos accusamus repudiandae tenetur corporis dolorum, qui sed similique, vitae nemo laudantium deserunt facere ipsam molestiae voluptatem velit delectus numquam eius eum temporibus? Quidem earum nisi commodi laboriosam sequi esse itaque eaque praesentium consectetur asperiores voluptate debitis officiis delectus enim at rerum temporibus expedita atque culpa magnam, repudiandae rem dolores modi! Deleniti distinctio laudantium sit minus ab voluptatibus aspernatur! Dolores repudiandae accusantium ducimus placeat aliquam? At saepe aliquid dolore ex voluptates non maxime quo perspiciatis soluta facilis exercitationem, harum beatae, quaerat nihil error delectus commodi! Autem, quisquam!"
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