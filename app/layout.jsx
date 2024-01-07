import { Outfit } from 'next/font/google'
import './globals.css'
import Navbar from './Components/navbar/Navbar'
import configurations from '@/_data/config'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: configurations.title,
  description: configurations.description,
  icons: configurations.icons,
  canonical: configurations.canonical
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
