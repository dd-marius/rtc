import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

const initialCart = [
]

const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function CartContextProvider({ children }) {
  const [cart, setCart] = useLocalStorageState('cart', initialCart);

  const fUpdateCart = useCallback(
    (cart) => {
      setCart(cart);
    },
    [setCart]
  );

  const fResetCart = useCallback(() => {
    setCart(initialCart);
  }, [setCart]);

  const value = useMemo(() => {
    return { cart, fUpdateCart, fResetCart};
  }, [cart, fUpdateCart, fResetCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  const ctx = useContext(CartContext);
  if (ctx === null) {
    throw new Error(
      'Please only use useCartContext inside a descendant of CartContextProvider.'
    );
  }
  return ctx;
}
