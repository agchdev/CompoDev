import axios from "axios"
import { useEffect, useState } from "react"
import OverlayProyecto from "./OverlayProyecto"

const ProyectosDelPerfil = () => {

  const [res, setRes] = useState([])

  useEffect(() => {
    const extraerDatosPerfil = async () => {
      try {
        const response = await axios.post(
          "http://localhost/CompoDev/backend/datosUsuario.php",
          {},
          {
            withCredentials: true
          } 
        );
        console.log("Respuesta del servidor:", response.data.success[0]);
        setRes(response.data.success[0])
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    // Invocamos la función
    extraerDatosPerfil();
  }, [])
  
  console.log(res)

  return (
    <div className="text-white col-span-6 xl:col-span-5 row-span-4 rounded-3xl bg-[#202020]">
      <div className="flex gap-5 flex-wrap">
        {res.map(post => (
          <OverlayProyecto key={post} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default ProyectosDelPerfil
