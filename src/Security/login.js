import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    const LoginRequest = {
      username: username,
      password: password,
    };

    axios.post('http://localhost:8080/api/security/customlogin', LoginRequest, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const token = response.data;
        Cookies.set('loginToken', token, { expires: 0.5 });
      })
      .catch((error) => {
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
