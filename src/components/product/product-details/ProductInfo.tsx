"use client";

import {useState} from "react";
import {useFormatter, useTranslations} from "next-intl";

import {useRouter} from "@/i18n/routing";
import {useCartStore} from "@/store/cartStore";
import {useWishlistStore} from "@/store/wishlistStore";
import type {Product} from "@/types/product";
import QuantitySelector from "@/components/ui/quantity-selector/QuantitySelector";

import DeliveryInfo from "./DeliveryInfo";
import styles from "./ProductInfo.module.css";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({product}: ProductInfoProps) {
  const t = useTranslations("productDetails");
  const format = useFormatter();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const isInWishlist = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );

  const isInStock = product.stock > 0;
  const roundedRating = Math.round(product.rating);
  const oldPrice = product.discountPercentage > 0 && product.discountPercentage < 100
    ? product.price / (1 - product.discountPercentage / 100)
    : null;
  const currentPrice = format.number(product.price, {
    style: "currency",
    currency: "USD",
  });
  const formattedOldPrice = oldPrice
    ? format.number(oldPrice, {style: "currency", currency: "USD"})
    : null;

  function addSelectedQuantityToCart() {
    if (isInStock) {
      addToCart(product, quantity);
    }
  }

  function buyNow() {
    addSelectedQuantityToCart();

    if (isInStock) {
      router.push("/checkout");
    }
  }

  return (
    <section className={styles.info}>
      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.meta}>
        <div
          className={styles.rating}
          aria-label={`${product.rating.toFixed(1)} out of 5`}
        >
          <span className={styles.stars} aria-hidden="true">
            {Array.from({length: 5}, (_, index) => (
              <span
                key={index}
                className={index < roundedRating ? styles.starFilled : styles.starEmpty}
              >
                ★
              </span>
            ))}
          </span>

          <span className={styles.reviews}>
            {t("reviews", {count: product.reviews.length})}
          </span>
        </div>

        <span className={styles.metaDivider} aria-hidden="true" />

        <span className={isInStock ? styles.inStock : styles.outOfStock}>
          {isInStock ? t("inStock") : t("outOfStock")}
        </span>
      </div>

      <div className={styles.priceRow}>
        <span className={styles.price}>{currentPrice}</span>

        {formattedOldPrice && <span className={styles.oldPrice}>{formattedOldPrice}</span>}
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.separator} />

      <div className={styles.purchaseRow}>
        <QuantitySelector
          quantity={quantity}
          decreaseLabel={t("decreaseQuantity")}
          increaseLabel={t("increaseQuantity")}
          decreaseDisabled={quantity <= 1 || !isInStock}
          increaseDisabled={quantity >= product.stock || !isInStock}
          onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
          onIncrease={() => setQuantity((current) => Math.min(product.stock, current + 1))}
        />

        <button
          type="button"
          className={styles.buyNowButton}
          disabled={!isInStock}
          onClick={buyNow}
        >
          {t("buyNow")}
        </button>

        <button
          type="button"
          className={
            isInWishlist
              ? `${styles.wishlistButton} ${styles.wishlistButtonActive}`
              : styles.wishlistButton
          }
          aria-label={
            isInWishlist
              ? t("removeFromWishlist", {title: product.title})
              : t("addToWishlist", {title: product.title})
          }
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
      </div>

      <button
        type="button"
        className={styles.addToCartButton}
        disabled={!isInStock}
        onClick={addSelectedQuantityToCart}
      >
        {t("addToCart")}
      </button>

      <div className={styles.deliveryWrapper}>
        <DeliveryInfo />
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
