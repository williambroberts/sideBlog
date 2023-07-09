import React,{memo} from 'react'
import DesktopLink from './desktopLink';
import MobileLink from './mobileLink';

const BlogLink = ({data}) => {
    //if mobile or touch screen, if desktop
    function getDevice(){
        return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
    const desktop = getDevice()
  return (
    <div>
        {desktop?
        <DesktopLink data={data}/>:
        <MobileLink data={data}/>
    }
    </div>
  )
}

export default memo(BlogLink)