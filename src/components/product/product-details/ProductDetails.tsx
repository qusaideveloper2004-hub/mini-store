import ProductCard from "@/components/product/product-card/ProductCard";
import {Link} from "@/i18n/routing";
import type {Product} from "@/types/product";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import styles from "./ProductDetails.module.css";

type ProductDetailsProps = {
  product: Product;
  relatedProducts: Product[];
  homeLabel: string;
  categoryLabel: string;
  relatedItemsLabel: string;
};

export default function ProductDetails({
  product,
  relatedProducts,
  homeLabel,
  categoryLabel,
  relatedItemsLabel,
}: ProductDetailsProps) {
  return (
    <main className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>
            {homeLabel}
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href={`/category/${product.category}`}
            className={styles.breadcrumbLink}
          >
            {categoryLabel}
          </Link>

          <span aria-hidden="true">/</span>

          <span className={styles.currentBreadcrumb}>{product.title}</span>
        </nav>

        <section className={styles.productSection}>
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </section>

        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeading}>
              <span className={styles.relatedMarker} />

              <h2>{relatedItemsLabel}</h2>
            </div>

            <div className={styles.relatedGrid}>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
