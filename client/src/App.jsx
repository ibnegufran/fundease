import React from 'react'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col font-sans overflow-x-hidden'>
      {/* navbar */}
      <Navbar />

      {/* main content */}
      <div className="w-screen ">
      <main className='flex-1 '>
        <Outlet />
      </main>
</div>
      {/* footer */}
      <Footer />
    </div>
  )
}

export default App