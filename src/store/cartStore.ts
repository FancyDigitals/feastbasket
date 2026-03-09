import { createContext } from "react";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

export type CartStoreValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const CartStoreContext = createContext<CartStoreValue | undefined>(undefined);