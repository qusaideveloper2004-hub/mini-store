'use client';

import Image from 'next/image';
import {
  useFormatter,
  useTranslations,
} from 'next-intl';

import type {
  Order,
  OrderStatus,
} from '@/types/order';

import RequestReturnButton from '@/components/account/returns/RequestReturnButton';
import CancelOrderButton from '@/components/account/cancellations/CancelOrderButton';

import styles from './OrderCard.module.css';

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({
  order,
}: OrderCardProps) {
  const t = useTranslations('account');

  const format = useFormatter();

  const formattedDate = format.dateTime(
    new Date(order.date),
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  const formattedTotal = format.number(order.total, {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2>
            {t('orderNumber')} #{order.id}
          </h2>

          <p>
            {t('orderDate')}: {formattedDate}
          </p>
        </div>

        <span
          className={`${styles.status} ${getStatusClass(
            order.status
          )}`}
        >
          {t(`orderStatuses.${order.status}`)}
        </span>
      </header>

      <div className={styles.items}>
        {order.items.map((item) => {
          const formattedSubtotal = format.number(
            item.subtotal,
            {
              style: 'currency',
              currency: 'USD',
            }
          );

          return (
            <article
              key={item.productId}
              className={styles.item}
            >
              <div className={styles.product}>
                <div className={styles.imageSurface}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className={styles.image}
                  />
                </div>

                <div className={styles.productInfo}>
                  <h3>{item.title}</h3>

                  <p>
                    {t('quantity')}: {item.quantity}
                  </p>
                </div>
              </div>

              <p className={styles.itemPrice}>
                {formattedSubtotal}
              </p>
            </article>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <strong>
          {t('total')}: {formattedTotal}
        </strong>

        <div className={styles.actions}>
          {order.status === 'delivered' && (
            <RequestReturnButton order={order} />
          )}

          <CancelOrderButton order={order} />
        </div>
      </footer>
    </article>
  );
}

function getStatusClass(status: OrderStatus) {
  const statusClasses: Record<OrderStatus, string> = {
    pending: styles.pending,
    processing: styles.processing,
    shipped: styles.shipped,
    delivered: styles.delivered,
    cancelled: styles.cancelled,
  };

  return statusClasses[status];
}
