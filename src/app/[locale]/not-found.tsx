import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/routing';

import styles from './NotFoundPage.module.css';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.content}>
          <p
            className={styles.code}
            aria-hidden="true"
          >
            404
          </p>

          <h1>{t('title')}</h1>

          <p className={styles.description}>
            {t('description')}
          </p>

          <Link
            href="/"
            className={styles.homeButton}
          >
            {t('backToHome')}
          </Link>
        </section>
      </div>
    </main>
  );
}