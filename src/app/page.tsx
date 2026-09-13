import Image from 'next/image';
import Link from 'next/link';

import styles from './LandingPage.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.backgroundShape} aria-hidden="true" />

      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          Mini Store
        </Link>

        <Link href="/ar" className={styles.languageLink}>
          AR
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>WELCOME TO MINI STORE</p>

          <h1>Everything you want, in one place.</h1>

          <p className={styles.description}>
            Discover a simple, smooth shopping experience built around the
            products you love.
          </p>

          <Link href="/en" className={styles.enterButton}>
            Enter the E-commerce
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/home/hero-iphone2.jpg"
              alt="Featured Mini Store product"
              fill
              priority
              sizes="(max-width: 768px) 88vw, 52vw"
              className={styles.image}
            />
          </div>

          <p className={styles.visualLabel}>CURATED FOR EVERYDAY LIFE</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>SHOP WITH CONFIDENCE</span>
        <span>EN / AR</span>
      </footer>
    </main>
  );
}
