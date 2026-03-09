// types/product.ts

export type ProductCategory =
  | "vegetables"
  | "fruits"
  | "rice-grains"
  | "beverages"
  | "snacks"
  | "frozen-foods"
  | "household-items"
  | "cooking-ingredients";

export type ProductVariation = {
  id: string;
  label: string;
  price: number;
  comparePrice?: number;
  inStock: boolean;
};

export type VariationType = "weight" | "quantity" | "pack" | "size";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  unit: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  // Variation fields
  variations?: ProductVariation[];
  variationType?: VariationType;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedVariation?: ProductVariation;
};

export type ProductQueryParams = {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
};