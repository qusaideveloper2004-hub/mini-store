import {useTranslations} from "next-intl";

import ProductCard from "@/components/product/product-card/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import {Link} from "@/i18n/routing";
import type {Product} from "@/types/product";

import styles from "./BestSellingSection.module.css";

type BestSellingSectionProps = {
  products: Product[];
};

export default function BestSellingSection({
  products,
}: BestSellingSectionProps) {
  const t = useTranslations("homePage.bestSelling");

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          endContent={
            <Link
              href="/shop"
              className={styles.viewAllButton}
            >
              {t("viewAll")}
            </Link>
          }
        />

        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}