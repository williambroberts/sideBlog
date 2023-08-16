"use client"
import React, { memo } from 'react'
import Link from 'next/link';
import CanEdit from './canEdit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import IconPinned from '../../icons/pin';
interface theProps {
    data?:any;
    topViewed?:boolean;
    rank?:number;
}
const TopBlogLink = ({data,topViewed,rank}:theProps) => {
    const [loaded,setLoaded]=React.useState<boolean>(false)
  const {setProfileUserUid}=useAuth()
  const router = useRouter()

  const handleProfile = ()=>{
    
    setProfileUserUid((prev)=>data.authorId)
    router.push(`/profile?id=${data?.authorId}`)
  }


    const handleClick = ()=>{
        let pathname = `/blog?blogId=${data?.id}`
        router.push(pathname)
      }
  return (
   
    <div className='top__card'>
        <div 
        // role='button'
        aria-label='blog link'
        onClick={handleClick}
        className="skeleton">
            <Image src={data?.coverImage} alt="Blog"
        fill priority
        onClick={handleClick} 
        style={{objectFit:"cover",objectPosition:"center"}}

        sizes='400px'
        className={
          `duration-100 bg-clip-content
          rounded-sm overflow-hidden cursor-pointer
          ease-in-out ml-auto box-content 
          ${loaded?"scale-100 blur-0 grayscale-0":
        
        "scale-110 blur-xl grayscale"}`
        }
        onLoadingComplete={()=>setLoaded(true)}
        />
        </div>
       
         <Link 
            className='top__card__title
            '
            href={`/blog?blogId=${data?.id}`}>{data?.title}</Link>
           <div className='top__card__rank'> <IconPinned/> Top Viewed #{rank}{rank}</div>
     
       <div><CanEdit id={data?.authorId} blogId={data?.id}/> </div> 
       <div className='grid grid-cols-2 w-full py-4 px-4'>
        <span 
        onClick={handleProfile}
        role='button' aria-label='author profile'
        className='top__card__author'>{data?.author}</span>
        <time dateTime={data?.dateCreation} className='top__card__date'>{data?.dateCreation}</time>
       </div>
    </div>
  )
}

export default (TopBlogLink )