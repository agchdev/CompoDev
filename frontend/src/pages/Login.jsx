import React, { useState } from "react";
import axios from "axios"
import UserList from "../components/UserList";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpiar mensaje previo

    try {
      const response = await axios.post("http://localhost/CompoDev/backend/login.php", {
        usuario,
        password,
      });

      console.log("Respuesta del servidor:", response.data);
      if (response.data.status === "success") {
        setMensaje("✅ Login exitoso");
        localStorage.setItem("usuario", usuario); // Guardar sesión (temporal)
      } else {
        setMensaje("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMensaje("❌ Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="flex flex-col items-center justify-center" onSubmit={handleLogin}>
        <input
          className="border"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className="border"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && <p style={{ color: mensaje.includes("✅") ? "green" : "red" }}>{mensaje}</p>}
    </div>
  );
};

export default Login;
