import type { CartItem } from "./cart";
import type { PaymentMethod } from "../constants/paymentMethods";
import type { UserAddress } from "./user";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

export type Order = {
  id: string;
  reference: string;
  items: CartItem[];
  shippingAddress: UserAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
};

export type CreateOrderPayload = {
  items: CartItem[];
  shippingAddress: UserAddress;
  paymentMethod: PaymentMethod;
};