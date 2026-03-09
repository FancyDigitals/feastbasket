// components/product/ProductCard.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMinus, FiHeart, FiCheck } from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";
import { useCart } from "../../hooks/useCart";
import type { Product, ProductVariation } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const hasVariations = product.variations && product.variations.length > 0;

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    hasVariations ? product.variations![0] : undefined
  );

  const currentPrice = selectedVariation?.price || product.price;
  const comparePrice = selectedVariation?.comparePrice || product.originalPrice;
  const isInStock = selectedVariation?.inStock ?? product.inStock;
  const cartQuantity = getItemQuantity(product.id, selectedVariation?.id);
  const isInCart = cartQuantity > 0;

  const discountPercent = comparePrice && comparePrice > currentPrice
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!isInStock) return;
    addToCart(product, selectedVariation);
  };

  return (
    <article className="group relative">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:border-[#549558]/30 hover:shadow-[0_8px_30px_-12px_rgba(84,149,88,0.3)]">
        
        {/* Image */}
        <Link
          to={APP_ROUTES.productDetail.replace(":slug", product.slug)}
          className="relative block aspect-square overflow-hidden bg-neutral-50"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Wishlist */}
          <button className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-neutral-400 opacity-0 backdrop-blur-sm transition-all duration-300 hover:text-red-500 group-hover:opacity-100">
            <FiHeart className="h-4 w-4" />
          </button>

          {/* Out of Stock Overlay */}
          {!isInStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
              <span className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white">
                Out of Stock
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {discountPercent && (
            <div className="absolute left-2.5 top-2.5 rounded-lg bg-[#f6ae59] px-2 py-1 shadow-lg">
              <span className="text-[10px] font-bold text-white">{discountPercent}% OFF</span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Unit Badge */}
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#549558]" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
              {product.unit}
            </span>
          </div>

          {/* Name */}
          <Link to={APP_ROUTES.productDetail.replace(":slug", product.slug)}>
            <h3 className="text-sm font-bold text-neutral-900 leading-snug line-clamp-1 transition-colors hover:text-[#549558] sm:text-base">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="mt-1 text-[11px] text-neutral-500 line-clamp-2 leading-relaxed sm:text-xs">
            {product.description}
          </p>

          {/* Variations Selector */}
          {hasVariations && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1.5">
                {product.variations!.map((variation) => {
                  const isSelected = selectedVariation?.id === variation.id;
                  const isAvailable = variation.inStock;

                  return (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariation(variation)}
                      disabled={!isAvailable}
                      className={`
                        relative rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all duration-200 sm:text-xs
                        ${isSelected
                          ? "bg-[#549558] text-white shadow-md shadow-[#549558]/20"
                          : isAvailable
                            ? "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                            : "bg-neutral-50 text-neutral-300 cursor-not-allowed line-through"
                        }
                      `}
                    >
                      {/* Selected Indicator */}
                      {isSelected && (
                        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white shadow">
                          <FiCheck className="h-2 w-2 text-[#549558]" />
                        </span>
                      )}
                      {variation.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price & Cart */}
          <div className="mt-3 flex items-center justify-between gap-2">
            {/* Price */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-[#549558] sm:text-lg">
                  {formatPrice(currentPrice)}
                </span>
                {comparePrice && comparePrice > currentPrice && (
                  <span className="text-[10px] text-neutral-400 line-through sm:text-xs">
                    {formatPrice(comparePrice)}
                  </span>
                )}
              </div>
              {selectedVariation && (
                <span className="text-[9px] text-neutral-400">
                  {selectedVariation.label}
                </span>
              )}
            </div>

            {/* Cart Actions */}
            {isInCart ? (
              <div className="flex items-center gap-0.5 rounded-lg bg-[#549558] p-0.5">
                <button
                  onClick={() => updateQuantity(product.id, cartQuantity - 1, selectedVariation?.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-white/20 text-white transition-colors hover:bg-white/30"
                >
                  <FiMinus className="h-3 w-3" />
                </button>
                <span className="min-w-[1.75rem] text-center text-xs font-bold text-white">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, cartQuantity + 1, selectedVariation?.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-white/20 text-white transition-colors hover:bg-white/30"
                >
                  <FiPlus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!isInStock}
                className={`
                  flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-300 active:scale-95
                  ${isInStock
                    ? "bg-neutral-900 text-white hover:bg-[#549558] hover:shadow-lg hover:shadow-[#549558]/20"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  }
                `}
              >
                <FiPlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add</span>
              </button>
            )}
          </div>
        </div>

        {/* Corner Decoration */}
        <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-[#549558]/5 transition-transform duration-500 group-hover:scale-[3]" />
      </div>
    </article>
  );
}