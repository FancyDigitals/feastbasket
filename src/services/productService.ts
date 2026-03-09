import { axiosInstance } from "../config/axios";
import { sampleProducts } from "../data/products";
import type { Product, ProductQueryParams } from "../types/product";

const filterProducts = (products: Product[], params: ProductQueryParams): Product[] => {
  return products.filter((product) => {
    const matchesCategory = params.category ? product.category === params.category : true;
    const searchTerm = params.search?.toLowerCase().trim();
    const matchesSearch = searchTerm
      ? `${product.name} ${product.description} ${product.tags.join(" ")}`
          .toLowerCase()
          .includes(searchTerm)
      : true;

    return matchesCategory && matchesSearch;
  });
};

export const productService = {
  async getProducts(params: ProductQueryParams = {}): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>("/products", { params });
      return response.data;
    } catch {
      return filterProducts(sampleProducts, params);
    }
  },
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await axiosInstance.get<Product>(`/products/${slug}`);
      return response.data;
    } catch {
      return sampleProducts.find((product) => product.slug === slug) || null;
    }
  },
};