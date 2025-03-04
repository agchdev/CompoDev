import { useState } from "react";
import axios from "axios"
import Bubble from "../components/Bubble";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [ojo, setOjo] = useState(false);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost/CompoDev/backend/login.php',
        { usuario, password },
        { withCredentials: true } // Aquí está el detalle
      )

      console.log("Respuesta del servidor:", response.data);
      if (response.data.status === "success") {
        navigate("/")
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className='w-full h-screen text-white flex flex-col items-center justify-center text-center'>
        <div className='shadow-xl hover:shadow-md transition-shadow shadow-black/50 absolute z-10 rounded-4xl overflow-hidden'>
            <form
              className=' p-10 backdrop-blur-3xl flex flex-col justify-center items-center gap-3'
              onSubmit={handleLogin}
              method="post"
            >
              {/* <label>Usuario:</label> */}
              <input
                className='text-white px-3 py-2 bg-black/20 rounded-3xl w-full  '
                type="text"
                placeholder='Usuario..'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              {/* <label>Contraseña:</label> */}
              <div className='flex'>
                <input
                  className='text-white px-3 py-2 bg-black/20 rounded-l-3xl'
                  type={!ojo ? "password" : "text"}
                  placeholder='Contraseña..'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className='text-white px-3 py-2 bg-white/20 rounded-r-3xl'
                  onClick={(e) => {
                    setOjo(!ojo)
                    e.preventDefault()
                  }}
                >
                  <img src={!ojo ? "./public/uploads/closeEye.svg" : "./public/uploads/openeye.svg"} width="20px" />
                </button>
              </div>
              <input
                className='cursor-pointer px-3 py-2 font-bold text-gray-900 rounded-full bg-white/80'
                type="submit"
                value="Iniciar Sesión"
              />
            <p>No tienes cuenta, <Link className="font-bold border-b-1" to="/register">Registrarse</Link></p>
            </form>
        </div>
        <Bubble />
      </div>
  );
};

export default Login;
