import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import ReactThemeProvider from '../contexts/themeContext'
import AuthProvider from '../contexts/AuthContext'
import BlogProvider from '../contexts/BlogContext'
import WriteProvider from '../contexts/writeContext'
import NotificationProvider from '../contexts/NotificationContext'
import ContextConsumer from '../components/ContextComsumer'


const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ReactThemeProvider>
        <AuthProvider>
        <BlogProvider>
        
          <WriteProvider>
          <NotificationProvider>
            <ContextConsumer>
               {children}
               <div id="portal"></div>
           
            </ContextConsumer>
         
         
          </NotificationProvider>
          </WriteProvider>
        
        </BlogProvider>
        </AuthProvider>
       
        </ReactThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}