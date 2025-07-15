import React from 'react';
import { User } from '../views/UserManagement';
import { useNavigate } from 'react-router-dom';
import THeadJS from './THeadJS';
import TBodyJS from './TBodyJS';

interface TabelaJSProps {
  users: User[];
}

const TabelaJS: React.FC<TabelaJSProps> = ({ users }) => {
  const navigate = useNavigate();
  const columns = ['id', 'nome', 'email', 'Ações'] as (keyof User | 'Ações')[];

  const handleActionClick = {
    edit: (user: User) => {
      navigate(`/users/edit/${user.id}`);
    },
    delete: (user: User) => {
      console.log(`Usuário com ID ${user.id} excluído.`);
      // Adicione a lógica de exclusão aqui
    },
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-300">
        <THeadJS columns={columns} />
        <TBodyJS users={users} columns={columns} actions={handleActionClick} />
      </table>
    </>
  );
};

export default TabelaJS;
