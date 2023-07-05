import '../styles/globals.css'

import '../styles/misc.css'
import '../styles/auth.css'
import '../styles/header.css'
import '../styles/footer.css'
import { Inter } from 'next/font/google'
import { Lato } from 'next/font/google'
import AuthProvider from '../contexts/AuthContext'
const inter = Inter({ subsets: ['latin'] })
const lato = Lato({subsets:["latin"],weight:["100","300","400","700","900"]})
export const metadata = {
  title: 'sideBlog',
  description: 'A blog app',
  keywords:[],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        
        </body>
    </html>
  )
}
