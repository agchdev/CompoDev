import { useState } from 'react'
import Bubble from '../components/Bubble';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  //USE STATE
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [urlFotoPhp, setUrlFotoPhp] = useState(null);
  const [ojo, setOjo] = useState(false);

  // Hook para navegación
  const navigate = useNavigate();

  const handleFotoSeleccionada = (event) => {
    const file = event.target.files[0] // Obtiene el archivo seleccionado
    if (file) {
      setUrlFoto(URL.createObjectURL(file)) // Genera una URL temporal para previsualizar la imagen
      console.log(urlFoto)
    }
    setUrlFotoPhp(file)
    console.log(file)
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("urlFotoPhp", urlFotoPhp); // La imagen se envía correctamente

    try {
      const response = await axios.post(
        "http://localhost/CompoDev/backend/register.php",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      if (response.data.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <section>
      <div className='w-full h-screen text-white flex flex-col items-center justify-center text-center'>
        <div className='shadow-xl hover:shadow-md transition-shadow shadow-black/50 absolute z-10 rounded-4xl overflow-hidden'>
            <form
              className=' p-10 backdrop-blur-3xl flex flex-col justify-center items-center gap-3'
              onSubmit={handleRegister}
              method="post"
            >
              <img
                src={urlFoto || "/uploads/deafult.jpg"}
                alt="foto"
                className="w-50 h-50 rounded-3xl mb-4 object-cover"
              />
              <input
                className='hidden py-2 px-4 rounded-2xl '
                type="file"
                accept="image/*"
                id='fileInput'
                onChange={handleFotoSeleccionada}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-gradient-to-r bg-white/50 px-4 py-2 rounded-2xl"
              >
                Seleccionar Foto
              </label>
              {/* <label>Usuario:</label> */}
              <input
                className='text-white px-3 py-2 bg-black/20 rounded-3xl w-full  '
                type="text"
                placeholder='Usuario..'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              {/* <label>Email:</label> */}
              <input
                className='text-white px-3 py-2 bg-black/20 rounded-3xl w-full'
                type="email"
                placeholder='Email..'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value="Registrarse"
              />
              <p>Tienes cuenta, <Link className="font-bold border-b-1" to="/login">Iniciar Sesión</Link></p>
            </form>
        </div>
        <Bubble />
      </div>
    </section>
  )
}

export default Register