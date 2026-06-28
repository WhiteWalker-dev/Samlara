import { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity?: number) => void;
  removeFromCart: (productId: string, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
  updateQty: (productId: string, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('allstag_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('allstag_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [...prevItems, { product, size, quantity }];
    });
    setIsCartOpen(true); // Open the drawer immediately when adding an item
  };

  const removeFromCart = (productId: string, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQty = (productId: string, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
