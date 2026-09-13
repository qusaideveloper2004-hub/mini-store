import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import ProductCard from "@/components/product/product-card/ProductCard";
import {getProducts} from "@/lib/product/data";
import {localeFrom, pageMetadata} from "@/lib/seo";

import styles from "./ShopPage.module.css";

type ShopPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(localeFrom(locale), "shop", "shop", true);
}

export default async function ShopPage() {
  const [t, products] = await Promise.all([
    getTranslations("shopPage"),
    getProducts(),
  ]);

  return (
    <main className="container">
      <section className={styles.section}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>

          <p className={styles.description}>{t("description")}</p>
        </header>

        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
