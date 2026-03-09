import { axiosInstance } from "../config/axios";
import type { CartItem } from "../types/cart";

export const cartService = {
  async syncCart(items: CartItem[]): Promise<CartItem[]> {
    try {
      const response = await axiosInstance.post<CartItem[]>("/cart", { items });
      return response.data;
    } catch {
      return items;
    }
  },
};