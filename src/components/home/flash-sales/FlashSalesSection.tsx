"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";

import ProductCard from "@/components/product/product-card/ProductCard";
import CarouselControls from "@/components/ui/carousel-controls/CarouselControls";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import {Link} from "@/i18n/routing";
import type {Product} from "@/types/product";

import Countdown from "./Countdown";
import styles from "./FlashSalesSection.module.css";

type FlashSalesSectionProps = {
  products: Product[];
};

export default function FlashSalesSection({
  products,
}: FlashSalesSectionProps) {
  const t = useTranslations("homePage.flashSales");

  const productsRef = useRef<HTMLDivElement>(null);

  // function scrollProducts(direction: 1 | -1) {
  //   const productsElement = productsRef.current;

  //   if (!productsElement) {
  //     return;
  //   }

  //   productsElement.scrollBy({
  //     left: productsElement.clientWidth * 0.9 * direction,
  //     behavior: "smooth",
  //   });
  // }

// انا هنا عدلت حركه الاسهم عشان تكون اسموزي شويه 
  function scrollProducts(direction: 1 | -1) {
  const productsElement = productsRef.current;
  if (!productsElement) return;

  const isRtl = document.documentElement.dir === "rtl";
  const multiplier = isRtl ? -direction : direction;

  productsElement.scrollBy({
    left: productsElement.clientWidth * 0.9 * multiplier,
    behavior: "smooth",
  });
}

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          afterTitle={<Countdown />}
          endContent={
            <CarouselControls
              previousLabel={t("previousProducts")}
              nextLabel={t("nextProducts")}
              onPrevious={() => scrollProducts(-1)}
              onNext={() => scrollProducts(1)}
            />
          }
        />

        <div
          ref={productsRef}
          className={styles.products}
          aria-label={t("title")}
        >
          {products.map((product) => (
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
