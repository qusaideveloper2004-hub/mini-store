"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";

import ProductCard from "@/components/product/product-card/ProductCard";
import CarouselControls from "@/components/ui/carousel-controls/CarouselControls";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import {Link} from "@/i18n/routing";
import type {Product} from "@/types/product";

import styles from "./ExploreProductsSection.module.css";

type ExploreProductsSectionProps = {
  products: Product[];
};

const PRODUCTS_PER_PAGE = 8;

export default function ExploreProductsSection({
  products,
}: ExploreProductsSectionProps) {
  const t = useTranslations("homePage.exploreProducts");

  const [startIndex, setStartIndex] = useState(0);

  const visibleProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  function showNextProducts() {
    setStartIndex((currentIndex) => {
      const nextIndex = currentIndex + PRODUCTS_PER_PAGE;

      return nextIndex >= products.length ? 0 : nextIndex;
    });
  }

  function showPreviousProducts() {
    setStartIndex((currentIndex) => {
      if (currentIndex === 0) {
        return (
          Math.floor((products.length - 1) / PRODUCTS_PER_PAGE) *
          PRODUCTS_PER_PAGE
        );
      }

      return currentIndex - PRODUCTS_PER_PAGE;
    });
  }



  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          endContent={
            <CarouselControls
              previousLabel={t("previousProducts")}
              nextLabel={t("nextProducts")}
              onPrevious={showPreviousProducts}
              onNext={showNextProducts}
            />
          }
        />

        <div className={styles.products}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className={styles.viewAllWrapper}>
          <Link
            href="/shop"
            className={styles.viewAllButton}
          >
            {t("viewAllProducts")}
          </Link>
        </div>
      </div>
    </section>
  );
}