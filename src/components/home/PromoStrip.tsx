import { Link } from "react-router-dom";
import { FiArrowRight, FiGift, FiTruck, FiZap } from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";

export function PromoStrip() {
  return (
    <section className="relative overflow-hidden bg-neutral-900">
      {/* Luxury Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6ae59]/20 via-transparent to-[#549558]/20" />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%), linear-gradient(-45deg, white 25%, transparent 25%)`,
            backgroundSize: "6px 6px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-between gap-6">
          
          {/* Left - Main Promo */}
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="hidden sm:flex h-6 w-6 items-center justify-center rounded bg-[#f6ae59]">
              <FiGift className="h-3 w-3 text-white" />
            </div>
            
            {/* Text */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#f6ae59]">
                <FiZap className="h-2.5 w-2.5" />
                Limited
              </span>
              <p className="text-xs font-medium text-white sm:text-sm">
                Free delivery on orders above{" "}
                <span className="font-bold text-[#f6ae59]">₦15,000</span>
              </p>
            </div>
          </div>

          {/* Right - CTA */}
          <Link
            to={APP_ROUTES.products}
            className="group flex items-center gap-1.5 rounded bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-900 transition-all duration-300 hover:bg-[#f6ae59] hover:text-white"
          >
            <span>Shop Now</span>
            <FiArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f6ae59]/50 to-transparent" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Alternative: Minimal White Strip
───────────────────────────────────────────────────────────── */

export function PromoStripMinimal() {
  return (
    <section className="border-b border-neutral-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-center gap-6">
          {[
            { icon: FiTruck, text: "Free Delivery ₦15k+" },
            { icon: FiGift, text: "Gift Wrapping" },
            { icon: FiZap, text: "Same Day Delivery" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="h-3 w-3 text-[#549558]" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-600 sm:text-xs">
                {item.text}
              </span>
              {index < 2 && (
                <div className="hidden sm:block ml-6 h-3 w-px bg-neutral-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Alternative: Animated Scrolling Strip
───────────────────────────────────────────────────────────── */

const PROMOS = [
  { icon: FiTruck, text: "Free delivery above", highlight: "₦15,000" },
  { icon: FiGift, text: "New customers get", highlight: "10% off" },
  { icon: FiZap, text: "Same day delivery", highlight: "available" },
];

export function PromoStripAnimated() {
  return (
    <section className="relative overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6ae59]/10 via-transparent to-[#549558]/10" />

      <div className="relative flex h-9 items-center">
        <div className="flex animate-marquee items-center gap-8">
          {[...PROMOS, ...PROMOS].map((promo, index) => (
            <div key={index} className="flex shrink-0 items-center gap-2">
              <promo.icon className="h-3 w-3 text-[#f6ae59]" />
              <p className="whitespace-nowrap text-xs text-white/80">
                {promo.text}{" "}
                <span className="font-bold text-[#f6ae59]">{promo.highlight}</span>
              </p>
              <span className="ml-4 text-white/20">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Alternative: Gradient Accent Strip
───────────────────────────────────────────────────────────── */

export function PromoStripGradient() {
  return (
    <section className="relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#f6ae59]">
            <FiGift className="h-2.5 w-2.5 text-white" />
          </span>
          <p className="text-xs font-medium text-white">
            Free delivery on orders above{" "}
            <span className="font-bold text-[#f6ae59]">₦15,000</span>
          </p>
          <span className="mx-2 text-white/20">|</span>
          <Link
            to={APP_ROUTES.products}
            className="group flex items-center gap-1 text-xs font-semibold text-[#f6ae59] transition-colors hover:text-white"
          >
            Shop Now
            <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}