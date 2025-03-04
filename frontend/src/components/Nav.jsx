import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Nav = ({res}) => {
  const [logeado, setLogeado] = useState(false)
  const [urlFoto, setUrlFoto] = useState("")
  useEffect(() => {
    console.log(res)
    // Si res existe y status es success => logeado = true
    if (res && res.status === "success") {
      setLogeado(true);
      let url = res.usuario[0].urlFoto.slice(1)
      setUrlFoto("http://localhost/CompoDev/backend"+url)
      console.log(urlFoto)
    } else {
      setLogeado(false);
    }
  }, [res])
  
  return (
    <>
        <nav className='bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 px-6 py-2 rounded-full flex gap-6 shadow-md'>
          <Link to="/componentes">Componentes</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/comunidad">Comunidad</Link>
          <Link to="/suscripciones">Suscripción</Link>
        </nav>
        {
          !logeado ? <nav className='text-gray-100 flex gap-3 font-semibold items-center justify-center'>
          <Link to="/login" className='px-6 py-2 border-1 border-[#3a3a3a] rounded-full'>Iniciar Sesion</Link>
          <Link to="/register" className='px-6 py-2 border-1 border-[#3a3a3a] rounded-full bg-white text-black'>Register</Link>
        </nav> : <nav>
          <div className='flex text-white font-bold items-end gap-3'>
            <p>Hola, {res.usuario[0].user}!</p>
            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img className='w-full h-full object-cover' src={urlFoto} alt="" />
            </div>
          </div>
          
        </nav>
        }
    </>
  )
}

export default Nav