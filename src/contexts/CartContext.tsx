// contexts/CartContext.tsx

import { createContext, useCallback, useState, type ReactNode } from "react";
import type { Product, CartItem, ProductVariation } from "../types/product";

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, variation?: ProductVariation) => void;
  removeFromCart: (productId: string, variationId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variationId?: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string, variationId?: string) => number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const getCartItemKey = (productId: string, variationId?: string) => {
    return variationId ? `${productId}-${variationId}` : productId;
  };

  const addToCart = useCallback((product: Product, variation?: ProductVariation) => {
    setItems((prev) => {
      const key = getCartItemKey(product.id, variation?.id);
      const existingIndex = prev.findIndex(
        (item) => getCartItemKey(item.product.id, item.selectedVariation?.id) === key
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      return [...prev, { product, quantity: 1, selectedVariation: variation }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, variationId?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          getCartItemKey(item.product.id, item.selectedVariation?.id) !==
          getCartItemKey(productId, variationId)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variationId?: string) => {
      if (quantity <= 0) {
        removeFromCart(productId, variationId);
        return;
      }

      setItems((prev) =>
        prev.map((item) => {
          const key = getCartItemKey(item.product.id, item.selectedVariation?.id);
          if (key === getCartItemKey(productId, variationId)) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (productId: string, variationId?: string) => {
      const key = getCartItemKey(productId, variationId);
      const item = items.find(
        (item) => getCartItemKey(item.product.id, item.selectedVariation?.id) === key
      );
      return item?.quantity || 0;
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}