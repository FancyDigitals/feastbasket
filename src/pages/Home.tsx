import {
  HeroSection,
  PromoStrip,
  CategoriesGrid,
  FeaturedProducts,
  FlashSale,
  WhyChooseUs,
  DeliveryAreas,
  Newsletter,
} from "../components/home";
import { CategoryList } from "../components/categories/CategoryList";
import { HOME_CONTENT } from "../config/homeContent";

const { allCategories } = HOME_CONTENT;

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <PromoStrip />
      <CategoriesGrid />
      <FeaturedProducts />
      <FlashSale />
      <WhyChooseUs />
      <DeliveryAreas />

      {/* All Categories Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-[#549558]">
            {allCategories.badge}
          </span>
          <h2 className="mb-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
            {allCategories.title}
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600">{allCategories.subtitle}</p>
        </div>
        <CategoryList />
      </section>

      <Newsletter />
    </div>
  );
}