import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Plantilla = () => {

  return (
    <>
    
    <Header />
      <main className='bg-black w-full h-screen'>
        <Outlet />
      </main>
    <Footer />
    
    </>
  )
}

export default Plantilla