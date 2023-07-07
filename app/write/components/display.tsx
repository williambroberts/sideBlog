"use client"
import React from 'react'
import { useWrite } from '../../../contexts/writeContext'
import ReactMarkdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark,docco} from 'react-syntax-highlighter/dist/esm/styles/prism'
const Display = () => {
  const {localBlog}=useWrite()
  return (
    <div className='display'>
      display
<ReactMarkdown
          children={localBlog.content}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={docco}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            }
          }}
        />
        {/* <Markdown
            options={{
              overrides: {
                Code: {
                  component: CodeComponent,
                  
                }
              }
            }}
          >
            {localBlog.content}
          </Markdown> */}
    </div>
  )
}

export default Display