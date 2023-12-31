"use client"
import React, { useRef, useState } from 'react'
import Animator from '../../components/animator/animator'
import Link from 'next/link'
import IconTickCircle from '../../icons/tick'
import IconMail from '../../icons/mail'
import RequestAdmin from './requestAdmin'

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [clicked,setClicked]=useState(false)
  
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [message,setMessage]=useState("")
   const nameRef = useRef("")

 
  return (
    <main className='page'>
        <Animator index={1}
        alignItems='flex-start'>
        <h1 className='py-2 mt-4 font-light'>
                Contact
            </h1>
        </Animator>
        <Animator index={2}
        alignItems='flex-start'>
           <h3 className='font-light my-4'>
            Send a message
           </h3>
        </Animator>
        <Animator index={3}
         alignItems='flex-start'
        >
        <form className='' action="https://formsubmit.co/489a8eabf364548a8643846759ca5731" method='POST'>
            <input type="text" required placeholder='Name' autoComplete='your name' id="frm-name" name="name"  
            onChange={(e)=>setName(e.target.value)}  value={name}/>
            <input type="email" 
            placeholder='Email' name="email" id="frm-email" 
            autoComplete='email'onChange={(e)=>setEmail(e.target.value)} 
            value={email}/>
            <textarea name="message" id="frm-message" rows={6} 
            placeholder='Your message...'
            className='bg-[var(--bg-3)]'
            onChange={(e)=>setMessage(e.target.value)}></textarea>
            <button type="submit" className='w-full border 
            border-[var(--bg-4)] rounded-md 
            '> 
            {clicked?  <IconTickCircle className=""/>:
             <IconMail className=""/> }{clicked?"Sent":"Send now"}</button>
        </form>
        </Animator>
        <Animator index={4}
         alignItems='flex-start'
        >
            {/* <RequestAdmin/> */}
        </Animator>
        <Animator index={5}>
            
        </Animator>
    </main>
  )
}

export default ContactPage