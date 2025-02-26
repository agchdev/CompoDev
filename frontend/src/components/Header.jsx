import React, { useState } from 'react'
import Nav from './Nav'

const Header = () => {
  return (
    <header className='absolute flex w-[100%] items-center justify-between px-4 pt-8 pb-[100px] z-100 bg-gradient-to-b from-zinc-900 to-slate-900/0'>
      <div className='flex items-center justify-center font-bold text-white inline-block text-transparent bg-clip-text text-2xl font-roboto'>
        <p className='mb-[5px]'>compoDev</p>
      </div>
      <Nav />
    </header>
  )
}

export default Header