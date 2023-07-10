"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useBlogs } from '../../contexts/BlogContext';
import { useWrite } from '../../contexts/writeContext';
import { useRouter } from 'next/navigation';
type theProps = {
    id:string;
}
const CanEdit = ({id}:theProps) => {
    const {user}=useAuth()
    const router = useRouter()
    const {setLocalBlog,getBlogById}=useWrite()
    function getDevice(){
        return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
    const desktop = getDevice()
    const handleEdit = ()=>{
       getBlogById(id)
       router.push("/write")
      // window.location.assign("/write")
    }
  return (
    desktop?    
    <div className='canEdit__desktop'>
        <button className=''
        onClick={handleEdit}
        >EDIT</button>
        <button className=''>DELETE</button>
    </div>:
    <div>
    <button className=''>EDIT</button>
    <button className=''>DELETE</button>
    </div>

    
  )
}

export default CanEdit