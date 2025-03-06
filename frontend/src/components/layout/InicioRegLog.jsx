import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const InicioRegLog = ({ res }) => {
    const [logeado, setLogeado] = useState(false)
    const [urlFoto, setUrlFoto] = useState("")

    const navigate = useNavigate()
    const location = useLocation()

    const mostrar = ['/'];

    useEffect(() => {
        // Si res existe y status es success => logeado = true
        if (res && res.status === "success") {
            setLogeado(true);
            let url = res.usuario[0].urlFoto.slice(1)
            setUrlFoto("http://localhost/CompoDev/backend" + url)
            console.log(urlFoto)
        } else {
            setLogeado(false);
        }
    }, [res])

    const logOut = async () => {
        try {
            const response = await axios.post(
                "http://localhost/CompoDev/backend/logout.php",
                {},
                { withCredentials: true }
            );
            if (response.data.status === "success") {
                // Aquí limpias el estado local de la información de usuario
                setLogeado(!logeado);
                // o setLogeado(false); setUrlFoto("");
                navigate("/");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    }

    if (mostrar[0] != location.pathname) {
        return (null)
    }
    else {
        return (
            <>
                {
                    !logeado ? <nav className='text-gray-100 flex gap-3 font-semibold items-center justify-center absolute right-5 top-5'>
                        <Link to="/login" className='px-6 py-2 border-1 border-[#3a3a3a] rounded-full'>Iniciar Sesion</Link>
                        <Link to="/register" className='px-6 py-2 border-1 border-[#3a3a3a] rounded-full bg-white text-black'>Registrarse</Link>
                    </nav> : <nav className='absolute hidden md:flex right-5 top-5'>
                        <div className='flex text-white font-bold items-end gap-3 '>
                            <p>Hola, {res.usuario[0].user}!</p>
                            <div className='w-[80px] h-[80px] overflow-hidden rounded-full'>
                                <img className='w-full h-full object-cover' src={urlFoto} alt="" />
                            </div>
                        </div>
                        <button className='text-white cursor-pointer' onClick={logOut}>Cerrar Sesion</button>
                    </nav>
                }
            </>
        )
    }
}

export default InicioRegLog
