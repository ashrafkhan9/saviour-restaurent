export type DietaryTag = "VEGETARIAN" | "VEGAN" | "GLUTEN_FREE" | "SPICY";

export type MenuVariant = {
  id: string;
  name: string;
  price: number;
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
};

export type AddOnGroup = {
  id: string;
  name: string;
  required: boolean;
  maxSelections: number;
  options: AddOn[];
};

export type MenuItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  categoryId: string;
  dietaryTags: DietaryTag[];
  available: boolean;
  featured?: boolean;
  variants: MenuVariant[];
  addOnGroups: AddOnGroup[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
};

export const categories: Category[] = [
  {
    id: "cat-starters",
    name: "Starters",
    slug: "starters",
    description: "Small plates, breads, and crisp openers.",
    displayOrder: 1,
  },
  {
    id: "cat-mains",
    name: "Mains",
    slug: "mains",
    description: "Signature plates from the grill, oven, and pan.",
    displayOrder: 2,
  },
  {
    id: "cat-pasta",
    name: "Pasta",
    slug: "pasta",
    description: "Fresh pasta, slow sauces, and bright herbs.",
    displayOrder: 3,
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    slug: "desserts",
    description: "House sweets and after-dinner favorites.",
    displayOrder: 4,
  },
  {
    id: "cat-drinks",
    name: "Drinks",
    slug: "drinks",
    description: "Coffee, citrus coolers, and crafted refreshments.",
    displayOrder: 5,
  },
];

const sides: AddOnGroup = {
  id: "addon-sides",
  name: "Sides",
  required: false,
  maxSelections: 2,
  options: [
    { id: "garlic-fries", name: "Garlic fries", price: 4 },
    { id: "seasonal-greens", name: "Seasonal greens", price: 5 },
    { id: "charred-bread", name: "Charred sourdough", price: 3 },
  ],
};

const proteins: AddOnGroup = {
  id: "addon-protein",
  name: "Protein",
  required: false,
  maxSelections: 1,
  options: [
    { id: "grilled-chicken", name: "Grilled chicken", price: 6 },
    { id: "seared-shrimp", name: "Seared shrimp", price: 8 },
    { id: "crispy-tofu", name: "Crispy tofu", price: 5 },
  ],
};

export const menuItems: MenuItem[] = [
  {
    id: "item-burrata",
    name: "Burrata & Stone Fruit",
    slug: "burrata-stone-fruit",
    description: "Creamy burrata, grilled peaches, basil oil, pistachio, aged balsamic.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
    price: 14,
    categoryId: "cat-starters",
    dietaryTags: ["VEGETARIAN", "GLUTEN_FREE"],
    available: true,
    featured: true,
    variants: [],
    addOnGroups: [sides],
  },
  {
    id: "item-calamari",
    name: "Crispy Calamari",
    slug: "crispy-calamari",
    description: "Lightly fried calamari with lemon aioli, fennel, and chile salt.",
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=1200&q=80",
    price: 16,
    categoryId: "cat-starters",
    dietaryTags: ["SPICY"],
    available: true,
    variants: [],
    addOnGroups: [],
  },
  {
    id: "item-ribeye",
    name: "Charred Ribeye",
    slug: "charred-ribeye",
    description: "Dry-aged ribeye, rosemary butter, roasted garlic, and smoked sea salt.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    price: 38,
    categoryId: "cat-mains",
    dietaryTags: ["GLUTEN_FREE"],
    available: true,
    featured: true,
    variants: [
      { id: "ribeye-10", name: "10 oz", price: 38 },
      { id: "ribeye-14", name: "14 oz", price: 48 },
    ],
    addOnGroups: [sides],
  },
  {
    id: "item-salmon",
    name: "Citrus Salmon",
    slug: "citrus-salmon",
    description: "Pan-seared salmon, citrus beurre blanc, asparagus, and herb potatoes.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    price: 29,
    categoryId: "cat-mains",
    dietaryTags: ["GLUTEN_FREE"],
    available: true,
    variants: [],
    addOnGroups: [sides],
  },
  {
    id: "item-rigatoni",
    name: "Spicy Vodka Rigatoni",
    slug: "spicy-vodka-rigatoni",
    description: "Rigatoni, tomato cream, Calabrian chile, parmesan, and basil.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    price: 22,
    categoryId: "cat-pasta",
    dietaryTags: ["VEGETARIAN", "SPICY"],
    available: true,
    featured: true,
    variants: [
      { id: "rigatoni-regular", name: "Regular", price: 22 },
      { id: "rigatoni-family", name: "Family", price: 39 },
    ],
    addOnGroups: [proteins],
  },
  {
    id: "item-mushroom",
    name: "Wild Mushroom Tagliatelle",
    slug: "wild-mushroom-tagliatelle",
    description: "Fresh tagliatelle, roasted mushrooms, thyme, mascarpone, black pepper.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    price: 24,
    categoryId: "cat-pasta",
    dietaryTags: ["VEGETARIAN"],
    available: true,
    variants: [],
    addOnGroups: [proteins],
  },
  {
    id: "item-torte",
    name: "Chocolate Olive Oil Torte",
    slug: "chocolate-olive-oil-torte",
    description: "Dense chocolate cake, whipped mascarpone, sea salt, and orange zest.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    price: 11,
    categoryId: "cat-desserts",
    dietaryTags: ["VEGETARIAN"],
    available: true,
    variants: [],
    addOnGroups: [],
  },
  {
    id: "item-panna",
    name: "Vanilla Bean Panna Cotta",
    slug: "vanilla-bean-panna-cotta",
    description: "Silky vanilla custard with berry compote and toasted almond.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    price: 10,
    categoryId: "cat-desserts",
    dietaryTags: ["VEGETARIAN", "GLUTEN_FREE"],
    available: true,
    variants: [],
    addOnGroups: [],
  },
  {
    id: "item-spritz",
    name: "Blood Orange Spritz",
    slug: "blood-orange-spritz",
    description: "Blood orange, rosemary, soda, and a bright citrus finish.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80",
    price: 9,
    categoryId: "cat-drinks",
    dietaryTags: ["VEGAN", "GLUTEN_FREE"],
    available: true,
    variants: [
      { id: "spritz-zero", name: "Zero proof", price: 9 },
      { id: "spritz-classic", name: "Classic", price: 13 },
    ],
    addOnGroups: [],
  },
  {
    id: "item-espresso",
    name: "Espresso Tonic",
    slug: "espresso-tonic",
    description: "Double espresso, tonic water, citrus peel, and clear ice.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80",
    price: 7,
    categoryId: "cat-drinks",
    dietaryTags: ["VEGAN", "GLUTEN_FREE"],
    available: true,
    variants: [],
    addOnGroups: [],
  },
];

export const reservationSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getCategoryName(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.name ?? "Menu";
}
