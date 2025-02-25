import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/CompoDev/backend/showUsers.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data); // Ver en consola
        if (data.status === "success") {
          setUsers(data.users);
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
        setError("Error al conectar con el servidor");
      });
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.usuario}</strong> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
