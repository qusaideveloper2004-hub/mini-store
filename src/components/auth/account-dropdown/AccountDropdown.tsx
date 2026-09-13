'use client';

import {useState} from 'react';
import {useAuthStore} from '@/store/authStore';
import {Link} from '@/i18n/routing';

import styles from './AccountDropdown.module.css';

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  if (!user) {
    return (
      <Link href="/login">
        Log In
      </Link>
    );
  }

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.trigger}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <UserIcon />
        <span>{user.firstName}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <DropdownLink href="/account" icon={<UserIcon />}>
            Manage My Account
          </DropdownLink>
          <DropdownLink href="/account/orders" icon={<OrderIcon />}>
            My Orders
          </DropdownLink>
          <DropdownLink href="/account/cancellations" icon={<CancelIcon />}>
            My Cancellations
          </DropdownLink>
          <DropdownLink href="/wishlist" icon={<WishlistIcon />}>
            My Wishlist
          </DropdownLink>
          <button
            className={styles.menuItem}
            type="button"
            role="menuitem"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

type DropdownLinkProps = {
  href: '/account' | '/account/orders' | '/account/cancellations' | '/wishlist';
  icon: React.ReactNode;
  children: React.ReactNode;
};

function DropdownLink({href, icon, children}: DropdownLinkProps) {
  return (
    <Link href={href} className={styles.menuItem} role="menuitem">
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg>;
}

function OrderIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14v12H5zM8 8V5h8v3" /></svg>;
}

function CancelIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m9 9 6 6m0-6-6 6" /></svg>;
}

function WishlistIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 20-1.4-1.3C5.6 14.1 3 11.7 3 8.7A4.7 4.7 0 0 1 7.7 4c1.7 0 3.3.8 4.3 2.1C13 4.8 14.6 4 16.3 4A4.7 4.7 0 0 1 21 8.7c0 3-2.6 5.4-7.6 10L12 20Z" /></svg>;
}

function LogoutIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v14h-5M11 12h9M15 8l-3 4 3 4M5 5h5M5 19h5" /></svg>;
}

function ChevronIcon({isOpen}: {isOpen: boolean}) {
  return <svg className={isOpen ? styles.chevronOpen : styles.chevron} viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>;
}