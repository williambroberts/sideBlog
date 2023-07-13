"use client"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useBlogs } from '../../contexts/BlogContext';
import { useWrite } from '../../contexts/writeContext';
import { usePathname, useRouter } from 'next/navigation';
import IconEdit from '../../icons/edit';
import IconDelete from '../../icons/delete';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig';
type theProps = {
    id:string;
    blogId:string;
}
const CanEdit = ({id,blogId}:theProps) => {
    const {user,isAdmin}=useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const {setFilterByAuth,getBlogsByLatest}=useBlogs()
    const {setLocalBlog,getBlogById,setIsDelete,isDelete}=useWrite()
    function getDevice(){
        return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
    const desktop = getDevice()
    const handleEdit = ()=>{
       getBlogById(blogId)
       
       setFilterByAuth((prev)=>false)
       if (pathname!=="/write"){
         router.push(`/write?blogId${blogId}`)
       }else if (pathname==="/write"){
        router.push(`/write?blogId${blogId}`)
       }
      
      // window.location.assign("/write")
    }
    const handleDelete =async ()=>{
      //🌮dELEE
      console.log("delete blog",blogId)
      setIsDelete(false)
      const docRef =doc(firestore,"Blogs",blogId)
      await deleteDoc(docRef)
      await getBlogsByLatest(false,false)
    }
    
  return (
    desktop?    
    <div className='canEdit__desktop'
    style={{display:id===user?.uid?"":isAdmin? "":"none"}}>

        <button className={`${isDelete?
      "px-0":"px-1"  
      }`}
        style={{width:isDelete?"0px":""}}
        onClick={handleEdit}
        ><IconEdit/> Edit</button>
        <button 
        className={`${isDelete?
          "px-0":"px-1"  
          }`}
        style={{width:isDelete?"0px":""}}
        onClick={()=>setIsDelete((prev)=>true)}
        ><IconDelete/>Delete</button>
        <button className={`${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={()=>setIsDelete((prev)=>false)}
        style={{width:isDelete?"":"0px"}}
        >
          Cancel
        </button>
        <button className={`${isDelete?
      "px-1":"px-0"  
      }`}
        onClick={handleDelete}
         style={{width:isDelete?"":"0px"}}
        >
          Delete
        </button>
    </div>:
    <div className='canEdit__touch'
    style={{display:id===user?.uid?"":isAdmin?"":"none"}}>
    {/* 🧧ADMIN userDocData.admin */}
    <button className=''
    onClick={handleEdit}
    ><IconEdit/> EDIT</button>
    <button 
    onClick={handleDelete}
    className=''><IconDelete/> DELETE</button>
    </div>

    
  )
}

export default CanEdit