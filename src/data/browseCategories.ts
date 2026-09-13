export type CategoryIcon =
  | "phone"
  | "computer"
  | "watch"
  | "camera"
  | "headphones"
  | "gamepad";

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
];