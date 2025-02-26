import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/Register'

const Nav = () => {
  return (
    <>
        <nav className='bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 px-6 py-2 rounded-full flex gap-6 shadow-md'>
          <Link to="/componentes">Componentes</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/comunidad">Comunidad</Link>
          <Link to="/suscripciones">Suscripción</Link>
        </nav>
        <nav className='text-gray-100 flex gap-3 font-semibold items-center justify-center'>
          <Link to="/login" className='px-6 py-2 border-1 border-[#3a3a3a] rounded-full'>Iniciar Sesion</Link>
          <Link to="/register" className='px-6 py-2 border-1 border-[#3a3a3a] rounded-full bg-white text-black'>Register</Link>
        </nav>
    </>
  )
}

export default Nav