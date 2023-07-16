import React,{memo} from 'react'
import DesktopLink from './desktopLink';
import MobileLink from './mobileLink';
import { usePathname } from 'next/navigation';

const BlogLink = ({data}) => {
    const pathname = usePathname()
    function getDevice(){
        return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
    const desktop = getDevice()
  return (
    <div className='w-full'>
      
        {desktop && pathname==="/"?
        <DesktopLink data={data}/>:
        <MobileLink data={data}/>
    }
    </div>
  )
}

export default memo(BlogLink)