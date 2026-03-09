import { Link } from "react-router-dom";
import { FiArrowRight, FiBox, FiStar } from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";
import { useProducts } from "../../hooks/useProducts";
import { ProductGrid } from "../product/ProductGrid";
import { HOME_CONTENT } from "../../config/homeContent";

const { featuredProducts } = HOME_CONTENT;

export function FeaturedProducts() {
  const { products, isLoading } = useProducts({ limit: featuredProducts.limit });

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Subtle Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-[#549558]/5 to-transparent blur-3xl" />

      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#549558]/10 to-[#549558]/5 px-4 py-2 border border-[#549558]/10">
            <FiStar className="h-4 w-4 text-[#549558]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#549558]">
              {featuredProducts.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
            {featuredProducts.title}
          </h2>

          {/* Subtitle with decorative line */}
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-[#549558] to-transparent" />
            <p className="text-lg text-neutral-500">{featuredProducts.subtitle}</p>
          </div>
        </div>

        {/* View All Button */}
        <Link
          to={APP_ROUTES.products}
          className="group hidden sm:inline-flex items-center gap-3 rounded-xl border-2 border-neutral-900 bg-neutral-900 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-transparent hover:text-neutral-900"
        >
          <span>View All Products</span>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white">
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>

      {/* Products or Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {[...Array(featuredProducts.limit)].map((_, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              {/* Image Skeleton */}
              <div className="relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-neutral-300">
                    <FiBox className="h-10 w-10 md:h-12 md:w-12 animate-pulse" />
                    <div className="h-2 w-12 md:w-16 rounded-full bg-neutral-200 animate-pulse" />
                  </div>
                </div>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>

              {/* Content Skeleton */}
              <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded-lg bg-neutral-200 animate-pulse" />
                  <div className="h-3 w-1/2 rounded-lg bg-neutral-100 animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-5 md:h-6 w-16 md:w-20 rounded-lg bg-neutral-200 animate-pulse" />
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-neutral-100 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

      {/* Mobile View All */}
      <div className="mt-10 flex sm:hidden">
        <Link
          to={APP_ROUTES.products}
          className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-neutral-900 bg-neutral-900 px-6 py-4 text-sm font-bold text-white transition-all duration-300 active:scale-[0.98]"
        >
          <span>View All Products</span>
          <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Bottom Decorative Element */}
      <div className="mt-16 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#549558]" />
          <span className="h-1.5 w-8 rounded-full bg-[#549558]/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#549558]/50" />
        </div>
      </div>
    </section>
  );
}