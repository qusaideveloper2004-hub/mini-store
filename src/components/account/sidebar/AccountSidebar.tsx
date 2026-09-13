'use client';

import {useTranslations} from 'next-intl';

import {
  Link,
  usePathname,
} from '@/i18n/routing';

import styles from './AccountSidebar.module.css';

export default function AccountSidebar() {
  const t = useTranslations('account');

  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <AccountNavGroup
        title={t('manageAccount')}
      >
        <AccountNavLink
          href="/account"
          isActive={pathname === '/account'}
        >
          {t('myProfile')}
        </AccountNavLink>

        <AccountNavLink
          href="/account/address"
          isActive={pathname === '/account/address'}
        >
          {t('addressBook')}
        </AccountNavLink>

        <AccountNavLink
          href="/account/payment"
          isActive={pathname === '/account/payment'}
        >
          {t('paymentOptions')}
        </AccountNavLink>
      </AccountNavGroup>

      <AccountNavGroup
        title={t('myOrders')}
      >
        <AccountNavLink
          href="/account/orders"
          isActive={pathname === '/account/orders'}
        >
          {t('orders')}
        </AccountNavLink>

        <AccountNavLink
          href="/account/returns"
          isActive={pathname === '/account/returns'}
        >
          {t('returns')}
        </AccountNavLink>

        <AccountNavLink
          href="/account/cancellations"
          isActive={pathname === '/account/cancellations'}
        >
          {t('cancellations')}
        </AccountNavLink>
      </AccountNavGroup>

      <AccountNavLink
        href="/wishlist"
        isActive={pathname === '/wishlist'}
      >
        {t('wishlist')}
      </AccountNavLink>
    </aside>
  );
}

type AccountNavGroupProps = {
  title: string;
  children: React.ReactNode;
};

function AccountNavGroup({
  title,
  children,
}: AccountNavGroupProps) {
  return (
    <section className={styles.group}>
      <h2>{title}</h2>

      <nav className={styles.navigation}>
        {children}
      </nav>
    </section>
  );
}

type AccountNavLinkProps = {
  href:
    | '/account'
    | '/account/address'
    | '/account/payment'
    | '/account/orders'
    | '/account/returns'
    | '/account/cancellations'
    | '/wishlist';
  isActive: boolean;
  children: React.ReactNode;
};

function AccountNavLink({
  href,
  isActive,
  children,
}: AccountNavLinkProps) {
  return (
    <Link
      href={href}
      className={
        isActive
          ? `${styles.link} ${styles.activeLink}`
          : styles.link
      }
    >
      {children}
    </Link>
  );
}