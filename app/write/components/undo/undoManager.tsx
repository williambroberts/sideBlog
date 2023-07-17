"use client"
import React, { useEffect } from 'react'
import { useWrite } from '../../../../contexts/writeContext'
import Icon102Undo from '../../../../icons/undo'
import Icon103Redo from '../../../../icons/redo'

const UndoManager = () => {
  const {temp,setTemp,redo,setRedo,history,setHistory}=useWrite()
  const handleUndo = ()=>{
    console.log(history)
    let historyCopy = history.slice()
    let redoText = historyCopy.pop()
    setHistory(historyCopy)
    let newText=historyCopy[historyCopy.length-1] 
    
    setRedo((prev)=>([...prev,redoText]))
    if (newText===undefined){
      setTemp("")
    }else {
      setTemp(newText)
    }
  }
  const handleRedo = ()=>{
    console.log(redo)
    let redoCopy = redo.slice()
    let newText=redoCopy.pop()
    setTemp(newText)
    setRedo(redoCopy)
    setHistory((prev)=>[...prev,newText])
  }
  useEffect(()=>{
    if (temp===""){
      setHistory([])
      setRedo([])
      
    }
  },[temp])
  return (
    <div className='flex flex-row gap-0 px-0'>
        <button className='CRUD__btn UNDO__btn'
        onClick={handleUndo}
        disabled={history.length===0?true:false}
        >
          
          <Icon102Undo/>
          <div className='button__hover'>
              Undo
          </div>
          </button>
        <button className='CRUD__btn UNDO__btn'
        onClick={handleRedo}
        disabled={redo.length===0?true:false}
        >
          <Icon103Redo/>
        <div className='button__hover'>
          Redo
        </div>
        </button>
    </div>
  )
}

export default UndoManager