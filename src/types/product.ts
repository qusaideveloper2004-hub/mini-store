export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;

  discountPercentage: number;
  rating: number;
  reviews: ProductReview[];

  images: string[];
  stock: number;
  availabilityStatus: string;
};