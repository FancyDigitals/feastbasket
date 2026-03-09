import { useState } from "react";
import { FiGrid, FiPackage, FiSearch, FiSliders, FiChevronDown, FiCheck, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { useProducts } from "../hooks/useProducts";
import { ProductGrid } from "../components/product/ProductGrid";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function ProductList() {
  const { products, isLoading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id.localeCompare(a.id);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <section className="relative bg-white">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-neutral-900">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#549558]/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-[#f6ae59]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Left - Title */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <FiPackage className="h-4 w-4 text-[#f6ae59]" />
                <span className="text-sm font-semibold text-white">Our Collection</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                All Products
              </h1>

              <p className="max-w-xl text-neutral-400 leading-relaxed">
                Explore groceries, essentials, and household supplies curated for Nigerian families. 
                Fresh quality guaranteed.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="text-2xl font-black text-white">{products.length}</span>
                  <span className="text-sm text-white/70">Products</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#549558]/20 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#549558] animate-pulse" />
                  <span className="text-sm font-medium text-[#549558]">Fresh Stock</span>
                </div>
              </div>
            </div>

            {/* Right - Search */}
            <div className="w-full max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-2 border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-neutral-500 backdrop-blur-sm transition-all focus:border-[#549558] focus:bg-white/10 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" className="w-full">
            <path
              d="M0 25L60 21.7C120 18 240 12 360 12C480 12 600 18 720 21.7C840 25 960 25 1080 21.7C1200 18 1320 12 1380 9L1440 6V50H0V25Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-20 border-b border-neutral-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-neutral-500">Showing</span>
                <span className="font-bold text-neutral-900">{filteredProducts.length}</span>
                <span className="text-neutral-500">products</span>
              </div>

              {searchQuery && (
                <>
                  <div className="h-5 w-px bg-neutral-200" />
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex items-center gap-1.5 rounded-full bg-[#549558]/10 px-3 py-1.5 text-xs font-semibold text-[#549558] transition-colors hover:bg-[#549558]/20"
                  >
                    <span>"{searchQuery}"</span>
                    <span className="text-[#549558]/60">×</span>
                  </button>
                </>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* View Mode */}
              <button className="hidden items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 sm:flex">
                <FiGrid className="h-4 w-4" />
                <span>Grid</span>
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                >
                  <FiSliders className="h-4 w-4 text-neutral-400" />
                  <span className="hidden sm:inline">Sort:</span>
                  <span className="font-semibold text-neutral-900">
                    {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                  </span>
                  <FiChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform ${
                      showSortDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSortDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowSortDropdown(false)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border border-neutral-100 bg-white p-2 shadow-xl">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors ${
                            sortBy === option.value
                              ? "bg-[#549558]/10 font-semibold text-[#549558]"
                              : "text-neutral-700 hover:bg-neutral-50"
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
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-8">
            {/* Loading Header */}
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-neutral-50 py-6">
              <FiRefreshCw className="h-5 w-5 animate-spin text-[#549558]" />
              <span className="text-sm font-medium text-neutral-600">Loading fresh products...</span>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                >
                  <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-50" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-3/4 rounded-lg bg-neutral-100" />
                    <div className="h-3 w-1/2 rounded-lg bg-neutral-100" />
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-5 w-16 rounded-lg bg-neutral-100" />
                      <div className="h-9 w-9 rounded-xl bg-neutral-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-red-200 bg-red-50 py-20 px-6">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-100">
              <FiAlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-neutral-900">Something went wrong</h3>
            <p className="mb-6 max-w-sm text-center text-neutral-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-6 py-3 font-bold text-white transition-colors hover:bg-red-600"
            >
              <FiRefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Products */}
        {!isLoading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50 py-20 px-6">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-sm">
                  <span className="text-5xl">🔍</span>
                </div>
                <h3 className="mb-2 text-2xl font-black text-neutral-900">No products found</h3>
                <p className="mb-6 max-w-sm text-center text-neutral-500">
                  We couldn't find any products matching "{searchQuery}". Try a different search term.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-bold text-white transition-colors hover:bg-[#549558]"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </>
        )}
      </div>

      {/* Bottom Accent */}
      {!isLoading && !error && filteredProducts.length > 0 && (
        <div className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#549558]" />
                <span className="h-2 w-6 rounded-full bg-[#549558]/30" />
                <span className="h-2 w-2 rounded-full bg-[#549558]/50" />
              </div>
              <p className="text-sm text-neutral-500">
                Showing all {filteredProducts.length} products • Updated daily
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}