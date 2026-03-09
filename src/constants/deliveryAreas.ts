export const DELIVERY_AREAS = [
  "Lekki",
  "Victoria Island",
  "Ikeja",
  "Surulere",
  "Yaba",
  "Ikoyi",
  "Ajah",
  "Maryland",
  "Gbagada",
  "Festac",
  "Apapa",
  "Oshodi",
] as const;

export type DeliveryArea = (typeof DELIVERY_AREAS)[number];