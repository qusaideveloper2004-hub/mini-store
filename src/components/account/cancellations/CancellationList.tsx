'use client';

import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/routing';
import {useCancellationStore} from '@/store/cancellationStore';

import CancellationCard from './CancellationCard';
import styles from './CancellationList.module.css';

export default function CancellationList() {
  const t = useTranslations('account');
  const cancellations = useCancellationStore((state) => state.cancellations);

  if (cancellations.length === 0) {
    return (
      <section className={styles.section}>
        <h1 className={styles.title}>{t('cancellations')}</h1>

        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <p>{t('noCancellations')}</p>
          <Link href="/shop" className={styles.shopButton}>
            {t('continueShopping')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{t('cancellations')}</h1>

      <div className={styles.cancellationList}>
        {cancellations.map((cancellation) => (
          <CancellationCard key={cancellation.id} cancellation={cancellation} />
        ))}
      </div>
    </section>
  );
}
