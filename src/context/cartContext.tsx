// src/context/cartContext.tsx
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface PratoCarrinho {
  id: number;
  quantidade: number;
  nome: string;
  valor: number;
}

interface CartContextType {
  pratos: PratoCarrinho[];
  adicionarPrato: (prato: PratoCarrinho) => void;
  removerPrato: (pratoId: number) => void;
  limparCarrinho: () => void;
  totalCompra: number;
  totalItens: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

const CART_STORAGE_KEY = 'app:cart';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 🧠 estado SEM null – sempre array
  const [pratos, setPratos] = useState<PratoCarrinho[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as PratoCarrinho[]) : [];
    } catch {
      return [];
    }
  });

  // ♻️ persiste no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(pratos));
    } catch {
      // se der erro (quota, privado, etc.), a app segue funcionando
      console.warn('Não foi possível salvar o carrinho no localStorage.');
    }
  }, [pratos]);

  const adicionarPrato = useCallback((prato: PratoCarrinho) => {
    setPratos((prev) => {
      const lista = prev ?? [];
      const idx = lista.findIndex((p) => p.id === prato.id);

      // não existe ainda → adiciona
      if (idx === -1) {
        return [...lista, prato];
      }

      // const atual = lista[idx];

      // aqui tratamos `prato.quantidade` como quantidade “final” (absoluta)
      const quantidadeFinal = prato.quantidade;

      // se quantidade <= 0, removemos o item
      if (quantidadeFinal <= 0) {
        return lista.filter((p) => p.id !== prato.id);
      }

      // atualiza quantidade
      return lista.map((p) =>
        p.id === prato.id ? { ...p, quantidade: quantidadeFinal } : p,
      );
    });
  }, []);

  const removerPrato = useCallback((pratoId: number) => {
    setPratos((prev) => prev.filter((p) => p.id !== pratoId));
  }, []);

  const limparCarrinho = useCallback(() => {
    setPratos([]);
  }, []);

  const totalCompra = useMemo(
    () => pratos.reduce((sum, dish) => sum + dish.valor * dish.quantidade, 0),
    [pratos],
  );

  const totalItens = useMemo(
    () => pratos.reduce((sum, dish) => sum + dish.quantidade, 0),
    [pratos],
  );

  return (
    <CartContext.Provider
      value={{
        pratos,
        adicionarPrato,
        removerPrato,
        limparCarrinho,
        totalCompra,
        totalItens,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
