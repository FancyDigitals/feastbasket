import { Link } from "react-router-dom";
import { FiTruck, FiShield, FiClock, FiZap, FiArrowRight, FiGrid } from "react-icons/fi";
import { APP_ROUTES } from "../../constants/routes";
import { HOME_CONTENT } from "../../config/homeContent";
import { CATEGORIES } from "../../constants/categories";



const { hero } = HOME_CONTENT;

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#549558] via-[#3d7240] to-[#2d5230]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-[10%] h-64 w-64 rounded-full bg-white/5 animate-pulse" />
        <div className="absolute bottom-20 right-[15%] h-48 w-48 rounded-full bg-[#f6ae59]/10 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/3 h-32 w-32 rounded-full bg-white/5 animate-pulse delay-1000" />
        
        {/* Gradient Orbs */}
        <div className="absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#f6ae59]/20 to-transparent blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-emerald-400/20 to-transparent blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center space-y-10">
            {/* Animated Badge */}
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6ae59] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f6ae59]" />
              </span>
              <span className="text-sm font-bold tracking-wide text-white">{hero.badge}</span>
              <FiZap className="h-4 w-4 text-[#f6ae59]" />
            </div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {hero.title}
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-[#f6ae59]">{hero.titleHighlight}</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="#f6ae59" strokeWidth="4" strokeLinecap="round" className="opacity-40" />
                  </svg>
                </span>
              </h1>
              <p className="max-w-lg text-xl text-white/80 leading-relaxed font-light">
                {hero.subtitle}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to={APP_ROUTES.products}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-8 py-5 text-base font-bold text-[#549558] shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-[#f6ae59]/20"
              >
                <span className="relative z-10">{hero.ctaPrimary}</span>
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-[#549558]/10 transition-all duration-300 group-hover:bg-[#549558] group-hover:text-white">
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f6ae59]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              
              {/* UPDATED: Browse Categories Button */}
              <Link
  to={`/category/${CATEGORIES[0].slug}`}
  className="group inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/5 px-8 py-5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
>
  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 group-hover:bg-white/20">
    <FiGrid className="h-4 w-4" />
  </div>
  <span>{hero.ctaSecondary}</span>
</Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              {[
                { icon: FiTruck, text: hero.trustBadges[0] },
                { icon: FiShield, text: hero.trustBadges[1] },
                { icon: FiClock, text: hero.trustBadges[2] },
              ].map((item, index) => (
                <div key={index} className="group flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white/90">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Creative Visual */}
          <div className="relative hidden lg:block">
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-white/20" />
              
              {/* Image */}
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                <img 
                  src={hero.image} 
                  alt="Fresh groceries" 
                  className="h-[550px] w-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d5230]/80 via-transparent to-transparent" />
                
                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-[#549558] to-[#3d7240]"
                        />
                      ))}
                    </div>
                    <div className="text-white">
                      <p className="font-bold">Loved by thousands</p>
                      <p className="text-sm text-white/70">Join our community</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -left-8 top-12 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6ae59]">
                    <span className="text-xl">🥬</span>
                  </div>
                  <div className="text-white">
                    <p className="text-xs text-white/70">Fresh Daily</p>
                    <p className="font-bold">Organic Veggies</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-1/3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl shadow-xl animate-bounce-slow delay-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div className="text-white">
                    <p className="text-xs text-white/70">Super Fast</p>
                    <p className="font-bold">30min Delivery</p>
                  </div>
                </div>
              </div>

              {/* Promo Badge */}
              <div className="absolute -right-4 -top-4 z-20">
                <div className="relative">
                  <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-r from-[#f6ae59] to-[#f6ae59]/50 blur-md" />
                  <div className="relative rounded-2xl bg-[#f6ae59] p-5 shadow-2xl">
                    <p className="text-3xl font-black text-white">{hero.promoBadge.discount}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/90">{hero.promoBadge.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path
            d="M0 50L48 45.7C96 41 192 33 288 35.3C384 38 480 50 576 54.8C672 60 768 58 864 50C960 42 1056 27 1152 25.2C1248 23 1344 33 1392 38.5L1440 44V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}