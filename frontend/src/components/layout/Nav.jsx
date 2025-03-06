import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='w-full flex justify-center gap-2 absolute top-20 lg:top-10 transition-all'>
        <nav className='menu-activador width-[100px] bg-[#252525] border-1 h-full border-[#3a3a3a] text-gray-100 px-4 py-4 rounded-3xl lg:hidden flex gap-6 shadow-md mt-6'>
          <input onClick={() => setIsOpen(!isOpen)} type="checkbox" id="lanzador" />
          <label htmlFor="lanzador">
            <span className="menu-activador-linea"></span>
            <span className="menu-activador-linea"></span>
            <span className="menu-activador-linea"></span>
          </label>
        </nav>
        <nav className='bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 px-6 py-2 rounded-full hidden lg:flex gap-6 shadow-md items-center'>
          <Link to="/" className='font-bold text-white text-2xl font-roboto'>compoDev</Link>
          <Link to="/componentes">Componentes</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/comunidad">Comunidad</Link>
          <Link to="/crearProyecto">Crear</Link>
          <Link to="/suscripciones">Suscripción</Link>
        </nav>
        <Link className='mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 px-4 py-2 rounded-3xl flex gap-6 shadow-md' to="/search">
          <img src="../../../public/uploads/lupa.svg" alt="" />
        </Link>
      </div>
    </>
  )
}

export default Nav