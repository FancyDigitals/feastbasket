import { Link } from "react-router-dom";
import { FiZap, FiArrowRight, FiPlus } from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";
import { useProducts } from "../../hooks/useProducts";
import { useCountdown } from "../../hooks/useCountdown";
import { useCart } from "../../hooks/useCart";
import { HOME_CONTENT } from "../../config/homeContent";
import { formatPrice } from "../../utils/formatPrice";
import { useMemo } from "react";

const { flashSale } = HOME_CONTENT;

export function FlashSale() {
  const { products } = useProducts({ limit: flashSale.limit * 2 });
  const { addToCart } = useCart();
  const flashSaleProducts = products.slice(flashSale.limit, flashSale.limit * 2);

  const flashSaleEnd = useMemo(() => {
    const end = new Date();
    end.setHours(end.getHours() + flashSale.durationHours);
    return end;
  }, []);

  const countdown = useCountdown(flashSaleEnd);

  if (flashSaleProducts.length === 0) return null;

  return (
    <section className="bg-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500">
              <FiZap className="h-6 w-6 text-white" />
            </div>
            
            {/* Title */}
            <div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                {flashSale.title}
              </h2>
              <p className="text-sm text-neutral-400">{flashSale.subtitle}</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Ends in
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { value: countdown.hours, label: "h" },
                { value: countdown.minutes, label: "m" },
                { value: countdown.seconds, label: "s" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-lg font-black tabular-nums text-white">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-xs font-bold text-neutral-500">{item.label}</span>
                  {index < 2 && <span className="mx-1 text-neutral-600">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {flashSaleProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-2xl bg-neutral-800 transition-all duration-300 hover:bg-neutral-750"
            >
              {/* Badge */}
              <div className="absolute left-2.5 top-2.5 z-10 rounded-lg bg-rose-500 px-2 py-1">
                <span className="text-[10px] font-bold text-white">-{flashSale.discount}%</span>
              </div>

              {/* Image */}
              <Link
                to={APP_ROUTES.productDetail.replace(":slug", product.slug)}
                className="relative block aspect-square overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Content */}
              <div className="p-3">
                <Link to={APP_ROUTES.productDetail.replace(":slug", product.slug)}>
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-rose-400 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-white sm:text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-neutral-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white transition-transform duration-200 hover:scale-110 active:scale-95"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <Link
            to={APP_ROUTES.products}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 transition-colors hover:text-white"
          >
            <span>View All Deals</span>
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}