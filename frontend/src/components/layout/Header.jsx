import { useNavigate } from 'react-router-dom';
import Nav from './Nav'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {

  const navigate = useNavigate();

  const [res, setRes] = useState(null);

  useEffect(() => {
    // Definimos función asíncrona dentro del useEffect
    const verificarSesion = async () => {
      try {
        const response = await axios.post(
          "http://localhost/CompoDev/backend/verificar_sesion.php",
          {},
          {
            withCredentials: true
          }
        );
        console.log("Respuesta del servidor:", response.data);
        setRes(response.data)
        
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
    
    // Invocamos la función
    verificarSesion();
  }, [navigate]);

  return (
    <header className='absolute flex w-[100%] items-center justify-between px-4 pt-8 pb-[100px] z-100 bg-gradient-to-b from-zinc-900 to-slate-900/0'>
      <div className='flex items-center justify-center font-bold text-white inline-block text-transparent bg-clip-text text-2xl font-roboto'>
        <p className='mb-[5px]'>compoDev</p>
      </div>
      <Nav res={res}/>
    </header>
  )
}

export default Header