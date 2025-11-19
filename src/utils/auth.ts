// src/utils/auth.ts
import { Role } from '../domain/usuario';

export interface JwtPayload {
  sub?: string;
  email?: string;
  role?: Role | string;
  exp?: number;
  [key: string]: unknown;
}

export function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return null;

    const json = atob(payloadBase64);
    const payload = JSON.parse(json) as JwtPayload;

    // valida expiração (opcional, se quiser usar aqui)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Erro ao decodificar JWT', error);
    return null;
  }
}
