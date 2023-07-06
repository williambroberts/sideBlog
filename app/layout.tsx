import '../styles/globals.css'

import '../styles/misc.css'
import '../styles/auth.css'
import '../styles/header.css'
import '../styles/footer.css'
import { Inter } from 'next/font/google'
import { Lato } from 'next/font/google'
import AuthProvider from '../contexts/AuthContext'
import NotificationProvider from '../contexts/NotificationContext'
const inter = Inter({ subsets: ['latin'] })
const lato = Lato({subsets:["latin"],weight:["100","300","400","700","900"]})
export const metadata = {
  title: {
    default:"sideBlog",
    template:" %s | "
  },
  description: 'A blog app',
  keywords:["blog"],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <AuthProvider>
          <NotificationProvider>

          
          {children}
          <div id="portal"></div>
          </NotificationProvider>
        </AuthProvider>
        
        </body>
    </html>
  )
}
