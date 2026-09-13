"use client";

import Image from "next/image";
import {useFormatter, useTranslations} from "next-intl";

import {Link} from "@/i18n/routing";
import {useCartStore} from "@/store/cartStore";
import {useWishlistStore} from "@/store/wishlistStore";
import type {Product} from "@/types/product";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const t = useTranslations("productCard");
  const format = useFormatter();

  const addToCart = useCartStore((state) => state.addToCart);

  const addToWishlist = useWishlistStore(
    (state) => state.addToWishlist
  );

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const isInWishlist = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );

  const oldPrice =
    product.discountPercentage > 0 &&
    product.discountPercentage < 100
      ? product.price /
        (1 - product.discountPercentage / 100)
      : null;

  const rating = Number.isFinite(product.rating)
    ? product.rating
    : 0;

  const reviews = Array.isArray(product.reviews)
    ? product.reviews
    : [];

  const roundedRating = Math.round(rating);

  const currentPrice = format.number(product.price, {
    style: "currency",
    currency: "USD",
  });

  const formattedOldPrice = oldPrice
    ? format.number(oldPrice, {
        style: "currency",
        currency: "USD",
      })
    : null;

  return (
    <article className={styles.card}>
      <div className={styles.imageArea}>
        {product.discountPercentage > 0 && (
          <span className={styles.discountBadge}>
            {t("discount", {
              discount: Math.round(product.discountPercentage),
            })}
          </span>
        )}

        <button
          type="button"
          className={
            isInWishlist
              ? `${styles.wishlistButton} ${styles.wishlistButtonActive}`
              : styles.wishlistButton
          }
          aria-label={t("addToWishlist", {title: product.title})}
          aria-pressed={isInWishlist}
          onClick={() => {
            if (isInWishlist) {
              removeFromWishlist(product.id);
              return;
            }

            addToWishlist(product);
          }}
        >
          <HeartIcon />
        </button>

        <Link
          href={`/product/${product.id}`}
          className={styles.imageLink}
        >
          <Image
            src={product.image}
            alt={product.title}
            width={220}
            height={180}
            className={styles.image}
          />
        </Link>

        <button
          type="button"
          className={styles.addToCartButton}
          onClick={() => addToCart(product)}
        >
          {t("addToCart")}
        </button>
      </div>

      <div className={styles.details}>
        <Link
          href={`/product/${product.id}`}
          className={styles.title}
        >
          {product.title}
        </Link>

        <div className={styles.prices}>
          <span className={styles.currentPrice}>
            {currentPrice}
          </span>

          {formattedOldPrice && (
            <span className={styles.oldPrice}>
              {formattedOldPrice}
            </span>
          )}
        </div>

        <div
          className={styles.rating}
          aria-label={t("ratingLabel", {
            rating: rating.toFixed(1),
          })}
        >
          <span className={styles.stars} aria-hidden="true">
            {Array.from({length: 5}, (_, index) => (
              <span
                key={index}
                className={
                  index < roundedRating
                    ? styles.starFilled
                    : styles.starEmpty
                }
              >
                ★
              </span>
            ))}
          </span>

          <span className={styles.reviewCount}>
            {t("reviews", {
              count: reviews.length,
            })}
          </span>
        </div>
      </div>
    </article>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
