import React,{memo} from 'react'
import DesktopLink from './desktopLink';
import MobileLink from './mobileLink';
import { usePathname } from 'next/navigation';
interface theProps {
  data?:any;
  topViewed?:boolean;
  rank?:number;
}
const BlogLink = ({data,topViewed,rank}:theProps) => {
    const pathname = usePathname()
    function getDevice(){
        return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
    const desktop = getDevice()
    console.log(desktop,"desktop")
  return (
    <div className='w-full'>
      
        {desktop && pathname==="/"?
        <DesktopLink data={data} topViewed={topViewed}
        rank={rank}
        />:
        <MobileLink data={data} 
        rank={rank} topViewed={topViewed}
        />
    }
    </div>
  )
}

export default memo(BlogLink)