'use client';

import {useFormatter, useTranslations} from 'next-intl';

import type {
  CancellationRequest,
  CancellationStatus,
} from '@/types/cancellation';

import styles from './CancellationCard.module.css';

type CancellationCardProps = {
  cancellation: CancellationRequest;
};

export default function CancellationCard({
  cancellation,
}: CancellationCardProps) {
  const t = useTranslations('account');
  const format = useFormatter();
  const formattedDate = format.dateTime(new Date(cancellation.date), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const statusLabels: Record<CancellationStatus, string> = {
    requested: t('cancellationStatusRequested'),
    approved: t('cancellationStatusApproved'),
    rejected: t('cancellationStatusRejected'),
    completed: t('cancellationStatusCompleted'),
  };

  const reasonLabels: Record<string, string> = {
    'changed-my-mind': t('changedMyMind'),
    'ordered-by-mistake': t('orderedByMistake'),
    'found-better-price': t('foundBetterPrice'),
    'delivery-too-late': t('deliveryTooLate'),
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2>
            {t('cancellationNumber')} #{cancellation.id}
          </h2>
          <p>
            {t('orderNumber')} #{cancellation.orderId}
          </p>
          <p>
            {t('requestDate')}: {formattedDate}
          </p>
        </div>

        <span className={`${styles.status} ${styles[cancellation.status]}`}>
          {statusLabels[cancellation.status]}
        </span>
      </header>

      <div className={styles.reason}>
        <span>{t('cancellationReason')}</span>
        <strong>{reasonLabels[cancellation.reason] ?? cancellation.reason}</strong>
      </div>
    </article>
  );
}
