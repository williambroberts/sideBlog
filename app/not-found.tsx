"use client"

import React, { useEffect } from 'react'


const Custom404 =  () => {
 
  useEffect(()=>{
    setTimeout(()=>{
       
      window.location.assign("/")
       
    },2000)
  },[])
 
    
    

  return (
    <main className='page-404'>
       404-not found going back
    </main>
    
  )
}

export default Custom404