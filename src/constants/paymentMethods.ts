export const PAYMENT_METHODS = [
  "Card Payment",
  "Bank Transfer",
  "Pay on Delivery",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];