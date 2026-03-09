import type { IconType } from "react-icons";
import { FiTruck, FiShield, FiStar, FiClock } from "react-icons/fi";

export type Feature = {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
};

export const FEATURES: Feature[] = [
  {
    icon: FiTruck,
    title: "Fast Delivery",
    description: "Same-day delivery across Lagos. Your groceries arrive fresh.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FiShield,
    title: "Quality Guaranteed",
    description: "Fresh produce sourced daily. 100% satisfaction guaranteed.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: FiStar,
    title: "Best Prices",
    description: "Competitive prices with regular discounts and flash sales.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: FiClock,
    title: "24/7 Support",
    description: "Customer service always ready to help with your orders.",
    gradient: "from-purple-500 to-pink-500",
  },
];