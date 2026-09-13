"use client";

import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import {useTranslations} from "next-intl";

import {Link, useRouter} from "@/i18n/routing";
import {useCartStore} from "@/store/cartStore";
import {useWishlistStore} from "@/store/wishlistStore";
import type {Product} from "@/types/product";

import LanguageSwitcher from "./LanguageSwitcher";
import AccountDropdown from "@/components/auth/account-dropdown/AccountDropdown";
import styles from "./Header.module.css";

type DummyJsonSearchItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  reviews?: unknown[];
  images?: string[];
  stock: number;
  availabilityStatus: string;
};

export default function Header() {
  const t = useTranslations("header");
  const router = useRouter();

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const wishlistCount = wishlistItems.length;

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search for instant dropdown preview
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setIsDropdownOpen(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(trimmed)}&limit=5`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(
            data.products.map((item: DummyJsonSearchItem) => ({
              id: item.id,
              title: item.title,
              price: item.price,
              description: item.description,
              category: item.category,
              image: item.thumbnail,
              discountPercentage: item.discountPercentage,
              rating: item.rating,
              reviews: item.reviews || [],
              images: item.images || [],
              stock: item.stock,
              availabilityStatus: item.availabilityStatus,
            }))
          );
        }
      } catch {
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setIsDropdownOpen(false);
      router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(`/shop`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.announcement}>
        <div className={`container ${styles.announcementInner}`}>
          <p className={styles.announcementText}>
            {t("announcement")}{" "}
            <Link href="/" className={styles.announcementLink}>
              {t("shopNow")}
            </Link>
          </p>

          <LanguageSwitcher />
        </div>
      </div>

      <div className={styles.main}>
        <div className={`container ${styles.mainInner}`}>
          <nav className={styles.navigation} aria-label="Main navigation">
            <Link href="/" className={styles.brand}>
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
              <div className={styles.searchField} ref={searchContainerRef}>
                <form onSubmit={handleSearchSubmit}>
                  <input
                    className={styles.searchInput}
                    type="search"
                    value={query}
                    onChange={(e) => {
                      const value = e.target.value;
                      setQuery(value);
                      if (!value.trim()) {
                        setSearchResults([]);
                        setIsDropdownOpen(false);
                        setIsLoading(false);
                      }
                    }}
                    onFocus={() => query.trim() && setIsDropdownOpen(true)}
                    placeholder={t("searchPlaceholder")}
                    aria-label={t("searchPlaceholder")}
                  />

                  <button
                    type="submit"
                    className={styles.searchButton}
                    aria-label="Submit search"
                  >
                    <SearchIcon className={styles.icon} />
                  </button>
                </form>

                {isDropdownOpen && (
                  <div className={styles.searchDropdown}>
                    {isLoading ? (
                      <div className={styles.searchStatus}>
                        {t("searching")}
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className={styles.searchItem}
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Image
                              src={product.image}
                              alt={product.title}
                              width={44}
                              height={44}
                              className={styles.searchItemImage}
                            />
                            <div className={styles.searchItemInfo}>
                              <p className={styles.searchItemTitle}>
                                {product.title}
                              </p>
                              <span className={styles.searchItemPrice}>
                                ${product.price}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href={`/shop?q=${encodeURIComponent(query.trim())}`}
                          className={styles.searchViewAll}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {t("viewAllResults")}
                        </Link>
                      </>
                    ) : (
                      <div className={styles.searchStatus}>
                        {t("searchNoResults")}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link
                href="/wishlist"
                className={styles.iconLink}
                aria-label={`${t("wishlist")} (${wishlistCount})`}
              >
                <HeartIcon className={styles.icon} />

                <span className={styles.count}>{wishlistCount}</span>

                <span className={styles.srOnly}>{t("wishlist")}</span>
              </Link>

              <Link
                href="/cart"
                className={styles.iconLink}
                aria-label={`${t("cart")} (${cartCount})`}
              >
                <CartIcon className={styles.icon} />

                <span className={styles.count}>{cartCount}</span>

                <span className={styles.srOnly}>{t("cart")}</span>
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
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
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
