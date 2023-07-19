"use client"
import Image from 'next/image'
import React,{useEffect, useState,memo} from 'react'
import { useWrite } from '../../../../contexts/writeContext';
import UploadImageButton from './uploadImageBtn';
import IconBxArrowBack from '../../../../icons/back';
import IconCopy from '../../../../icons/copy';
import IconTickCircle from '../../../../icons/tick';
import IconImages from '../../../../icons/cover';
import IconDelete from '../../../../icons/delete';
import IconBxPhotoAlbum from '../../../../icons/photo';
import IconUpdate from '../../../../icons/update';
type theProps = {
    src:string;
}
const UploadedImage = ({src}:theProps) => {
  const {localBlog,setLocalBlog,setHasChanged}=useWrite()
  const [deleted,setDeleted]=useState<boolean>(false)
  const [isSetToCover,setIsSetToCover]=React.useState<boolean>(false)
    const [isClicked,setIsClicked]=React.useState<boolean>(false)
    const [isCopied,setIsCopied]=React.useState<boolean>(false)
    const handleBack = ()=>{
      console.log("back")
      
      setTimeout(()=>{
        setHasChanged((prev)=>true)
        setIsClicked(false)
      },100)
    }
    useEffect(()=>{
      let timeout=null
      if (isClicked){
         timeout=setTimeout(()=>{
          setIsClicked((prev)=>false)
        },5000)
      }
      return ()=>{
        if(isClicked){
          clearTimeout(timeout)
        }
      }
    },[isClicked])

    
    const handleDelete =async ()=>{
      setDeleted((prev)=>true)
       setTimeout(()=>{
        setDeleted((prev)=>false)
        let newLocalBlog = {...localBlog}
        let img = newLocalBlog.uploadedImages?.filter((item)=>item===src)
        if (!localBlog.deletedImages.includes(img)){
          newLocalBlog.deletedImages.push(img[0])
        }
        let setOfDeletedImages = new Set(newLocalBlog.deletedImages)
        let newDeletedImages = Array.from(setOfDeletedImages)

        
        let newUploadImages = newLocalBlog.uploadedImages.filter((item)=>item!==src)
        setLocalBlog((prev)=>({...prev,
          uploadedImages:newUploadImages,
        deletedImages:newDeletedImages}))
        setIsClicked((prev)=>false)
        setHasChanged((prev)=>true)
        console.log(img)
      },1000)
    }
    const handleCopy = ()=>{
      navigator.clipboard.writeText(src).then((res)=>{
        setIsCopied(true)
        setTimeout(() => {
          setIsClicked((prev)=>false)
          setIsCopied((prev)=>false)
          setHasChanged((prev)=>true)

        }, 1000);
        
      }).catch((rej)=>console.log(rej))
      

    }
    const handleCover = ()=>{
      
      setIsSetToCover((prev)=>true)
      let timeout = setTimeout(()=>{
        let newLocalBlog = {...localBlog, coverImage:src}
      setLocalBlog((prev)=>newLocalBlog)
        setIsClicked((prev)=>false)
        setIsSetToCover((prev)=>false)
        setHasChanged((prev)=>true)

      },1000)
      
      
      
    }
  return (
    <div 
    onMouseEnter={()=>setIsClicked((prev)=>true)}
    onMouseLeave={()=>setIsClicked((prev)=>false)}
    onClick={()=>setIsClicked((prev)=>true)} 
    className={`UI__image ${localBlog.coverImage===src? "cover":""}`}>
        
        <Image 
        className={isClicked? "blur-2xl":""}
        fill
        src={src} alt='/' sizes='200px'/>
        <span 
        className='UI__image__coverTag'
        style={{display:localBlog.coverImage===src &&!isClicked? "":"none"}}
        >Cover <IconUpdate/> </span>
        <div className='UI__image__grid' 
        style={{display:isClicked?"":"none"}}
        >
            
                <UploadImageButton
                text='Back'
                state={isClicked}
                handleClick={handleBack}
                icon={<IconBxArrowBack/>}/>
                <UploadImageButton
                text='Copy'
                state={isCopied}
                handleClick={handleCopy}
                icon={<IconCopy/>}
                icon2={<IconTickCircle/>}/>

            <UploadImageButton
                hoverText="Set to cover image"
                text='Cover'
                state={isSetToCover}
                handleClick={handleCover}
                icon={<IconImages/>}
                icon2={<IconTickCircle/>}/>
              <UploadImageButton
                text='Delete'
                state={deleted}
                handleClick={handleDelete}
                icon={<IconDelete/>}
                icon2={<IconTickCircle/>}/>
        </div>
    </div>
  )
}

export default memo(UploadedImage)

