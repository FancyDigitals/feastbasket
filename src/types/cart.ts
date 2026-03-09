import type { Product } from "./product";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartSummary = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
};