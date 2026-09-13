"use client";

import Image from "next/image";
import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";

import type {Product} from "@/types/product";

import styles from "./ProductGallery.module.css";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({product}: ProductGalleryProps) {
  const t = useTranslations("productDetails");
  const images = useMemo(
    () => Array.from(new Set([product.image, ...product.images])),
    [product.image, product.images]
  );
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => {
          const isSelected = image === selectedImage;

          return (
            <button
              key={image}
              type="button"
              className={
                isSelected
                  ? `${styles.thumbnail} ${styles.thumbnailActive}`
                  : styles.thumbnail
              }
              aria-label={t("viewImage", {number: index + 1})}
              aria-pressed={isSelected}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 768px) 5rem, 7rem"
                className={styles.thumbnailImage}
              />
            </button>
          );
        })}
      </div>

      <div className={styles.mainImageArea}>
        <Image
          key={selectedImage}
          src={selectedImage}
          alt={product.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className={styles.mainImage}
        />
      </div>
    </div>
  );
}
