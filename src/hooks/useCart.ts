// src/hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart deve ser usado dentro de um CartProvider. ' +
        'Verifique se o componente está envolvido pelo <CartProvider> nas rotas.',
    );
  }

  return context;
}

export default useCart;
