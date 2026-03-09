// pages/CategoryPage.tsx

import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FiGrid, 
  FiList, 
  FiChevronDown, 
  FiChevronRight,
  FiSliders,
  FiX,
  FiCheck,
  FiArrowUp
} from "react-icons/fi";
import { useProducts } from "../hooks/useProducts";
import { CATEGORIES } from "../constants/categories";
import ProductCard from "../components/product/ProductCard";
import { APP_ROUTES } from "../constants/routes";


const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const PRICE_RANGES = [
  { value: "0-1000", label: "Under ₦1,000" },
  { value: "1000-5000", label: "₦1,000 - ₦5,000" },
  { value: "5000-10000", label: "₦5,000 - ₦10,000" },
  { value: "10000+", label: "Above ₦10,000" },
];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, isLoading } = useProducts({ category: slug });
  
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const category = CATEGORIES.find((c) => c.slug === slug);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    return sorted;
  }, [products, sortBy]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!category) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Category Not Found</h1>
          <p className="mt-2 text-neutral-600">The category you're looking for doesn't exist.</p>
          <Link
            to={APP_ROUTES.home}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-bold text-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Header */}
      <div className="relative bg-neutral-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm">
            <Link to={APP_ROUTES.home} className="text-neutral-500 hover:text-white transition-colors">
              Home
            </Link>
            <FiChevronRight className="h-4 w-4 text-neutral-600" />
            <Link to={APP_ROUTES.products} className="text-neutral-500 hover:text-white transition-colors">
              Products
            </Link>
            <FiChevronRight className="h-4 w-4 text-neutral-600" />
            <span className="font-medium text-white">{category.name}</span>
          </nav>

          {/* Category Info */}
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              {category.emoji || "📦"}
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {category.name}
              </h1>
              <p className="mt-1 text-neutral-400">
                {sortedProducts.length} products available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-300 lg:hidden"
            >
              <FiSliders className="h-4 w-4" />
              <span>Filters</span>
              {selectedPriceRange && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#549558] text-[10px] text-white">
                  1
                </span>
              )}
            </button>

            {/* Active Filters */}
            {selectedPriceRange && (
              <div className="hidden items-center gap-2 lg:flex">
                <span className="text-sm text-neutral-500">Filters:</span>
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#549558]/10 px-3 py-1.5 text-xs font-semibold text-[#549558]"
                >
                  {PRICE_RANGES.find((p) => p.value === selectedPriceRange)?.label}
                  <FiX className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* View Mode */}
            <div className="hidden items-center rounded-xl border border-neutral-200 bg-white p-1 sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-300"
              >
                <span className="hidden sm:inline">Sort by:</span>
                <span className="text-neutral-900">
                  {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                </span>
                <FiChevronDown className={`h-4 w-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
              </button>

              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-neutral-200 bg-white py-2 shadow-xl">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-neutral-50 ${
                          sortBy === option.value ? "text-[#549558] font-semibold" : "text-neutral-700"
                        }`}
                      >
                        {option.label}
                        {sortBy === option.value && <FiCheck className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Price Range */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-500">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.value}
                      onClick={() =>
                        setSelectedPriceRange(selectedPriceRange === range.value ? null : range.value)
                      }
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        selectedPriceRange === range.value
                          ? "bg-[#549558] text-white"
                          : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {range.label}
                      {selectedPriceRange === range.value && <FiCheck className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Other Categories */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-500">
                  Categories
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                        cat.slug === slug
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-600 hover:bg-neutral-50"
                      }`}
                    >
                      <span>{cat.emoji || "📦"}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-neutral-200 bg-white">
                    <div className="aspect-square bg-neutral-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-3/4 rounded-lg bg-neutral-100" />
                      <div className="h-3 w-1/2 rounded-lg bg-neutral-100" />
                      <div className="flex justify-between">
                        <div className="h-5 w-20 rounded-lg bg-neutral-100" />
                        <div className="h-8 w-8 rounded-lg bg-neutral-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white py-20">
                <div className="text-6xl">🔍</div>
                <h3 className="mt-4 text-xl font-bold text-neutral-900">No products found</h3>
                <p className="mt-2 text-neutral-500">Try adjusting your filters</p>
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className="mt-6 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-bold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-3 sm:gap-4 ${
                viewMode === "grid" 
                  ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Load More */}
            {sortedProducts.length > 0 && (
              <div className="mt-10 flex justify-center">
                <button className="flex items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-8 py-3 text-sm font-bold text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white p-6 shadow-2xl lg:hidden">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-500">
                Price Range
              </h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.value}
                    onClick={() =>
                      setSelectedPriceRange(selectedPriceRange === range.value ? null : range.value)
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      selectedPriceRange === range.value
                        ? "bg-[#549558] text-white"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {range.label}
                    {selectedPriceRange === range.value && <FiCheck className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full rounded-xl bg-neutral-900 py-4 font-bold text-white"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-lg transition-all hover:bg-[#549558]"
      >
        <FiArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}