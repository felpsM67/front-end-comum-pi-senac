import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../http/api';
import Snackbar from '../components/Snackbar';
import TabelaJS from '../components/TabelaJS';

export interface User {
  id: number;
  nome: string;
  email: string;
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
      <TabelaJS users={users} />
      <Snackbar
        message={snackbar.message}
        duration={snackbar.duration}
        type={snackbar.type}
      />
    </div>
  );
}
