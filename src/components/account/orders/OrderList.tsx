'use client';

import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/routing';
import {useOrderStore} from '@/store/orderStore';

import OrderCard from './OrderCard';

import styles from './OrderList.module.css';

export default function OrderList() {
  const t = useTranslations('account');

  const orders = useOrderStore(
    (state) => state.orders
  );

  if (orders.length === 0) {
    return (
      <section className={styles.section}>
        <h1>{t('orders')}</h1>

        <div className={styles.emptyState}>
          <PackageIcon />

          <p>{t('noOrders')}</p>

          <Link
            href="/shop"
            className={styles.shopButton}
          >
            {t('continueShopping')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h1>{t('orders')}</h1>

      <div className={styles.orderList}>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </section>
  );
}

function PackageIcon() {
  return (
    <svg
      className={styles.emptyIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="m4.5 7.8 7.5 4.2 7.5-4.2M12 12v9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}