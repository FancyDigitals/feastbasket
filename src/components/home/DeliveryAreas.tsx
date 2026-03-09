import { Link } from "react-router-dom";
import { FiMapPin, FiArrowRight, FiCheck, FiTruck } from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";
import { DELIVERY_AREAS } from "../../constants/deliveryAreas";
import { HOME_CONTENT } from "../../config/homeContent";

const { deliveryAreas } = HOME_CONTENT;

export function DeliveryAreas() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Accent Corner */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#549558]/10" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#f6ae59]/10" />

        <div className="relative grid lg:grid-cols-5">
          {/* Left Content */}
          <div className="col-span-2 p-8 sm:p-10 lg:p-12">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-[#549558] px-3 py-1.5">
              <FiMapPin className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {deliveryAreas.badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-4 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
              {deliveryAreas.title}
            </h2>

            {/* Description */}
            <p className="mb-8 text-neutral-600 leading-relaxed">
              {deliveryAreas.description}
            </p>

            {/* Features */}
            <div className="mb-8 space-y-3">
              {[
                "Same-day delivery available",
                "Real-time order tracking",
                "Free delivery on orders above ₦15,000",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#549558]/10">
                    <FiCheck className="h-3 w-3 text-[#549558]" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={APP_ROUTES.products}
              className="group inline-flex items-center gap-3 rounded-xl bg-neutral-900 px-6 py-3.5 font-bold text-white transition-all duration-300 hover:bg-[#549558]"
            >
              <span>{deliveryAreas.ctaText}</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20">
                <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>

          {/* Right - Delivery Areas Grid */}
          <div className="col-span-3 border-t border-neutral-100 bg-neutral-50 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            {/* Section Label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#549558]">
                <FiTruck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900">Delivery Locations</h3>
                <p className="text-xs text-neutral-500">We deliver to these areas</p>
              </div>
            </div>

            {/* Areas Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DELIVERY_AREAS.map((area, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-all duration-200 hover:border-[#549558]/30 hover:shadow-sm"
                >
                  <span className="flex h-2 w-2 items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#549558] transition-transform duration-200 group-hover:scale-150" />
                  </span>
                  <span className="text-sm font-semibold text-neutral-700 group-hover:text-[#549558] transition-colors">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#f6ae59]/10 px-4 py-3">
              <span className="text-lg">📍</span>
              <p className="text-xs text-neutral-600">
                <span className="font-semibold text-[#f6ae59]">Coming soon:</span> More locations being added weekly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}