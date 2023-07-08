"use client"
import React from 'react'
import { useWrite } from '../../../contexts/writeContext'
import ReactMarkdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark,materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {solarizedDark,solarizedLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import IconMoon from '../../../components/theme/moon'
import IconSun from '../../../components/theme/sun'
import IconTickCircle from '../../../icons/tick'
import IconCopy from '../../../icons/copy'
type theProps = {
  source?:any;
}
const Display = ({source}:theProps) => {
  
  const [isDark,setIsDark]=React.useState<boolean>(false)
  const [isCopied,setIsCopied]=React.useState<boolean>(false)
  const handleCopy = (text)=>{
    
    navigator.clipboard.writeText(text).then((res)=>{
      setIsCopied((prev)=>true)
      setTimeout(()=>setIsCopied(false),1000)
    }).catch((rej)=>console.log(rej,"error"))
  }
  return (
    <div className='display'>
     {/* category */}
      {/* title */}
      {/* user details */}
      {/* cover img */}
<ReactMarkdown
          children={source?.content}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <div className="display__codeblock">
                  <div className='code__icons '
                  style={{color:isDark?"var(--code-l)":"var(--code-d)"}}
                  >
                  <button onClick={()=>setIsDark((prev)=>!prev)}>
                    {isDark? <IconMoon/>:<IconSun/>}
                  </button>
                <button onClick={handleCopy}>
                  {isCopied? <IconTickCircle/>:<IconCopy/>}
                </button>
                  </div>

                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={isDark? solarizedDark:solarizedLight}
                  language={match[1]}
                  PreTag="div"
                />
                </div>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }
          }}
        />
       
    </div>
  )
}

export default Display