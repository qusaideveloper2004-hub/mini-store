'use client';

import Image from 'next/image';
import {useFormatter, useTranslations} from 'next-intl';

import type {
  ReturnRequest,
  ReturnStatus,
} from '@/types/return';

import styles from './ReturnCard.module.css';

type ReturnCardProps = {
  returnRequest: ReturnRequest;
};

export default function ReturnCard({
  returnRequest,
}: ReturnCardProps) {
  const t = useTranslations('account');
  const format = useFormatter();

  const formattedDate = format.dateTime(
    new Date(returnRequest.date),
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  const formattedItemPrice = format.number(
    returnRequest.item.price,
    {
      style: 'currency',
      currency: 'USD',
    }
  );

  const formattedTotal = format.number(
    returnRequest.item.price * returnRequest.quantity,
    {
      style: 'currency',
      currency: 'USD',
    }
  );

  const statusLabels: Record<ReturnStatus, string> = {
    requested: t('returnStatusRequested'),
    approved: t('returnStatusApproved'),
    rejected: t('returnStatusRejected'),
    completed: t('returnStatusCompleted'),
  };

  const reasonLabels: Record<string, string> = {
    'wrong-size': t('wrongSize'),
    'wrong-product': t('wrongProduct'),
    damaged: t('damagedProduct'),
    'not-needed': t('notNeeded'),
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2>
            {t('returnNumber')} #{returnRequest.id}
          </h2>

          <p>
            {t('orderNumber')} #{returnRequest.orderId}
          </p>

          <p>
            {t('requestDate')}: {formattedDate}
          </p>
        </div>

        <span
          className={`${styles.status} ${
            styles[returnRequest.status]
          }`}
        >
          {statusLabels[returnRequest.status]}
        </span>
      </header>

      <div className={styles.product}>
        <div className={styles.imageSurface}>
          <Image
            src={returnRequest.item.image}
            alt={returnRequest.item.title}
            width={112}
            height={112}
            className={styles.image}
          />
        </div>

        <div className={styles.productInfo}>
          <h3>{returnRequest.item.title}</h3>

          <p>
            {t('quantity')}: {returnRequest.quantity}
          </p>

          <p>
            {t('returnReason')}:{' '}
            {reasonLabels[returnRequest.reason] ??
              returnRequest.reason}
          </p>
        </div>

        <div className={styles.prices}>
          <p>
            {t('price')}: {formattedItemPrice}
          </p>

          <strong>
            {t('total')}: {formattedTotal}
          </strong>
        </div>
      </div>
    </article>
  );
}