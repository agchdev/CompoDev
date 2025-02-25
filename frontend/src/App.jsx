// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css'
// import Plantilla from './layout/Plantilla';
// import Login from './pages/login';

// function App() {

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Plantilla />}>
//             <Route index element={<Login />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App
import React, { useState, useEffect } from "react";

function App() {
  const [dbStatus, setDbStatus] = useState("Verificando conexión...");

  useEffect(() => {
    fetch("http://localhost/backend/testConnection.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setDbStatus("✅ " + data.message); // Si la conexión es exitosa
        } else {
          setDbStatus("❌ " + data.message); // Si hay error de conexión
        }
      })
      .catch(() => setDbStatus("❌ Error al conectar con el servidor PHP"));
  }, []);

  return (
    <div>
      <h1>Mi Aplicación</h1>
      <h3>Estado de la Base de Datos:</h3>
      <p>{dbStatus}</p>
    </div>
  );
}

export default App;
