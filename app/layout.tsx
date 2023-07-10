import '../styles/globals.css'
import '../styles/write.css'
import '../styles/misc.css'
import '../styles/auth.css'
import '../styles/header.css'
import '../styles/footer.css'
import '../styles/splitPane.css'
import { Inter } from 'next/font/google'
import { Lato } from 'next/font/google'
import AuthProvider from '../contexts/AuthContext'
import NotificationProvider from '../contexts/NotificationContext'
import ProviderForTheme from '../components/theme/themeProvider'
import BlogProvider from '../contexts/BlogContext'
import WriteProvider from '../contexts/writeContext'
const inter = Inter({ subsets: ['latin'] })
const lato = Lato({subsets:["latin"],weight:["100","300","400","700","900"]})
export const metadata = {
  title: {
    default:"sideBlog",
    template:" %s | SB"
  },
  description: 'A blog app',
  keywords:["blog"],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <ProviderForTheme>
        <BlogProvider>
        <AuthProvider>
          <WriteProvider>
          <NotificationProvider>
          {children}
          <div id="portal"></div>
          </NotificationProvider>
          </WriteProvider>
        </AuthProvider>
        </BlogProvider>
        </ProviderForTheme>
        </body>
    </html>
  )
}
