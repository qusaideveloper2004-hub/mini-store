import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

import ProductCard from "@/components/product/product-card/ProductCard";
import {Link} from "@/i18n/routing";
import {searchProducts} from "@/lib/product/data";
import {localeFrom, pageMetadata} from "@/lib/seo";

import styles from "./ShopPage.module.css";

type ShopPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata({
  params,
}: ShopPageProps): Promise<Metadata> {
  const {locale} = await params;

  return pageMetadata(localeFrom(locale), "shop", "shop", true);
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const {q} = await searchParams;
  const searchQuery = q?.trim() || "";

  const [t, products] = await Promise.all([
    getTranslations("shopPage"),
    searchProducts(searchQuery),
  ]);

  return (
    <main className="container">
      <section className={styles.section}>
        <header className={styles.header}>
          <div className={styles.searchHeader}>
            <div>
              <h1 className={styles.title}>
                {searchQuery
                  ? t("searchResults", {query: searchQuery})
                  : t("title")}
              </h1>

              <p className={styles.description}>
                {searchQuery
                  ? t("resultsCount", {count: products.length})
                  : t("description")}
              </p>
            </div>

            {searchQuery && (
              <Link href="/shop" className={styles.clearSearchBtn}>
                {t("clearSearch")}
              </Link>
            )}
          </div>
        </header>

        {products.length > 0 ? (
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>
              {t("noResults", {query: searchQuery})}
            </h2>

            <p className={styles.emptyDescription}>
              {t("noResultsDescription")}
            </p>

            <Link href="/shop" className={styles.clearSearchBtn}>
              {t("clearSearch")}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
