import axios from "axios"
import { useEffect, useState } from "react"
import OverlayProyecto from "./OverlayProyecto"

const ProyectosDelPerfil = () => {

  const [res, setRes] = useState()

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
        console.log("Respuesta del servidor:", response.data);
        setRes(response.data)
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    // Invocamos la función
    extraerDatosPerfil();
  }, [])
  
  console.log(res)

  return (
    <div className="text-white col-span-6 lg:col-span-5 row-span-4 border rounded-3xl">
      {res.map(post => {
        <OverlayProyecto post={post}/>
      })}
    </div>
  )
}

export default ProyectosDelPerfil
