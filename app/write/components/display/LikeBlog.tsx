"use client"
import React, {memo,useEffect} from 'react'
import { useAuth } from '../../../../contexts/AuthContext';
import { useWrite } from '../../../../contexts/writeContext';
import { getABlogFromFirebase, updateABlog } from '../../../../firebase/CLientFunctions';
import IconBxsLike from '../../../../icons/liked';
import IconBxLike from '../../../../icons/like';
import { useNotifications } from '../../../../contexts/NotificationContext';
interface likes {
    likes?:string[];
}
const LikeBlog = ({likes}:likes) => {
    const {user}=useAuth()
    const {notificationHandler}=useNotifications()
    const {setLocalBlog,setFireBlog,localBlog,fireBLog}=useWrite()
    const [isLiked,setIsLiked]=React.useState<boolean>(false)
    let numberOfLikes = likes?.length

    useEffect(()=>{
        function handleSetLikes (){
            if (fireBLog.likes.includes(user?.uid)){
                setIsLiked(true)
    
            }else {
                setIsLiked(false)
            }
        }
        fireBLog?.likes && handleSetLikes()
    },[fireBLog?.likes])

    const handleLike =async ()=>{
        //🥩if user in etc.
        if (user===null || user===undefined){
            notificationHandler("alert","Please sign in to likes a blog")
            return
        }
        let newLocalBlog = {...fireBLog}
        if (likes.includes(user.uid)){
            let newLikes = [...likes].filter((item)=>item!==user.uid)
            
            newLocalBlog.likes=newLikes
            
        }else{
            let newLikes = fireBLog.likes
            newLikes.push(user.uid)
            newLocalBlog.likes=newLikes
            
        }
        console.log(newLocalBlog)
        await updateABlog(newLocalBlog)
        let updatedBlogFromFirebase = await getABlogFromFirebase(newLocalBlog.id)
        setFireBlog((prev)=>({...updatedBlogFromFirebase}))
        setLocalBlog({...updatedBlogFromFirebase})
        
    }
  return (
    <div className='flex flex-row
    bg-[var(--bg-3)] mt-3
     items-center gap-1 px-2 rounded-full
     w-min
     '>
        <button 
        className='
        opacity-60
        hover:opacity-100'
        onClick={handleLike}>
            {isLiked? <IconBxsLike/>:<IconBxLike/>}
        </button>
        <span className=''>
            {numberOfLikes!==undefined? numberOfLikes:""}</span>
    </div>
  )
}

export default memo(LikeBlog)