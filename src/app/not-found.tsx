import Link from 'next/link';

import styles from './[locale]/NotFoundPage.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.content}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>

          <h1>Page Not Found</h1>

          <p className={styles.description}>
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>

          <Link href="/" className={styles.homeButton}>
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
