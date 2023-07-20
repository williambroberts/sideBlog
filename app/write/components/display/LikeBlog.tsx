"use client"
import React, {memo} from 'react'
import { useAuth } from '../../../../contexts/AuthContext';
interface likes {
    likes:string[];
}
const LikeBlog = ({likes}:likes) => {
    const {user}=useAuth()
    let numberOfLikes = likes.length
    const handleLike = ()=>{
        //🥩if user in etc.
    }
  return (
    <div className=''>
        <button onClick={handleLike}>

        </button>
        <span>{numberOfLikes}</span>
    </div>
  )
}

export default memo(LikeBlog)