import React, { useState } from 'react'
import Home from './Home';
import Bubble from '../components/Bubble';

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const [error, setError] = useState(true);

  function fotoMostrar(imagen) {
    const ruta = "../../../backend/uploads/"
    imagen.split("/")
    console.log(imagen)
  }

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
            <img src={urlFoto} alt="foto" />
            <input
              className='bg-white/50 py-2 px-4 rounded-2xl cursor-pointer'
              type="file"
              onChange={(e) => fotoMostrar(e.target.value)}
            />
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
            <input
              type="password"
              placeholder='Contraseña..'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          </div> : <Home />}

      <Bubble />
      </div>
    </section>
  )
}

export default Register