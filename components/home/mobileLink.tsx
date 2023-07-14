"use client"
import Image from 'next/image'
import React,{memo} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import CanEdit from './canEdit';
interface theProps {
    data?:any;
    
}
const MobileLink = ({data}:theProps) => {
  const [loaded,setLoaded]=React.useState<boolean>(false)
  const {setProfileUserUid}=useAuth()
  const router = useRouter()
  const handleProfile = ()=>{
    console.log(data.authorId,"setting profileUId")
    setProfileUserUid((prev)=>data.authorId)
    //router.push("/profile")
  }
  const handleClick = ()=>{
    let pathname = `/blog?blogId=${data?.id}`
    router.push(pathname)
  }
  return (
    <div className='flex flex-row items-center text-sm w-full px-2'>
        <div className='flex flex-col gap-1 items-start justify-start'>
            <span className='text-[var(--t-3)]'>{data?.dateCreation}</span>
            <Link 
            onClick={handleProfile}
            href={`/profile?id=${data?.authorId}`}
            className='text-[var(--t-2)]
            hover:underline
            '>{data?.author}</Link>
            <Link 
            className='text-[var(--t-1)]
            hover:underline
            '
            href={`/blog?blogId=${data.id}`}>{data?.title}</Link>
            <CanEdit id={data?.authorId} blogId={data.id}/>
        </div>
        <Image src={data?.coverImage} alt="Blog"
        width={96} height={96}
        onClick={handleClick} 
        style={{width:"96px",height:"96px",overflow:"hidden"}}
        sizes='(max-size:1280px): 200px'
        className={
          `duration-100 bg-clip-content
          rounded-sm overflow-hidden cursor-pointer
          ease-in-out ml-auto box-content px-4
          ${loaded?"scale-100 blur-0 grayscale-0":
        
        "scale-110 blur-xl grayscale"}`
        }
        onLoadingComplete={()=>setLoaded(true)}
        />
        
    </div>
  )
}

export default memo(MobileLink)