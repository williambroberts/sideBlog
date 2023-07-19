"use client"
import React, {useEffect,useState} from "react"
interface  theProps {
    child1?:React.ReactNode;
    child2?:React.ReactNode;
    direction?:"column"|"row";
    minSize?:number | null;
    maxSize?:number | null;
    width?:string;
    height?:string;
    position?:any;
    dragBGcolor?:string;
    children?:React.ReactNode | any;
    top?:string;

    
}
export default function SplitPaneV1({direction="row"
,child1
,child2,children,
minSize=5,maxSize=95,
width="",height="",
position="",
dragBGcolor,top,
}:theProps) {
  // console.log(children,typeof(children),children.length)
   
   const [mouseDown,setMouseDown]=useState(false)
   
   const [dim1,setDim1]=useState(50)
   const [dim2,setDim2]=useState(50)
   const [dragBarDim,setDragBarDim]=useState<number|undefined>(undefined)
  const down = (e)=>{
    e.preventDefault()
    //console.log(e.clientX,e.clientY,"down👍🏻")
    setMouseDown(true)
  }
 const end = (e)=>{
   e.preventDefault()
   setMouseDown(false)

   
 }
 const handleMouseMove = (e)=>{
    if (direction==="column"){
        moveCol(e)
    }else{
        moveRow(e)
    }
 }
 const moveCol = (e)=>{
   e.preventDefault()
   if (!mouseDown){return}
   let  parent = document.querySelector(".parent__sp")
   let parentRect = parent.getBoundingClientRect()
   
   let parentHeight = parentRect.bottom-parentRect.top
   let y =e.clientY-parentRect.top
   let percentY = y*100/parentHeight
   let newPos = Math.min(percentY,maxSize)
   let finalPos = Math.max(newPos,minSize)
   setDim1(finalPos)
   setDim2((prev)=>(100-finalPos))
    //adjust dragbar height 👍🏻 
    let item = document.querySelector("#item1")
    let newHeight=item.scrollHeight
    console.log(newHeight,"👍🏻")
    setDragBarDim(newHeight)
 }
 const moveRow = (e)=>{
   e.preventDefault()
   if(!mouseDown){return}
  
   let  parent = document.querySelector(".parent__sp")
   let parentRect = parent.getBoundingClientRect()
   let parentLeftOffset = parentRect.left
   let parentWidth=parentRect.right-parentRect.left
   let x = e.clientX-parentLeftOffset
   let percentX = x*100/parentWidth
   const item1 = document.getElementById("item1")
   let newWidth = Math.max(percentX,minSize)
   let finalWidth = Math.min(maxSize,newWidth)
   setDim2((prev)=>(100-finalWidth))
   setDim1(finalWidth)
    //adjust dragbar height 👍🏻 
    let item = document.querySelector("#item1")
    let newHeight=60
    let itemChildren = item.children
    for (let i=0;i<itemChildren.length-1;i++){
      if (itemChildren[i].id!=="drag"){
        
        newHeight+=itemChildren[i].scrollHeight
        //console.log(newHeight,itemChildren.length)
      }
    }
   // console.log(newHeight,"👍🏻")
    let finalDragHeight=Math.max(item.clientHeight,newHeight)
    setDragBarDim(finalDragHeight)
 }
 useEffect(()=>{
   let item = document.getElementById("item1")
   let newHeight=60
    let itemChildren = item.children
    for (let i=0;i<itemChildren.length-1;i++){
      if (itemChildren[i].id!=="drag"){
        
        newHeight+=itemChildren[i].scrollHeight
        console.log(newHeight,itemChildren.length)
      }
    }
    //console.log(newHeight,"👍🏻")
    let finalDragHeight=Math.max(item.clientHeight,newHeight)
    setDragBarDim(finalDragHeight)  
 },[])
  useEffect(()=>{
    //🌽key is with every render not ,[]?
    let parent = document.querySelector(".parent__sp")
    parent.addEventListener("mouseup",end)
    parent.addEventListener("touchend",end)
    return ()=>{
      //console.log(width,"width")
      parent.removeEventListener("mouseup",end)
      parent.removeEventListener("touchend",end)
    }
  })
  
  return (
   <div className="parent__sp"
     style={{width:`${width}`,height:`${height}`,
           flexDirection:direction,
           position:position,
            }}
            onTouchMove={handleMouseMove}
     onMouseMove={handleMouseMove}>
      <div className="item__sp" id="item1"
       style={{
          
          width:direction==="row"?`${dim1}%`:"100%",
          height:direction==="column"?`${dim1}%`:"100%"
        }}
        > {child1}
            {children?.length===undefined?children:
             children?.slice(0,children?.length/2)}
        <div 
        
        id="drag"
           style={{
            opacity:mouseDown?"0.6":"1",
            height:direction==="column"?"10px":`${dragBarDim}px`,
           width:direction==="column"?"100%":"",
             bottom:direction==="column"?"0px":"",
               cursor:direction==="row"?"col-resize":"row-resize"
                          }}
                 onTouchStart={down}
          onMouseDown={down}
          >
            
            
             </div>
      </div>
      <div 
         style={{
          width:direction==="row"?`${dim2}%`:"100%",
          height:direction==="row"?"100%":`${dim2}%`     
               }}
        className="item__sp" id="item2">
            {child2}
            {children.length===undefined?null:children?.slice(children?.length/2)}
        </div>
    </div>
  )
}

