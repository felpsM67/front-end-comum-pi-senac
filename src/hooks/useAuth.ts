const useAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
    const isExpired = payload.exp * 1000 < Date.now(); // Verifica se o token expirou
    if (isExpired) {
      localStorage.removeItem('token'); // Remove o token expirado
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error('Erro ao decodificar o token:', error);
    return false; // Token inválido
  }
};

export default useAuth;
