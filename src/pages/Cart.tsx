// pages/Cart.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiPercent,
  FiX,
  FiCheck,
  FiChevronRight,
  FiHome,
  FiTag,
  FiGift,
  FiClock,
  FiPackage,
} from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";
import { APP_ROUTES } from "../constants/routes";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, summary } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "fresh10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    setRemovingId(productId);
    await new Promise((resolve) => setTimeout(resolve, 300));
    removeFromCart(productId);
    setRemovingId(null);
  };

  const discount = promoApplied ? Math.round(summary.subtotal * 0.1) : 0;
  const finalTotal = summary.total - discount;

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-white border-b border-neutral-100">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link to={APP_ROUTES.home} className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors">
                <FiHome className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <FiChevronRight className="h-4 w-4 text-neutral-300" />
              <span className="font-medium text-neutral-900">Shopping Cart</span>
            </nav>
          </div>
        </div>

        {/* Empty State */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-neutral-100">
                <FiShoppingCart className="h-16 w-16 text-neutral-300" />
              </div>
              <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#549558] shadow-lg">
                <span className="text-2xl">😢</span>
              </div>
            </div>

            <h1 className="mb-3 text-3xl font-black text-neutral-900">Your cart is empty</h1>
            <p className="mb-8 max-w-md text-neutral-500">
              Looks like you haven't added anything to your cart yet. Start exploring our amazing products!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to={APP_ROUTES.products}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-8 py-4 font-bold text-white transition-all hover:bg-[#549558] hover:shadow-lg"
              >
                <FiShoppingBag className="h-5 w-5" />
                Start Shopping
              </Link>
              <Link
                to={APP_ROUTES.categories}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-8 py-4 font-bold text-neutral-700 transition-all hover:border-neutral-300"
              >
                Browse Categories
              </Link>
            </div>

            {/* Quick Suggestions */}
            <div className="mt-16 w-full max-w-2xl">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Popular Categories
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { emoji: "🥬", name: "Vegetables", slug: "vegetables" },
                  { emoji: "🍎", name: "Fruits", slug: "fruits" },
                  { emoji: "🍚", name: "Rice & Grains", slug: "rice-grains" },
                  { emoji: "🥤", name: "Beverages", slug: "beverages" },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-all hover:border-[#549558] hover:bg-[#549558]/5 hover:text-[#549558]"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm">
            <Link to={APP_ROUTES.home} className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors">
              <FiHome className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <FiChevronRight className="h-4 w-4 text-neutral-300" />
            <span className="font-medium text-neutral-900">Shopping Cart</span>
          </nav>

          {/* Title Row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900">
                <FiShoppingCart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-neutral-900 sm:text-3xl">Shopping Cart</h1>
                <p className="text-neutral-500">
                  {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>

            <button
              onClick={() => clearCart()}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
            >
              <FiTrash2 className="h-4 w-4" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FiTruck className="h-5 w-5 text-[#549558]" />
                  <span className="font-semibold text-neutral-700">
                    {summary.subtotal >= 15000 ? (
                      <>
                        <span className="text-[#549558]">You qualify for free delivery!</span>
                      </>
                    ) : (
                      <>
                        Add <span className="font-bold text-[#549558]">{formatPrice(15000 - summary.subtotal)}</span> more for free delivery
                      </>
                    )}
                  </span>
                </div>
                <span className="text-neutral-400">{Math.min(100, Math.round((summary.subtotal / 15000) * 100))}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#549558] to-[#3d7240] transition-all duration-500"
                  style={{ width: `${Math.min(100, (summary.subtotal / 15000) * 100)}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4">
                <h2 className="font-bold text-neutral-900">Cart Items ({items.length})</h2>
              </div>

              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className={`flex gap-4 p-4 sm:p-6 transition-all duration-300 ${
                      removingId === item.product.id ? "opacity-50 scale-95" : ""
                    }`}
                  >
                    {/* Image */}
                    <Link
                      to={APP_ROUTES.productDetail.replace(":slug", item.product.slug)}
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover transition-transform hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/112?text=🛒";
                        }}
                      />
                      {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                        <div className="absolute left-1 top-1 rounded-md bg-[#f6ae59] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          -{Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}%
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              to={APP_ROUTES.productDetail.replace(":slug", item.product.slug)}
                              className="font-bold text-neutral-900 hover:text-[#549558] transition-colors line-clamp-2"
                            >
                              {item.product.name}
                            </Link>
                            <p className="mt-1 text-sm text-neutral-500">{item.product.unit}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="shrink-0 rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-white hover:shadow-sm"
                          >
                            <FiMinus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, Math.max(1, Number(e.target.value)))}
                            className="w-12 bg-transparent text-center text-sm font-bold text-neutral-900 outline-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-white hover:shadow-sm"
                          >
                            <FiPlus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                            <p className="text-sm text-neutral-400 line-through">
                              {formatPrice(item.product.originalPrice * item.quantity)}
                            </p>
                          )}
                          <p className="text-lg font-black text-neutral-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              to={APP_ROUTES.products}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#549558] hover:underline"
            >
              <FiArrowRight className="h-4 w-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 space-y-4 self-start">
            {/* Summary Card */}
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-neutral-100 bg-neutral-50 px-6 py-4">
                <h2 className="font-bold text-neutral-900">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formatPrice(summary.subtotal)}</span>
                </div>

                {/* Delivery */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600">Delivery</span>
                    {summary.subtotal >= 15000 && (
                      <span className="rounded-full bg-[#549558]/10 px-2 py-0.5 text-[10px] font-bold text-[#549558]">
                        FREE
                      </span>
                    )}
                  </div>
                  <span className={`font-semibold ${summary.subtotal >= 15000 ? "text-[#549558] line-through" : "text-neutral-900"}`}>
                    {formatPrice(summary.deliveryFee)}
                  </span>
                </div>

                {/* Promo Code */}
                {promoApplied && (
                  <div className="flex items-center justify-between text-[#549558]">
                    <div className="flex items-center gap-2">
                      <FiTag className="h-4 w-4" />
                      <span>Promo (FRESH10)</span>
                    </div>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-neutral-100" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-neutral-900">Total</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-neutral-900">{formatPrice(finalTotal)}</p>
                    <p className="text-xs text-neutral-500">VAT included</p>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="border-t border-neutral-100 p-6">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FiPercent className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value.toUpperCase());
                        setPromoError("");
                      }}
                      placeholder="Enter code"
                      disabled={promoApplied}
                      className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm font-semibold uppercase text-neutral-900 transition-all placeholder:text-neutral-400 focus:border-[#549558] focus:bg-white focus:outline-none disabled:opacity-50"
                    />
                    {promoApplied && (
                      <button
                        onClick={() => {
                          setPromoApplied(false);
                          setPromoCode("");
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    disabled={!promoCode || promoApplied}
                    className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
                  >
                    {promoApplied ? <FiCheck className="h-5 w-5" /> : "Apply"}
                  </button>
                </div>
                {promoError && <p className="mt-2 text-sm text-red-500">{promoError}</p>}
                {promoApplied && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-[#549558]">
                    <FiCheck className="h-4 w-4" />
                    Promo code applied successfully!
                  </p>
                )}
                <p className="mt-3 text-xs text-neutral-400">Try "FRESH10" for 10% off</p>
              </div>

              {/* Checkout Button */}
              <div className="p-6 pt-0">
                <Link
                  to={APP_ROUTES.checkout || "/checkout"}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#549558] py-4 font-bold text-white transition-all hover:bg-[#468349] hover:shadow-lg hover:shadow-[#549558]/25"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#549558]/10">
                    <FiShield className="h-5 w-5 text-[#549558]" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#549558]/10">
                    <FiTruck className="h-5 w-5 text-[#549558]" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#549558]/10">
                    <FiGift className="h-5 w-5 text-[#549558]" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-600">Gift Wrapping</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="rounded-2xl bg-gradient-to-br from-[#549558] to-[#3d7240] p-5 text-white">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <FiClock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Estimated Delivery</h4>
                  <p className="mt-1 text-sm text-white/80">
                    Order within <span className="font-semibold text-white">2 hours 15 mins</span> for same-day delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}