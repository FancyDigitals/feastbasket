import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { productService } from "../services/productService";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/formatPrice";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadProduct = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      const data = await productService.getProductBySlug(slug);

      if (isActive) {
        setProduct(data);
        setIsLoading(false);
      }
    };

    void loadProduct();

    return () => {
      isActive = false;
    };
  }, [slug]);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-slate-600">Product not found.</p>;
  }

  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-[2rem] bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">{product.category.replace(/-/g, " ")}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{product.name}</h1>
          <p className="text-base leading-7 text-slate-600">{product.description}</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-semibold text-slate-950">{formatPrice(product.price)}</p>
          <p className="text-sm text-slate-500">Sold in {product.unit}</p>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Add to cart
        </button>
      </div>
    </section>
  );
}