// src/features/menu/pages/UsuarioDetalhes.tsx
import React from 'react';
import { AuthContext } from 'context/authContext';

const UsuarioDetalhes: React.FC = () => {
  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext não está disponível');
  }

  const { usuario } = authContext;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Meus Dados</h1>

      {usuario ? (
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Role:</strong> {usuario.role}
          </p>
          {/* Adicione outros campos conforme seu modelo de usuário */}
          {usuario.nome && (
            <p>
              <strong>Nome:</strong> {usuario.nome}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum usuário logado.</p>
      )}
    </div>
  );
};

export default UsuarioDetalhes;
