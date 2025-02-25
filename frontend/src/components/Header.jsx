import React, { useState } from 'react'
import Nav from './Nav'

const Header = () => {
  const [login, setLogin] = useState(false)
  return (
    <header className='absolute flex w-[100%] items-center justify-between px-4 mt-8'>
      <div className='flex items-center justify-center font-bold bg-gradient-to-r from-slate-100 to-slate-500 inline-block text-transparent bg-clip-text text-2xl'>
        <p className='mb-[5px]'>compoDev</p>
      </div>
      <Nav />
    </header>
  )
}

export default Header