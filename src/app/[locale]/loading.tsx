'use client';

import {useTranslations} from 'next-intl';

export default function Loading() {
  const t = useTranslations('loading');

  return (
    <main>
      <section
        aria-busy="true"
        aria-live="polite"
      >
        <p>{t('message')}</p>
      </section>
    </main>
  );
}