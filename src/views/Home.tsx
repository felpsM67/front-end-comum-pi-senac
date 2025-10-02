import React, { useState } from 'react';
import TabelaJS from '../components/TabelaJS';

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

  const handleEdit = (prato: Prato) => {
    console.log(`Editar prato com ID: ${prato.id}`);
  };

  const handleDelete = (prato: Prato) => {
    console.log(`Deletar prato com ID: ${prato.id}`);
    setPratos((prevPratos) => prevPratos.filter((p) => p.id !== prato.id));
  };

  const handleView = (prato: Prato) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Pratos</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
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
    </div>
  );
}
