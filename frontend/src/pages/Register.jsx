import React, { useState } from 'react'
import Home from './Home';
import Bubble from '../components/Bubble';

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [error, setError] = useState(true);
  let ruta = "";

  const handleFotoSeleccionada = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      setUrlFoto(URL.createObjectURL(file)); // Genera una URL temporal para previsualizar la imagen
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar mensaje previo

    try {
      const response = await axios.post("http://localhost/CompoDev/backend/register.php", {
        usuario,
        password,
        email,
        urlFoto,
      });



      console.log("Respuesta del servidor:", response.data);
      if (response.data.status === "success") {
        setMensaje("✅ Login exitoso");
        sessionStorage.setItem("usuario", usuario); // Guardar sesión (temporal)
      } else {
        setError(false)
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError(false)
    }
  };

  return (
    <section>
      <div className='w-full h-screen text-white flex items-center justify-center text-center'>
        {error ?
          <div className='absolute z-10 rounded-4xl border overflow-hidden'>
            <form
              className=' p-10 backdrop-blur-3xl flex flex-col justify-center items-center gap-1.5'
              onSubmit={handleRegister}
            >
              <img
                src={urlFoto || "/uploads/default.jpg"}
                alt="foto"
                className="w-50 h-50 rounded-3xl mb-4 object-cover border"
              />
              <input
                className='hidden  py-2 px-4 rounded-2xl '
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
              <label>Usuario:</label>
              <input
                className='text-white border'
                type="text"
                placeholder='Usuario..'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <label>Email:</label>
              <input
                type="email"
                placeholder='Email..'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Contraseña:</label>
              
            </form>
          </div> : <Home />}

        <Bubble />
      </div>
    </section>
  )
}

export default Register