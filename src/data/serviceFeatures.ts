export type ServiceFeatureIcon =
  | "delivery"
  | "support"
  | "guarantee";

export type ServiceFeature = {
  id: string;
  icon: ServiceFeatureIcon;
};

export const serviceFeatures: ServiceFeature[] = [
  {
    id: "delivery",
    icon: "delivery",
  },
  {
    id: "support",
    icon: "support",
  },
  {
    id: "guarantee",
    icon: "guarantee",
  },
];