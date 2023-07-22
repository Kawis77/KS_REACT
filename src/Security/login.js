import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Wysłanie żądania logowania na backend
    const data = {
      username: username,
      password: password,
    };

    axios.post('http://localhost:8080/api/security/login', data)
      .then((response) => {
        // Pomyślna odpowiedź z backendu (np. dostępny token JWT)
        console.log(response.data);
        // Zapisz token JWT w pamięci przeglądarki lub ciasteczku
      })
      .catch((error) => {
        // Błąd logowania (np. złe dane logowania)
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nazwa użytkownika:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Hasło:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Login;
