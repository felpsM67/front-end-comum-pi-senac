import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabelaJS from '../components/TabelaJS';
import LinkButton from '../components/ui/LinkButton';
import SectionCard from '../components/ui/SectionCard';
import api from '../http/api';

export interface Order {
  id: number;
  cliente: string;
  status: string;
  total: number;
}

const OrderManagement: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErro(null);

        const response = await api.get<Order[]>('/pedidos');

        setOrders(response.data ?? []);
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
        setErro('Não foi possível carregar a lista de pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (order: Order) => {
    navigate(`/admin/pedidos/editar/${order.id}`);
  };

  const handleDelete = async (order: Order) => {
    try {
      await api.delete(`/pedidos/${order.id}`);
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);
      setErro('Erro ao deletar o pedido. Tente novamente.');
    }
  };

  const handleView = (order: Order) => {
    navigate(`/admin/pedidos/detalhes/${order.id}`);
  };

  const columns: (keyof Order | 'Ações')[] = [
    'cliente',
    'status',
    'total',
    'Ações',
  ];

  return (
    <div className="space-y-4">
      <SectionCard
        title="Gestão de pedidos"
        subtitle="Visualize, edite e acompanhe os pedidos realizados."
        actions={
          <LinkButton to="/admin/pedido/new" variant="primary">
            Novo pedido
          </LinkButton>
        }
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : erro ? (
          <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {erro}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm font-medium text-slate-700">
              Nenhum pedido encontrado.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Assim que novos pedidos forem realizados, eles aparecerão aqui.
            </p>
          </div>
        ) : (
          <TabelaJS
            columns={columns}
            data={orders}
            actions={{
              view: handleView,
              edit: handleEdit,
              delete: handleDelete,
            }}
          />
        )}
      </SectionCard>
    </div>
  );
};

export default OrderManagement;
