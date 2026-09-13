'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

import {Link} from '@/i18n/routing';
import {useAuthStore} from '@/store/authStore';

export default function AccountDropdown() {
  const t = useTranslations('account');

  const [isOpen, setIsOpen] =
    useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {user
          ? `${user.firstName}`
          : t('account')}
      </button>

      {isOpen && (
        <div role="menu">
          {!user ? (
            <>
              <Link
                href="/login"
                role="menuitem"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                {t('login')}
              </Link>

              <Link
                href="/signup"
                role="menuitem"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                {t('signUp')}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/account"
                role="menuitem"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                {t('myProfile')}
              </Link>

              <Link
                href="/account/orders"
                role="menuitem"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                {t('orders')}
              </Link>

              <Link
                href="/wishlist"
                role="menuitem"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                {t('wishlist')}
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
              >
                {t('logout')}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}