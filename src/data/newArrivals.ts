export type ArrivalCardVariant =
  | "featured"
  | "wide"
  | "smallLeft"
  | "smallRight";

export type NewArrival = {
  id: string;
  image: string;
  href: string;
  variant: ArrivalCardVariant;
};

export const newArrivals: NewArrival[] = [
  {
    id: "playstation",
    image: "/images/home/new-arrivals/playstation.jpg",
    href: "/shop",
    variant: "featured",
  },
  {
    id: "womenCollection",
    image: "/images/home/new-arrivals/women-collection.jpg",
    href: "/shop",
    variant: "wide",
  },
  {
    id: "speakers",
    image: "/images/home/new-arrivals/speakers.jpg",
    href: "/shop",
    variant: "smallLeft",
  },
  {
    id: "perfume",
    image: "/images/home/new-arrivals/perfume.jpg",
    href: "/shop",
    variant: "smallRight",
  },
];