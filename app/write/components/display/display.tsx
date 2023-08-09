"use client"
import React, { useEffect } from 'react'
import { useWrite } from '../../../../contexts/writeContext'
import ReactMarkdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
import { dark, docco, gruvboxDark, gruvboxLight, lightfair, monokaiSublime, vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'

import IconMoon from '../../../../components/theme/moon'
import IconSun from '../../../../components/theme/sun'
import IconTickCircle from '../../../../icons/tick'
import IconCopy from '../../../../icons/copy'
import Image from 'next/image'
import DisplayCoverImage from './displayCoverImage'
import UserDetails from './userDetails'
import DisplayTags from './displayTags'
import DisplayCategory from './displayCategory'
import DisplayTitle from './displayTitle'
import Animator from '../../../../components/animator/animator'
import { usePathname, useSearchParams } from 'next/navigation'
import { updateBlogViews } from '../../../../firebase/CLientFunctions'
import rehypeRaw from 'rehype-raw'
import TagManager from '../addTags/manageTags'
import LikeBlog from './LikeBlog'
import { useNotifications } from '../../../../contexts/NotificationContext'
type theProps = {
  source?:any;
}
const Display = ({source}:theProps) => {
 // console.log(source)
  const {notification,notificationHandler}=useNotifications()
  const [darkMode,setDarkMode]=React.useState<boolean>(true)
  const [isCopied,setIsCopied]=React.useState<boolean>(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(()=>{
    //🥩add img class styles to default 
  },[])


  const copy = (e)=>{
    notificationHandler("alert","Copied code to clipboard ✓")
    setIsCopied((prev)=>!prev)
    e.preventDefault()
    let tag = e.target
    let parent = tag.parentNode
    let section = parent.nextSibling
    let code = section.firstChild
    //let children = code.children
    navigator.clipboard.writeText(code.textContent)
    setTimeout(()=>{
      setIsCopied((prev)=>!prev)
    },2000)
  }

  return (
    <div className={`display `}>
      {pathname==="/write"?
      <TagManager tags={source?.tags}/>  :""}


    <Animator index={1}
    alignItems='flex-start'
    >
    <DisplayCategory category={source?.category}/>
    </Animator>
     <Animator index={2}
     alignItems='flex-start'
     >
     <DisplayTitle title={source?.title}/>
     </Animator>
     
     <Animator index={3}
     alignItems='flex-start'
     >
     <UserDetails userPhoto={source?.userPhoto}
      author={source?.author} userUid={source?.authorId}
      dateCreation={source?.dateCreation}
      />
     </Animator>
     
      <DisplayTags 
      views={source?.views}
      readTime={source?.readTime}
      tags={source?.tags}/>
      {/* <DisplayCoverImage src={source?.coverImage}/> */}
      <ReactMarkdown 
      className='display__markdown'
        rehypePlugins={[rehypeRaw]}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className={`${darkMode?"codeBlock__dark":"codeBlock__light"}`}
              data-theme="light"
              >
                <div className='code__icons'
                style={{color:darkMode?"":""}}
               
                >
                <button 
                
                className='ml-auto text-base'
                onClick={()=>setDarkMode((prev)=>!prev)}>
                  {darkMode? <IconMoon/>:<IconSun/>}
                </button>
              <button 
              className='flex flex-row items-center
              '
              onClick={copy}>
                {!isCopied? "🗐":"⎘"}
                
              </button>
                </div>

              <SyntaxHighlighter
                {...props}
                // showLineNumbers={true}
                showInlineLineNumbers={true}
                style={darkMode? gruvboxDark:gruvboxLight}
                language={match[1]}
                PreTag="section"
                
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
              </div>
            ) : (
              <code {...props} className={"inline__code"}>
                {children}
              </code>
            )
          }
        }}
      >{source?.content}</ReactMarkdown>
      <LikeBlog likes={source?.likes}/>
    </div>
  )
}

export default Display