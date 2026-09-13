'use client';

import {useTranslations} from 'next-intl';

import {usePaymentStore} from '@/store/paymentStore';

import styles from './PaymentList.module.css';

export default function PaymentList() {
  const t = useTranslations('account');

  const payments = usePaymentStore(
    (state) => state.payments
  );

  const deletePayment = usePaymentStore(
    (state) => state.deletePayment
  );

  const setDefaultPayment = usePaymentStore(
    (state) => state.setDefaultPayment
  );

  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <h1>{t('savedPaymentMethods')}</h1>
      </header>

      {payments.length === 0 ? (
        <div className={styles.emptyState}>
          <CardIcon />

          <p>{t('noPaymentMethods')}</p>
        </div>
      ) : (
        <div className={styles.paymentGrid}>
          {payments.map((payment) => (
            <article
              key={payment.id}
              className={
                payment.isDefault
                  ? `${styles.card} ${styles.defaultCard}`
                  : styles.card
              }
            >
              <div className={styles.cardHeader}>
                <span className={styles.brand}>
                  {payment.brand}
                </span>

                {payment.isDefault ? (
                  <span className={styles.defaultBadge}>
                    {t('defaultPayment')}
                  </span>
                ) : null}
              </div>

              <p className={styles.cardNumber}>
                •••• •••• •••• {payment.last4}
              </p>

              <div className={styles.cardDetails}>
                <p>{payment.cardholderName}</p>

                <p>
                  {payment.expiryMonth}/
                  {payment.expiryYear}
                </p>
              </div>

              <div className={styles.actions}>
                {!payment.isDefault ? (
                  <button
                    type="button"
                    className={styles.defaultButton}
                    onClick={() =>
                      setDefaultPayment(payment.id)
                    }
                  >
                    {t('makeDefaultPayment')}
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() =>
                    deletePayment(payment.id)
                  }
                >
                  {t('deletePayment')}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function CardIcon() {
  return (
    <svg
      className={styles.emptyIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3 10h18"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7 15h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}