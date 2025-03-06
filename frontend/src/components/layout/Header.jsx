import { useNavigate } from 'react-router-dom';
import Nav from './Nav'
import { useEffect, useState } from 'react';
import axios from 'axios';
import InicioRegLog from './InicioRegLog';

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
    <header className='absolute w-full m-auto flex flex-col lg:flex-row items-center justify-between pt-8 pb-[100px] z-100 bg-gradient-to-b from-black/90 to-slate-900/0 '>
      <div className='absolute w-full m-auto top-10 flex lg:hidden items-center justify-center font-bold text-white text-5xl font-roboto transition-all'>
        <p className='mb-[5px]'>compoDev</p>
      </div>
      <Nav />
      <InicioRegLog res={res}/>
    </header>
  )
}

export default Header