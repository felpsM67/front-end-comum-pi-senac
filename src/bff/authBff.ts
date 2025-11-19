// src/bff/authBff.ts
import api from '../http/api';
import Usuario from '../domain/usuario';

export interface LoginResponse {
  token: string;
  refreshToken: string;
  usuario: Usuario;
}

export async function loginAdmin(
  email: string,
  senha: string,
): Promise<LoginResponse> {
  const resp = await api.post('/login', { email, senha });
  const data = resp.data as {
    token: string;
    refreshToken: string;
    user: Usuario;
  };

  // grava tokens aqui mesmo (BFF)
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);

  return {
    token: data.token,
    refreshToken: data.refreshToken,
    usuario: data.user,
  };
}

// para o futuro: loginCliente, refreshToken, logout, etc.
