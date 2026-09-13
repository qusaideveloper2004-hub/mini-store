"use client";

import {useTranslations} from "next-intl";

import {Link} from "@/i18n/routing";
import {useCartStore} from "@/store/cartStore";
import {useWishlistStore} from "@/store/wishlistStore";

import LanguageSwitcher from "./LanguageSwitcher";
import AccountDropdown from "@/components/auth/account-dropdown/AccountDropdown";
import styles from "./Header.module.css";

export default function Header() {
  const t = useTranslations("header");

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  return (
    <header className={styles.header}>
      <div className={styles.announcement}>
        <div className={`container ${styles.announcementInner}`}>
          <p className={styles.announcementText}>
            {t("announcement")}{" "}
            <Link
              href="/"
              className={styles.announcementLink}
            >
              {t("shopNow")}
            </Link>
          </p>

          <LanguageSwitcher />
        </div>
      </div>

      <div className={styles.main}>
        <div className={`container ${styles.mainInner}`}>
          <nav
            className={styles.navigation}
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className={styles.brand}
            >
              {t("brand")}
            </Link>

            <div className={styles.navLinks}>
              <Link href="/" className={styles.navLink}>
                {t("home")}
              </Link>

              <Link href="/contact" className={styles.navLink}>
                {t("contact")}
              </Link>

              <Link href="/about" className={styles.navLink}>
                {t("about")}
              </Link>

              <Link href="/signup" className={styles.navLink}>
                {t("signUp")}
              </Link>
            </div>

            <div className={styles.actions}>
              <div className={styles.searchField}>
                <input
                  className={styles.searchInput}
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                />

                <SearchIcon className={styles.searchIcon} />
              </div>

              <Link
                href="/wishlist"
                className={styles.iconLink}
                aria-label={`${t("wishlist")} (${wishlistCount})`}
              >
                <HeartIcon className={styles.icon} />

                <span className={styles.count}>
                  {wishlistCount}
                </span>

                <span className={styles.srOnly}>
                  {t("wishlist")}
                </span>
              </Link>

              <Link
                href="/cart"
                className={styles.iconLink}
                aria-label={`${t("cart")} (${cartCount})`}
              >
                <CartIcon className={styles.icon} />

                <span className={styles.count}>
                  {cartCount}
                </span>

                <span className={styles.srOnly}>
                  {t("cart")}
                </span>
              </Link>

              <div className={styles.accountDropdown}>
                <AccountDropdown />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

type IconProps = {
  className?: string;
};

function SearchIcon({className}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon({className}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon({className}: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="10" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}
