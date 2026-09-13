'use client';

import {useTranslations} from 'next-intl';

import {useAddressStore} from '@/store/addressStore';

import styles from './AddressList.module.css';

export default function AddressList() {
  const t = useTranslations('account');

  const addresses = useAddressStore(
    (state) => state.addresses
  );

  const deleteAddress = useAddressStore(
    (state) => state.deleteAddress
  );

  const setDefaultAddress = useAddressStore(
    (state) => state.setDefaultAddress
  );

  return (
    <section className={styles.section}>
      <header className={styles.heading}>
        <h1>{t('savedAddresses')}</h1>
      </header>

      {addresses.length === 0 ? (
        <div className={styles.emptyState}>
          <LocationIcon />

          <p>{t('noAddresses')}</p>
        </div>
      ) : (
        <div className={styles.addressGrid}>
          {addresses.map((address) => (
            <article
              key={address.id}
              className={
                address.isDefault
                  ? `${styles.card} ${styles.defaultCard}`
                  : styles.card
              }
            >
              <div className={styles.cardHeader}>
                <h2>
                  {address.firstName} {address.lastName}
                </h2>

                {address.isDefault ? (
                  <span className={styles.defaultBadge}>
                    {t('defaultAddress')}
                  </span>
                ) : null}
              </div>

              <address className={styles.addressDetails}>
                <p>{address.phone}</p>

                <p>{address.street}</p>

                <p>
                  {address.city}, {address.country}
                </p>

                <p>{address.postalCode}</p>
              </address>

              <div className={styles.actions}>
                {!address.isDefault ? (
                  <button
                    type="button"
                    className={styles.defaultButton}
                    onClick={() =>
                      setDefaultAddress(address.id)
                    }
                  >
                    {t('makeDefault')}
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() =>
                    deleteAddress(address.id)
                  }
                >
                  {t('delete')}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function LocationIcon() {
  return (
    <svg
      className={styles.emptyIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 21s6-5.3 6-11A6 6 0 1 0 6 10c0 5.7 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="10"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}