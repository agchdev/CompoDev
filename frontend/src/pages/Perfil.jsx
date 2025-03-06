import { useEffect, useState } from "react";
import AjustesProfile from "../components/perfil/AjustesProfile"
import BannerProfile from "../components/perfil/BannerProfile"
import ProyectosDelPerfil from "../components/perfil/ProyectosDelPerfil"
import axios from "axios";

const Perfil = () => {

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
    }, []);

    return (
        <>
            <div className="w-full h-screen grid grid-cols-6 grid-rows-6 gap-4">
                <AjustesProfile res={res} />
                <BannerProfile res={res} />
                <ProyectosDelPerfil res={res} />
            </div>
        </>
    )
}

export default Perfil
