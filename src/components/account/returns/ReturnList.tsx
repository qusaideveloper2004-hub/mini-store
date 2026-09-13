'use client';

import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/routing';
import {useReturnStore} from '@/store/returnStore';

import ReturnCard from './ReturnCard';
import styles from './ReturnList.module.css';

export default function ReturnList() {
  const t = useTranslations('account');

  const returns = useReturnStore(
    (state) => state.returns
  );

  if (returns.length === 0) {
    return (
      <section className={styles.section}>
        <h1 className={styles.title}>
          {t('returns')}
        </h1>

        <div className={styles.emptyState}>
          <svg
            className={styles.emptyIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M7 7h10v10H7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M9 3H5a2 2 0 0 0-2 2v4M3 5l3 3 3-3"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>

          <p>{t('noReturns')}</p>

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
      <h1 className={styles.title}>
        {t('returns')}
      </h1>

      <div className={styles.returnList}>
        {returns.map((returnRequest) => (
          <ReturnCard
            key={returnRequest.id}
            returnRequest={returnRequest}
          />
        ))}
      </div>
    </section>
  );
}