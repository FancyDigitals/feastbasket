import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { Product, ProductQueryParams } from "../types/product";

type UseProductsResult = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};

export const useProducts = (params: ProductQueryParams = {}): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getProducts(params);

        if (isActive) {
          setProducts(data);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load products.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isActive = false;
    };
  }, [params.category, params.limit, params.page, params.search]);

  return { products, isLoading, error };
};