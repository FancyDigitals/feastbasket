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

      <Newsletter />
    </div>
  );
}