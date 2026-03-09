import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { HOME_CONTENT } from "../../config/homeContent";

const { categories } = HOME_CONTENT;

export function CategoriesGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-[#549558]/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-[#549558]/5 blur-3xl" />
      </div>

      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
          {categories.title}
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-600 leading-relaxed">
          {categories.subtitle}
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {CATEGORIES.slice(0, 8).map((category, index) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className="group relative"
          >
            {/* Card */}
            <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 transition-all duration-300 ease-out hover:border-[#549558]/30 hover:shadow-[0_20px_60px_-15px_rgba(84,149,88,0.25)] hover:-translate-y-1">
              
              {/* Top Accent Line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#549558] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Icon Container */}
              <div className="relative mb-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-100 transition-all duration-300 group-hover:scale-105 group-hover:border-[#549558]/20 group-hover:from-[#549558]/5 group-hover:to-[#549558]/10">
                  <span className="text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">
                    {categories.emojis[index]}
                  </span>
                </div>
                {/* Floating Badge */}
                <div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#549558] text-[10px] font-bold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 scale-50 group-hover:scale-100">
                  {index + 1}
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 transition-colors duration-300 group-hover:text-[#549558]">
                  {category.name}
                </h3>
                
                {/* CTA Row */}
                <div className="flex items-center gap-1.5 text-neutral-400 transition-all duration-300 group-hover:text-[#549558] group-hover:gap-2">
                  <span className="text-xs font-medium">Explore</span>
                  <svg 
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full border-2 border-[#549558]/5 transition-all duration-500 group-hover:scale-150 group-hover:border-[#549558]/10" />
              
              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full w-full" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(84,149,88,0.05) 1px, transparent 0)`,
                  backgroundSize: '12px 12px'
                }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}