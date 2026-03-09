export const HOME_CONTENT = {
  hero: {
    badge: "Free Delivery on Orders Above ₦50,000",
    title: "Fresh Groceries for",
    titleHighlight: "Nigerian Kitchens",
    subtitle:
      "Rice, vegetables, frozen foods, snacks, and daily essentials delivered straight to your home. No market stress.",
    ctaPrimary: "Start Shopping",
    ctaSecondary: "Browse Categories",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
    stats: [
      { label: "Products", value: "10K+" },
      { label: "Customers", value: "50K+" },
      { label: "Rating", value: "4.9⭐" },
    ],
    trustBadges: ["Fast Delivery", "Quality Assured", "24/7 Support"],
    promoBadge: {
      discount: "15% OFF",
      label: "First Order",
    },
  },
  promoStrip: {
    title: "Limited Time Offer!",
    description: "Get 15% off your first order above ₦50,000",
    ctaText: "Shop Now",
  },
  categories: {
    title: "Everything You Need",
    subtitle: "Browse our organized categories to find exactly what you're looking for",
    emojis: ["🥬", "🍎", "🍚", "🥤", "🍿", "🧊", "🧹", "🧄"],
  },
  featuredProducts: {
    badge: "Popular This Week",
    title: "Customer Favorites",
    subtitle: "Pantry staples and fresh market favorites customers buy most often",
    limit: 4,
  },
  flashSale: {
    badge: "Flash Sale",
    title: "Today's Hot Deals",
    subtitle: "Limited time offers. Grab them now!",
    discount: 25,
    durationHours: 24,
    limit: 4,
  },
  whyChooseUs: {
    badge: "Why Choose Us",
    title: "Shopping Made Simple",
    subtitle:
      "Built for Nigerian households that want reliable groceries without spending hours at crowded markets",
  },
  deliveryAreas: {
    badge: "Delivery Coverage",
    title: "We Deliver Across Lagos",
    description:
      "Fast and reliable delivery to all major areas in Lagos. Same-day delivery available for orders placed before 2 PM.",
    ctaText: "Start Shopping",
  },
  allCategories: {
    badge: "Full Catalog",
    title: "Browse All Categories",
    subtitle:
      "Clear category paths keep the shopping journey fast and help you find what you need quickly",
  },
  newsletter: {
    emoji: "📧",
    title: "Get Exclusive Deals",
    subtitle: "Subscribe to our newsletter and get 10% off your next order plus weekly deals",
    placeholder: "Enter your email",
    ctaText: "Subscribe",
    disclaimer: "By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.",
  },
} as const;