import React from 'react'
import Usernav from '@/app/Components/userNav/Usernav'


export default function DashboardLayout({children}) {
  return (
    <main className='dashboardLayout' >
        <Usernav/>
        {children}
    </main>
  )
}
