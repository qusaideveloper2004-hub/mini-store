'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

import type {Order} from '@/types/order';

import ReturnForm from './ReturnForm';
import styles from './RequestReturnButton.module.css';

type RequestReturnButtonProps = {
  order: Order;
};

export default function RequestReturnButton({
  order,
}: RequestReturnButtonProps) {
  const t = useTranslations('account');

  const [isOpen, setIsOpen] = useState(false);

  function toggleForm() {
    setIsOpen((currentValue) => !currentValue);
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        aria-expanded={isOpen}
        onClick={toggleForm}
      >
        {isOpen
          ? t('closeReturnForm')
          : t('requestReturn')}
      </button>

      {isOpen && <ReturnForm order={order} />}
    </div>
  );
}