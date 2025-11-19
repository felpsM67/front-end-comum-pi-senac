// src/utils/auth.ts
export interface JwtPayload {
  exp: number;
  sub?: string;
  role?: string;
  [key: string]: unknown;
}

export function parseJwt<T = JwtPayload>(token: string): T | null {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;

    const json = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const payload = parseJwt<JwtPayload>(token);
  if (!payload?.exp) return false;

  const isExpired = payload.exp * 1000 < Date.now();
  if (isExpired) {
    localStorage.removeItem('token');
    return false;
  }
  return true;
}
