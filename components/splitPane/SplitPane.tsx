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
    
}
export default function SplitPaneV1({direction="row"
,child1
,child2,children,
minSize=5,maxSize=95,
width="",height="",
position="relative",
dragBGcolor,
}:theProps) {
   console.log(children,typeof(children),children.length)
   
   const [mouseDown,setMouseDown]=useState(false)
   
   const [dim,setDim]=useState(50)
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
   setDim(finalPos)
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
   //console.log(parentWidth,x,percentX,finalWidth)
    //width.current=newWidth
   setDim(finalWidth)
 }
 useEffect(()=>{
   const items = document.querySelectorAll(".item__sp")
  
 },[])
  useEffect(()=>{
    //🌽key is with every render not ,[]?
    let parent = document.querySelector(".parent__sp")
    parent.addEventListener("mouseup",end)
    return ()=>{
      //console.log(width,"width")
      parent.removeEventListener("mouseup",end)
    }
  })
  
  return (
   <div className="parent__sp"
     style={{width:`${width}`,height:`${height}`,
           flexDirection:direction,
           position:position,
            }}
     onMouseMove={handleMouseMove}>
      <div className="item__sp" id="item1"
       style={{
          
          width:direction==="row"?`${dim}%`:"100%",
          height:direction==="column"?`${dim}%`:"100%"
        }}
        > {child1}
            {children?.length===undefined?children:
             children?.slice(0,children?.length/2)}
        <div id="drag"
          style={{height:direction==="column"?"10px":"",
  width:direction==="column"?"100%":"",
    bottom:direction==="column"?"0px":"",
      cursor:direction==="row"?"col-resize":"row-resize",
      backgroundColor:dragBGcolor
                 }}
          onMouseDown={down}
          >
            
            
             </div>
      </div>
      <div 
        style={{
          width:direction==="row"?"auto":"100%",
          height:direction==="row"?"100%":"auto"     
               }}
        className="item" id="item2">
            {child2}
            {children.length===undefined?null:children?.slice(children?.length/2)}
        </div>
    </div>
  )
}

