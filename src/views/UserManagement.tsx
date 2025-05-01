import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../http/api';
import Snackbar from '../components/Snackbar';

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

interface SnackbarPropsState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

export default function UserManagement() {
  const [users, setUsers] = useState<Array<User> | []>([]);
  const [snackbar, setSnackbar] = useState<SnackbarPropsState>({
    message: '',
    type: 'success',
    duration: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await fetch(`http://localhost:3000/api/users`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   },
        // });
        // const data = await response.json();
        // const response = await api.get('/users'); OUTRO MODO DE FAZER A REQUISIÇÃO
        const response = await api['get']('/users');
        const { data } = response;
        console.log('usuarios', data);

        setUsers(data);

        setSnackbar({
          message: 'Lista de usuários carregada com sucesso',
          type: 'success',
          duration: 10000,
        });
      } catch (error: unknown) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setSnackbar({
          message: axiosError.response?.data?.message || 'Erro na requisição.',
          type: 'error',
          duration: 10000,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <button
          type="button"
          onClick={() => navigate('/users/new')}
          className="bg-green-500 text-white p-2 rounded flex items-center hover:bg-green-600"
        >
          <span className="mr-2">+</span> Novo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nome</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.nome}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  type="button"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => console.log('Deletar usuário', user.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Snackbar
        message={snackbar.message}
        duration={snackbar.duration}
        type={snackbar.type}
      />
    </div>
  );
}
