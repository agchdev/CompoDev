
import Header from '../components/layout/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const Plantilla = ({logeado}) => {

  // El hook useLocation te dice en qué ruta estás
  const location = useLocation();

  // Rutas en las que NO quieres mostrar el Header ni el Footer
  const noMostrar = ['/login', '/register', '/ide', '/profile'];

  return (
    <>
    {noMostrar.includes(location.pathname) ? null : <Header />}
      <main className='bg-black w-full'>
        <Outlet logeado={logeado}/>
      </main>
    {noMostrar.includes(location.pathname) ? null : <Footer />}
    </>
  )
}

export default Plantilla