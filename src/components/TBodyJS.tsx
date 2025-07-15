import React from 'react';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface TBodyJSProps {
  users: User[]; // Lista de usuários
  columns: (keyof User | 'Ações')[]; // Colunas que correspondem às propriedades da interface User
  actions?: {
    [key: string]: (user: User) => void; // Ações disponíveis (ex.: editar, excluir)
  };
}

const TBodyJS: React.FC<TBodyJSProps> = ({ users, columns, actions }) => {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.id} className="text-center hover:bg-gray-100">
          {columns.map((column) => (
            <td key={column as string} className="border border-gray-300 p-2">
              {column !== 'Ações' ? user[column as keyof User] : null}
            </td>
          ))}
          {actions && (
            <td className="border border-gray-300 p-2">
              {Object.keys(actions).map((actionKey) => (
                <button
                  key={actionKey}
                  type="button"
                  onClick={() => actions[actionKey](user)}
                  className={`px-2 py-1 rounded mr-2 ${
                    actionKey === 'edit'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : actionKey === 'delete'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  {actionKey.charAt(0).toUpperCase() + actionKey.slice(1)}
                </button>
              ))}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TBodyJS;
