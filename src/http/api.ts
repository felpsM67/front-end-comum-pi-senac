// src/http/api.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_TOKEN_KEY = 'token';
const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
const AUTH_LOGIN_PATH = '/login'; // fallback genérico (cliente ou admin decide depois)

// Interceptador de requisição
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      // Axios normaliza internamente, mas podemos setar com case padrão
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Helper para fazer refresh com axios “cru” (evita loop de interceptores)
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  try {
    const response = await axios.post<{ token: string }>(
      `${API_BASE_URL}/refresh-token`,
      {
        refreshToken, // 👈 mais comum o back esperar esse nome
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const newToken = response.data.token;
    if (newToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, newToken);
      return newToken;
    }

    return null;
  } catch (error) {
    console.error('Erro ao tentar renovar token:', error);
    return null;
  }
}

// Interceptador de resposta
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    // Tratamento de 401 com tentativa de refresh
    if (
      status === 401 &&
      !originalRequest._retry // evita loop
    ) {
      originalRequest._retry = true;

      // tenta refresh
      const newToken = await refreshAccessToken();

      if (newToken) {
        // atualiza header e tenta novamente a requisição original
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      }

      // refresh falhou → limpa storage e redireciona para login
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);

      window.location.href = AUTH_LOGIN_PATH;
      return Promise.reject(error);
    }

    // 403: acesso negado
    if (status === 403) {
      alert('Você não possui acesso a esta tela.');
      window.history.back();

      return Promise.reject(
        new Error(
          JSON.stringify({
            status,
            message: error.response?.data?.message || 'Acesso negado.',
          }),
        ),
      );
    }

    // Outros erros >= 400
    if (status && status >= 400) {
      return Promise.reject(
        new Error(
          JSON.stringify({
            status,
            message: error.response?.data?.message || 'Erro desconhecido.',
          }),
        ),
      );
    }

    // Erros sem resposta (network, CORS, etc.)
    return Promise.reject(
      new Error(
        JSON.stringify({
          status: 0,
          message: 'Erro de conexão.',
        }),
      ),
    );
  },
);

export default api;
