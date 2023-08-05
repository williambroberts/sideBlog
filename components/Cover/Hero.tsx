import React from 'react'
import IconAppwrite from '../Cards/write'
import IconWebauthn from '../../icons/signIn'
import IconPlusSquare from './plus'
import IconWrite from '../../icons/write'
import IconFormatText from './iconText'

export const Hero = () => {
  return (
    <div
    className='hero'
    >
        <div 
        // data-theme="dark"
        className='hero__left'>
            <span
            className='flex text-xs sm:text-sm
            items-center font-medium
             gap-2'
            ><IconWrite/> Write</span>
       
       
        </div>
        <img 
        className=""
        loading='lazy'
        src='https://images.pexels.com/photos/533424/pexels-photo-533424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

        />
        <div
        // data-theme="dark"
        className='hero__right'
        >
         
         <span
            className='flex text-xs sm:text-sm
            items-center font-medium
             gap-2'
            ><IconFormatText/> Read</span>
        </div>
    </div>
  )
}
