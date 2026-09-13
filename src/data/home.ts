export type HeroSlideId =
  | "iphone"
  | "playstation"
  | "womenCollection"
  | "speakers";

export type HeroSlide = {
  id: HeroSlideId;
  image: string;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "iphone",
    image: "/images/home/hero-iphone2.jpg",
    href: "/shop",
  },
  {
    id: "playstation",
    image: "/images/home/hero-playstation2.jpg",
    href: "/shop",
  },
  {
    id: "womenCollection",
    image: "/images/home/hero-women2.jpg",
    href: "/shop",
  },
  {
    id: "speakers",
    image: "/images/home/hero-speakers2.jpg",
    href: "/shop",
  },
];
export type SidebarCategory = {
  id: string;
  href: string;
  children?: SidebarCategory[];
};

export const sidebarCategories: SidebarCategory[] = [
  {
    id: "womenFashion",
    href: "/category/womens-dresses",
    children: [
      {
        id: "womenDresses",
        href: "/category/womens-dresses",
      },
      {
        id: "womenBags",
        href: "/category/womens-bags",
      },
      {
        id: "womenShoes",
        href: "/category/womens-shoes",
      },
    ],
  },
  {
    id: "menFashion",
    href: "/category/mens-shirts",
    children: [
      {
        id: "menShirts",
        href: "/category/mens-shirts",
      },
      {
        id: "menShoes",
        href: "/category/mens-shoes",
      },
      {
        id: "menWatches",
        href: "/category/mens-watches",
      },
    ],
  },
  {
    id: "electronics",
    href: "/category/smartphones",
  },
  {
    id: "homeLifestyle",
    href: "/category/home-decoration",
  },
  {
    id: "medicine",
    href: "/category/skin-care",
  },
  {
    id: "sportsOutdoor",
    href: "/category/sports-accessories",
  },
  {
    id: "babyToys",
    href: "/category/groceries",
  },
  {
    id: "groceriesPets",
    href: "/category/groceries",
  },
  {
    id: "healthBeauty",
    href: "/category/beauty",
  },
];

export const musicExperience = {
  image: "/images/home/music-experience2.jpg",
  href: "/shop",
} as const;
