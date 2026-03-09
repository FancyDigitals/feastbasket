import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { useDebounce } from "../hooks/useDebounce";
import { useProducts } from "../hooks/useProducts";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const debouncedQuery = useDebounce(query, 250);
  const { products, isLoading } = useProducts({ search: debouncedQuery });

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Search results</h1>
        <p className="text-sm leading-6 text-slate-600">Results for "{debouncedQuery || "all products"}" across the Feast Basket catalog.</p>
      </div>
      {isLoading ? <p className="text-sm text-slate-600">Searching products...</p> : <ProductGrid products={products} />}
    </section>
  );
}