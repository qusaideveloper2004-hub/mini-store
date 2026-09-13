'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

import type {Order} from '@/types/order';

import CancellationForm from './CancellationForm';
import styles from './CancelOrderButton.module.css';

type CancelOrderButtonProps = {
  order: Order;
};

export default function CancelOrderButton({order}: CancelOrderButtonProps) {
  const t = useTranslations('account');
  const [isOpen, setIsOpen] = useState(false);
  const canCancel =
    order.status === 'pending' || order.status === 'processing';

  if (!canCancel) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        {isOpen ? t('closeCancellationForm') : t('cancelOrder')}
      </button>

      {isOpen && <CancellationForm order={order} />}
    </div>
  );
}
