export type CategoryIcon =
  | "phone"
  | "computer"
  | "watch"
  | "camera"
  | "headphones"
  | "gamepad"
  | "perfume"
  | "glasses"
  | "sparkles"
  | "bag"
  | "shoe"
  | "shirt";

export type BrowseCategory = {
  id: string;
  slug: string;
  icon: CategoryIcon;
};

export const browseCategories: BrowseCategory[] = [
  {
    id: "phones",
    slug: "smartphones",
    icon: "phone",
  },
  {
    id: "computers",
    slug: "laptops",
    icon: "computer",
  },
  {
    id: "smartWatches",
    slug: "mens-watches",
    icon: "watch",
  },
  {
    id: "cameras",
    slug: "mobile-accessories",
    icon: "camera",
  },
  {
    id: "headphones",
    slug: "audio",
    icon: "headphones",
  },
  {
    id: "gaming",
    slug: "gaming",
    icon: "gamepad",
  },
    {
    id: "perfumes",
    slug: "fragrances",
    icon: "perfume",
  },
    {
    id: "sunglasses",
    slug: "sunglasses",
    icon: "glasses",
  },

  {
    id: "skinCare",
    slug: "skin-care",
    icon: "sparkles",
  },
  {
    id: "bags",
    slug: "womens-bags",
    icon: "bag",
  },
  {
    id: "shoes",
    slug: "mens-shoes",
    icon: "shoe",
  },
  {
    id: "clothing",
    slug: "mens-shirts",
    icon: "shirt",
  },
];