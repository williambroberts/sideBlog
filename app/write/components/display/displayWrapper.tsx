"use client"
import React from 'react'
import { useWrite } from '../../../../contexts/writeContext'
import Display from './display'

const DisplayWrapper = () => {
  const {localBlog}=useWrite()
  return (
    <div className='display__wrapper'>
      <Display source={localBlog}/>
    </div>
  )
}

export default DisplayWrapper