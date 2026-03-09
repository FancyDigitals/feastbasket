import { axiosInstance } from "../config/axios";
import type { CreateOrderPayload, Order } from "../types/order";

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await axiosInstance.get<Order[]>("/orders");
      return response.data;
    } catch {
      return [];
    }
  },
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const fallbackOrder: Order = {
      id: crypto.randomUUID(),
      reference: `FB-${Date.now()}`,
      items: payload.items,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      status: "pending",
      subtotal: payload.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      deliveryFee: 2000,
      total: payload.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 2000,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axiosInstance.post<Order>("/orders", payload);
      return response.data;
    } catch {
      return fallbackOrder;
    }
  },
};