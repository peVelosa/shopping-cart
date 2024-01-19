import { CartContext } from '@/providers/CartProvider';
import { useContext } from 'react';

const useCart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    totalAmount,
    addOne,
    removeOne,
    removeQuantityFromCart,
    buy,
  } = useContext(CartContext);

  return {
    cart,
    addToCart,
    removeFromCart,
    totalAmount,
    addOne,
    removeOne,
    removeQuantityFromCart,
    buy,
  };
};

export default useCart;
