'use client';

import {useTranslations} from 'next-intl';

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  const t = useTranslations('error');

  return (
    <main>
      <section>
        <h1>{t('title')}</h1>

        <p>{t('description')}</p>

        <button
          type="button"
          onClick={() => reset()}
        >
          {t('tryAgain')}
        </button>
      </section>
    </main>
  );
}