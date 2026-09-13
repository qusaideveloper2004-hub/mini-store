import {cache} from "react";

import type {Product} from "@/types/product";

const API_URL = "https://dummyjson.com";

type DummyJsonReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;

  discountPercentage: number;
  rating: number;
  reviews: DummyJsonReview[];

  images: string[];
  stock: number;
  availabilityStatus: string;
};

type DummyJsonProductsResponse = {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
};

function mapProduct(product: DummyJsonProduct): Product {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    reviews: product.reviews,

    images: product.images,
    stock: product.stock,
    availabilityStatus: product.availabilityStatus,
  };
}

export const getProducts = cache(async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: DummyJsonProductsResponse = await response.json();

  return data.products.map(mapProduct);
});

export const getProduct = cache(async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data: DummyJsonProduct = await response.json();

  return mapProduct(data);
});

export const getProductOrNull = cache(
  async (id: number): Promise<Product | null> => {
    if (!Number.isSafeInteger(id) || id < 1) {
      return null;
    }

    try {
      return await getProduct(id);
    } catch {
      return null;
    }
  }
);

export const getCategories = cache(async (): Promise<string[]> => {
  const response = await fetch(
    `${API_URL}/products/categories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Array<{slug: string}> = await response.json();

  return data.map((category) => category.slug);
});

export const getProductsByCategory = cache(
  async (slug: string): Promise<Product[]> => {
    const response = await fetch(
      `${API_URL}/products/category/${slug}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }

    const data: DummyJsonProductsResponse =
      await response.json();

    return data.products.map(mapProduct);
  }
);

export const searchProducts = cache(
  async (query: string): Promise<Product[]> => {
    const trimmed = query.trim();
    if (!trimmed) {
      return getProducts();
    }

    const response = await fetch(
      `${API_URL}/products/search?q=${encodeURIComponent(trimmed)}`
    );

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    const data: DummyJsonProductsResponse =
      await response.json();

    return data.products.map(mapProduct);
  }
);
