/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../context/cartContext';
import Prato from '../interface/Prato';

interface Dish {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const cartContext = React.useContext(CartContext);

  if (!cartContext) {
    throw new Error('CartContext não está disponível');
  }

  const { pratos } = cartContext;
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Sincroniza os pratos do contexto com o estado local

    const mapPratos = (prato: Prato) => ({
      id: prato.id!,
      name: prato.nome,
      price: prato.valor!,
      quantity: 1,
    });
    if (pratos?.length) {
      const initialDishes = pratos?.map(mapPratos);
      const TotalInitial = initialDishes.reduce(
        (sum, dish) => sum + dish.price * dish.quantity,
        0,
      );

      setDishes(initialDishes);
      setTotal(TotalInitial);
    }
  }, [pratos]);
  const updateTotal = () => {
    // Esta função pode ser usada para atualizar o total se necessário
    const countTotal = (sum: number, dish: Dish) => {
      const newTotal = sum + dish.price * dish.quantity;

      return newTotal;
    };

    const total = dishes?.reduce(countTotal, 0);

    setTotal(total);
  };

  const navigate = useNavigate();
  const [address, setAddress] = useState<string>('');
  const [paymentInfo, setPaymentInfo] = useState<string>('');

  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const dishUpdated = (prevDishes: Dish[]) => {
      return prevDishes.map((dish) =>
        dish.id === id ? { ...dish, quantity: Math.max(0, quantity) } : dish,
      );
    };
    setDishes(dishUpdated);
    updateTotal();
  };

  const handleConfirmOrder = () => {
    alert('Pedido confirmado!');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Dados do cliente e pagamento */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Dados do Cliente</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Voltar
        </button>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço de Entrega
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows={3}
            placeholder="Digite o endereço de entrega"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Pagamento</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Informações de Pagamento
          </label>
          <input
            type="text"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Digite os dados do pagamento"
          />
        </div>

        <div className="flex items-center justify-between font-bold text-lg">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
        >
          Confirmar Pedido
        </button>
      </div>
      {/* Lista de pratos selecionados */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Carrinho de Compras</h2>
        <div className="h-96 overflow-y-auto">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center justify-between border-b border-gray-200 py-2"
            >
              <div>
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-sm text-gray-500">
                  R$ {dish.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleQuantityChange(dish.id, dish.quantity - 1)
                  }
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={dish.quantity}
                  onChange={(e) =>
                    handleQuantityChange(dish.id, parseInt(e.target.value, 10))
                  }
                  className="w-12 text-center border border-gray-300 rounded"
                  min={0}
                />
                <button
                  onClick={() =>
                    handleQuantityChange(dish.id, dish.quantity + 1)
                  }
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
