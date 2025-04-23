import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './http/api';
import Snackbar from './components/Snackbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({
    message: '',
    type: '',
    duration: 0,
  });
  const navigate = useNavigate();

  const login = async () => {
    const duration = 10000;
    try {
      const response = await api.post('/login', {
        email: username,
        senha: password,
      });
      const { data, message } = response;

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      setSnackbar({
        message: message || 'Sucesso ao logar.',
        type: 'success',
        duration,
      });
      setTimeout(() => {
        navigate('/home');
      }, duration);
    } catch (error) {
      const { message } = JSON.parse(error.message);
      setSnackbar({
        message: message || 'Erro de conexão.',
        type: 'error',
        duration,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={login}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300"
        >
          Logar
        </button>
      </div>
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: '', type: '' })}
      />
    </div>
  );
}
