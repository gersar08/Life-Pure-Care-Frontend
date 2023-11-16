import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => { //TODO 2: cambiar la ruta de la api para que sea la correcta
      setUsers(response.data);
    });
  }, []);

  return (
    //TODO 3: agregar los botones y validadores para cambiar roles y privilegios
    
    <table>
      <thead>
        <tr>
          <th>Nombre de usuario</th>
          <th>Propietario</th>
          <th>Contraseña</th>
          <th>Correo</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.owner}</td>
            <td>{user.password}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Users;
