import '../styles/globals.css'
import '../styles/write.css'
import '../styles/misc.css'
import '../styles/auth.css'
import '../styles/header.css'
import '../styles/footer.css'
import '../styles/splitPane.css'

import { Lato } from 'next/font/google'
import AuthProvider from '../contexts/AuthContext'
import NotificationProvider from '../contexts/NotificationContext'
import BlogProvider from '../contexts/BlogContext'
import WriteProvider from '../contexts/writeContext'
import ReactThemeProvider from '../contexts/themeContext'
import ContextConsumer from '../components/ContextComsumer'

const lato = Lato({subsets:["latin"],weight:["100","300","400","700","900"]})
export const metadata = {
  title: {
    default:"sideBlog",
    template:" %s | SB"
  },
  description: 'A blog app',

}

export default function RootLayout({ children }) {
  return (
    <html 
    data-id="html"
    lang="en">
      <body className={lato.className}>
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
        
        </body>
        
    </html>
  )
}
