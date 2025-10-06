import React, { useState } from 'react';
import TabelaJS from '../components/TabelaJS';
import { useNavigate } from 'react-router-dom';

interface Prato {
  id: number;
  nome: string;
  cozinha: string;
  descricaoCurta: string;
  valor: number;
}

export default function Home() {
  const [pratos, setPratos] = useState<Prato[]>([
    {
      id: 1,
      nome: 'Feijoada',
      cozinha: 'Brasileira',
      descricaoCurta: 'Feijoada completa com sabor inigualável.',
      valor: 28.0,
    },
    {
      id: 2,
      nome: 'Moqueca',
      cozinha: 'Brasileira',
      descricaoCurta: 'Moqueca de peixe com leite de coco.',
      valor: 35.0,
    },
    {
      id: 3,
      nome: 'Churrasco',
      cozinha: 'Brasileira',
      descricaoCurta: 'Churrasco com cortes nobres e acompanhamentos.',
      valor: 50.0,
    },
  ]);
  const navigate = useNavigate();

  const handleEdit = (prato: Prato) => {
    navigate(`/admin/editar-prato/${prato.id}`);
  };

  const handleDelete = (prato: Prato) => {
    console.log(`Deletar prato com ID: ${prato.id}`);
    setPratos((prevPratos) => prevPratos.filter((p) => p.id !== prato.id));
  };

  const handleView = (prato: Prato) => {
    navigate(`/admin/detalhes-prato/${prato.id}`);
    console.log(`Visualizar prato com ID: ${prato.id}`);
  };

  const columns: (keyof Prato | 'Ações')[] = [
    'nome',
    'cozinha',
    'descricaoCurta',
    'valor',
    'Ações',
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Pratos</h2>
        <button
          type="button"
          onClick={() => navigate('/admin/novo-prato')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Novo Prato
        </button>
      </div>
      <TabelaJS
        columns={columns}
        data={pratos}
        actions={{
          edit: handleEdit,
          delete: handleDelete,
          view: handleView,
        }}
      />
    </div>
  );
}
