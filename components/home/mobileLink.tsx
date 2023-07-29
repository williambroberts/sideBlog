"use client"
import Image from 'next/image'
import React,{memo} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import CanEdit from './canEdit';
import IconPinned from '../../icons/pin';
//misc css
interface theProps {
    data?:any;
    rank?:number;
    topViewed?:boolean;
    
}

const MobileLink = ({data,rank,topViewed}:theProps) => {
  //console.log(data,"data","rank",rank,topViewed,"topViewed")
  const [loaded,setLoaded]=React.useState<boolean>(false)
  const {setProfileUserUid}=useAuth()
  const router = useRouter()
  const handleProfile = ()=>{
    //console.log(data.authorId,"setting profileUId")
    setProfileUserUid((prev)=>data.authorId)
    router.push(`/profile?id=${data?.authorId}`)
  }
  const handleClick = ()=>{
    let pathname = `/blog?blogId=${data?.id}`
    router.push(pathname)
  }
  return (
    <div className='
    mobile__link hover:bg-[var(--bg-3)] 
    rounded-md py-1 box-border

    flex flex-row items-center text-sm px-2'>
        <div className='flex flex-col gap-1 items-start justify-start'>
            <span className='text-[var(--t-3)] flex items-center
            gap-1'>{data?.dateCreation}
            <div className='gap-1 px-1 
    text-xs tracking-tight flex
    items-center text-[var(--t-3)]
    '
    style={{display:topViewed?"":"none"}}
    >
     <IconPinned/> Top Viewed #{rank}
    </div>
            </span>
            <div 
            onClick={handleProfile}
            className='text-[var(--t-2)]
            hover:underline no-underline
            cursor-pointer
            '>{data?.author}
            
            </div>
            <Link 
            className='text-[var(--t-1)] no-underline
            hover:underline
            '
            href={`/blog?blogId=${data.id}`}>{data?.title}</Link>
            <CanEdit id={data?.authorId} blogId={data.id}/>
        </div>
        <div className='rounded-md overflow-hidden
        flex items-center w-24 h-24 relative ml-auto
        '>

        
        <Image src={data?.coverImage} alt="Blog"
        fill
        onClick={handleClick} 
        style={{objectFit:"cover",objectPosition:"center"}}

        sizes='(max-size:1280px): 200px'
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
        
    </div>
  )
}

export default memo(MobileLink)