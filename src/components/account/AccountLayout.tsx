import {Link} from '@/i18n/routing';

import AccountSidebar from './sidebar/AccountSidebar';

import styles from './AccountLayout.module.css';

type AccountLayoutProps = {
  children: React.ReactNode;
  homeLabel: string;
  accountLabel: string;
  pageTitle: string;
  breadcrumbLabel: string;
};

export default function AccountLayout({
  children,
  homeLabel,
  accountLabel,
  pageTitle,
  breadcrumbLabel,
}: AccountLayoutProps) {
  return (
    <main className={styles.page}>
      <div className="container">
        <nav
          className={styles.breadcrumbs}
          aria-label={breadcrumbLabel}
        >
          <Link href="/">
            {homeLabel}
          </Link>

          <span aria-hidden="true">/</span>

          <span>{accountLabel}</span>

          <span aria-hidden="true">/</span>

          <span>{pageTitle}</span>
        </nav>

        <div className={styles.content}>
          <AccountSidebar />

          <section className={styles.pageContent}>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}