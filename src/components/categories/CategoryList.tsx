import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { CATEGORIES } from "../../constants/categories";

const CATEGORY_EMOJIS: Record<string, string> = {
  "vegetables": "🥬",
  "fruits": "🍎",
  "rice-grains": "🍚",
  "beverages": "🥤",
  "snacks": "🍿",
  "frozen-foods": "🧊",
  "household-items": "🏠",
  "cooking-ingredients": "🧂",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "vegetables": "Fresh and organic vegetables delivered daily",
  "fruits": "Juicy seasonal fruits handpicked for you",
  "rice-grains": "Premium quality rice and grains",
  "beverages": "Refreshing drinks and beverages",
  "snacks": "Delicious snacks for every craving",
  "frozen-foods": "Quality frozen foods and treats",
  "household-items": "Essential items for your home",
  "cooking-ingredients": "Spices and ingredients for cooking",
};

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {CATEGORIES.map((category, index) => (
        <Link
          key={category.slug}
          to={`/category/${category.slug}`}
          className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-[#549558]/30 hover:shadow-[0_8px_30px_-12px_rgba(84,149,88,0.25)] hover:-translate-y-1"
        >
          {/* Top Accent */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#549558] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Emoji Icon */}
          <div className="relative mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-50 border border-neutral-100 transition-all duration-300 group-hover:bg-[#549558]/10 group-hover:border-[#549558]/20 group-hover:scale-105">
              <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                {CATEGORY_EMOJIS[category.slug] || "📦"}
              </span>
            </div>
            
            {/* Index Badge */}
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#549558] text-[10px] font-bold text-white opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
              {index + 1}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-neutral-900 transition-colors duration-300 group-hover:text-[#549558] sm:text-lg">
              {category.name}
            </h3>

            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
              {CATEGORY_DESCRIPTIONS[category.slug] || "Explore our collection"}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-1.5 pt-1 text-neutral-400 transition-all duration-300 group-hover:text-[#549558] group-hover:gap-2">
              <span className="text-xs font-semibold">Shop Now</span>
              <FiArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Corner Decoration */}
          <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full border-2 border-[#549558]/5 transition-all duration-500 group-hover:scale-150 group-hover:border-[#549558]/10" />
        </Link>
      ))}
    </div>
  );
}