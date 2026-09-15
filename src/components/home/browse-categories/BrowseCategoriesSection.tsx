"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";

import CategoryCard from "@/components/category/category-card/CategoryCard";
import CarouselControls from "@/components/ui/carousel-controls/CarouselControls";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import {browseCategories} from "@/data/browseCategories";

import styles from "./BrowseCategoriesSection.module.css";

export default function BrowseCategoriesSection() {
  const t = useTranslations("homePage.browseCategories");

  const categoriesRef = useRef<HTMLDivElement>(null);

  // function scrollCategories(direction: 1 | -1) {
  //   const categoriesElement = categoriesRef.current;

  //   if (!categoriesElement) {
  //     return;
  //   }

  //   categoriesElement.scrollBy({
  //     left: categoriesElement.clientWidth * 0.85 * direction,
  //     behavior: "smooth",
  //   });
  // }
  

// نفس النام دي داله عشان اخلي حركه الاسهم اسموزي 
    function scrollCategories(direction: 1 | -1) {
  const productsElement = categoriesRef.current;
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
          endContent={
            <CarouselControls
              previousLabel={t("previousCategories")}
              nextLabel={t("nextCategories")}
              onPrevious={() => scrollCategories(-1)}
              onNext={() => scrollCategories(1)}
            />
          }
        />

        <div
          ref={categoriesRef}
          className={styles.categories}
          aria-label={t("title")}
        >
          {browseCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              label={t(`items.${category.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}