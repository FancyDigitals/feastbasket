// types/category.ts or constants/categories.ts

export type Category = {
  name: string;
  slug: string;
  emoji?: string; // Add this optional property
};

export const CATEGORIES: Category[] = [
  { name: "Vegetables", slug: "vegetables", emoji: "🥬" },
  { name: "Fruits", slug: "fruits", emoji: "🍎" },
  { name: "Rice & Grains", slug: "rice-grains", emoji: "🍚" },
  { name: "Beverages", slug: "beverages", emoji: "🥤" },
  { name: "Snacks", slug: "snacks", emoji: "🍿" },
  { name: "Frozen Foods", slug: "frozen-foods", emoji: "🧊" },
  { name: "Household Items", slug: "household-items", emoji: "🏠" },
  { name: "Cooking Ingredients", slug: "cooking-ingredients", emoji: "🧂" },
];