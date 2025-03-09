import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const busca = useRef(null)
  const divCosas = useRef(null)
  const muchosLinks = useRef(null)
  const inpBusca = useRef(null)

  return (
    <>
      <div ref={divCosas} className='w-full flex justify-center gap-2 absolute top-20 lg:top-10 transition-all'>
        <nav className='menu-activador width-[100px] bg-[#252525] border-1 h-full border-[#3a3a3a] text-gray-100 px-4 py-4 rounded-3xl lg:hidden flex gap-6 shadow-md mt-6'>
          <input onClick={() => setIsOpen(!isOpen)} type="checkbox" id="lanzador" />
          <label htmlFor="lanzador">
            <span className="menu-activador-linea"></span>
            <span className="menu-activador-linea"></span>
            <span className="menu-activador-linea"></span>
          </label>
        </nav>
        <nav ref={muchosLinks} className='bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 px-6 py-2 rounded-full hidden lg:flex gap-6 shadow-md items-center'>
          <Link to="/" className='font-bold text-white text-2xl font-roboto'>compoDev</Link>
          <Link to="/componentes">Componentes</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/comunidad">Comunidad</Link>
          <Link to="/crearProyecto">Crear</Link>
          <Link to="/suscripciones">Suscripción</Link>
        </nav>
        <Link 
          className='mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 rounded-3xl py-2 px-3 flex gap-6 shadow-md transition-all items-center justify-center'
          to="/search"
          ref={busca}
        >
          <img
            className='transition-all'
            src="../../../public/uploads/lupa.svg" alt="lupa" 
          />
          
          <input 
            className='hidden rounded-full bg-[#1d1d1d] py-2 px-5 cursor-pointer hover:bg-black/70'
            ref={inpBusca} 
            type="submit"
          />
        </Link>
      </div>
    </>
  )
}

export default Nav