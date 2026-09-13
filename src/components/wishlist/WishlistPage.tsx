'use client';

import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/routing';
import ProductCard from '@/components/product/product-card/ProductCard';
import {useWishlistStore} from '@/store/wishlistStore';

import styles from './WishlistPage.module.css';

export default function WishlistPage() {
  const t = useTranslations('wishlistPage');

  const items = useWishlistStore((state) => state.items);

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className="container">
          <nav
            className={styles.breadcrumbs}
            aria-label={t('breadcrumbLabel')}
          >
            <Link href="/">
              {t('home')}
            </Link>

            <span aria-hidden="true">/</span>

            <span>{t('title')}</span>
          </nav>

          <section className={styles.emptyState}>
            <HeartIcon />

            <h1>{t('emptyTitle')}</h1>

            <p>{t('emptyDescription')}</p>

            <Link
              href="/shop"
              className={styles.shopButton}
            >
              {t('continueShopping')}
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <nav
          className={styles.breadcrumbs}
          aria-label={t('breadcrumbLabel')}
        >
          <Link href="/">
            {t('home')}
          </Link>

          <span aria-hidden="true">/</span>

          <span>{t('title')}</span>
        </nav>

        <header className={styles.heading}>
          <h1>{t('title')}</h1>

          <p>
            {t('savedItems', {
              count: items.length,
            })}
          </p>
        </header>

        <section
          className={styles.productGrid}
          aria-label={t('productListLabel')}
        >
          {items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

function HeartIcon() {
  return (
    <svg
      className={styles.emptyIcon}
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