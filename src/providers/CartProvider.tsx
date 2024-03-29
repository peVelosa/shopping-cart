import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type cartProviderProps = {
  children: React.ReactNode;
};

export type TCart = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  stock: number;
};

type TCartContext = {
  cart: TCart[];
  addToCart: (product: TCart) => void;
  removeFromCart: ({ pid }: { pid: string }) => void;
  addOne: ({ pid }: { pid: string }) => void;
  removeOne: ({ pid }: { pid: string }) => void;
  removeQuantityFromCart: ({
    pid,
    quantity,
  }: {
    pid: string;
    quantity: number;
  }) => void;
  buy: (action: () => void) => void;
  totalAmount: number;
};

export const CartContext = createContext({} as TCartContext);

const CartProvider = ({ children }: cartProviderProps) => {
  const [cart, setCart] = useState<TCart[]>([]);
  const router = useRouter();

  const addToCart = (product: TCart): void => {
    setCart((old) => {
      const productAlreadyInCart = old.find((p) => p.id === product.id);

      if (!productAlreadyInCart) return [...old, { ...product }];

      return old.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            quantity:
              p.quantity + product.quantity > p.stock
                ? p.stock
                : p.quantity + product.quantity,
          };
        }
        return p;
      });
    });
  };

  const addOne = ({ pid }: { pid: string }) => {
    setCart((old) =>
      old.map((p) => {
        if (p.id === pid) {
          return {
            ...p,
            quantity: p.quantity + 1 > p.stock ? p.stock : p.quantity + 1,
          };
        }
        return p;
      }),
    );
  };

  const removeOne = ({ pid }: { pid: string }) => {
    setCart((old) => {
      const product = old.find((p) => p.id === pid);

      if (!product) return { ...old };

      const restQuantity = product.quantity - 1;

      if (restQuantity <= 0) return old.filter((p) => p.id !== pid);

      return old.map((p) => {
        if (p.id === pid) {
          return { ...p, quantity: restQuantity };
        }
        return p;
      });
    });
  };

  const removeFromCart = ({ pid }: { pid: string }): void => {
    setCart((old) => old.filter((p) => p.id !== pid));
  };

  const removeQuantityFromCart = ({
    pid,
    quantity,
  }: {
    pid: string;
    quantity: number;
  }): void => {
    setCart((old) => {
      const product = old.find((p) => p.id === pid);
      if (!product) return [...old];

      const restQuantity = product.quantity - quantity;

      if (restQuantity <= 0) return old.filter((p) => p.id !== pid);

      return old.map((p) => {
        if (p.id === pid) {
          return { ...p, quantity: restQuantity };
        }
        return p;
      });
    });
  };

  const buy = (action: () => void): void => {
    setCart([]);
    action();
    router.push('/');
  };

  const totalAmount: number = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        totalAmount,
        addOne,
        removeOne,
        removeQuantityFromCart,
        buy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
