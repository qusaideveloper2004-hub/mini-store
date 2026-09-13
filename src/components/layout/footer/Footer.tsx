import Image from "next/image";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import {Link} from "@/i18n/routing";
import {siteConfig} from "@/lib/site";

import styles from "./Footer.module.css";

export default async function Footer() {
  const [t, header, locale] = await Promise.all([
    getTranslations("footer"),
    getTranslations("header"),
    getLocale(),
  ]);

  const address =
    locale === "ar"
      ? siteConfig.support.address.ar
      : siteConfig.support.address.en;

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          <section className={styles.subscription}>
            <Link href="/" className={styles.brand}>
              {header("brand")}
            </Link>

            <h2 className={styles.heading}>
              {t("subscribe")}
            </h2>

            <p className={styles.description}>
              {t("subscriptionDescription")}
            </p>

            <div className={styles.emailField}>
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                aria-label={t("emailPlaceholder")}
              />

              <button
                type="button"
                aria-label={t("subscribe")}
              >
                <ArrowIcon />
              </button>
            </div>
          </section>

          <section>
            <h2 className={styles.heading}>
              {t("support")}
            </h2>

            <div className={styles.supportList}>
              <Link
                href="/contact"
                className={styles.footerLink}
              >
                {t("contact")}
              </Link>

              <address className={styles.address}>
                {address}
              </address>

              <a
                href={`mailto:${siteConfig.support.email}`}
                className={styles.footerLink}
              >
                {siteConfig.support.email}
              </a>

              <a
                href={siteConfig.support.phone.href}
                className={styles.footerLink}
              >
                {siteConfig.support.phone.display}
              </a>
            </div>
          </section>

          <section>
            <h2 className={styles.heading}>
              {t("account")}
            </h2>

            <div className={styles.linkList}>
              <Link
                href="/account"
                className={styles.footerLink}
              >
                {t("myAccount")}
              </Link>

              <Link
                href="/login"
                className={styles.footerLink}
              >
                {t("loginRegister")}
              </Link>

              <Link
                href="/cart"
                className={styles.footerLink}
              >
                {t("cart")}
              </Link>

              <Link
                href="/wishlist"
                className={styles.footerLink}
              >
                {t("wishlist")}
              </Link>
            </div>
          </section>

          <section>
            <h2 className={styles.heading}>
              {t("quickLinks")}
            </h2>

            <div className={styles.linkList}>
              <Link href="/shop" className={styles.footerLink}>
                {t("shop")}
              </Link>

              <Link
                href="/about"
                className={styles.footerLink}
              >
                {t("about")}
              </Link>

              <Link
                href="/contact"
                className={styles.footerLink}
              >
                {t("contact")}
              </Link>

              <Link
                href="/privacy-policy"
                className={styles.footerLink}
              >
                {t("privacyPolicy")}
              </Link>

              <Link
                href="/terms-of-use"
                className={styles.footerLink}
              >
                {t("termsOfUse")}
              </Link>

              <Link href="/faq" className={styles.footerLink}>
                {t("faq")}
              </Link>
            </div>
          </section>

          <section className={styles.download}>
            <h2 className={styles.heading}>
              {t("downloadApp")}
            </h2>

            <p className={styles.downloadDescription}>
              {t("downloadDescription")}
            </p>

            <div className={styles.downloadContent}>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noreferrer"
                className={styles.qrLink}
              >
                <Image
                  src={siteConfig.assets.telegramQr}
                  alt={t("telegramQrAlt")}
                  width={86}
                  height={86}
                />
              </a>

              <div className={styles.storeLinks}>
                <a
                  href={siteConfig.links.googlePlay}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.storeBadge}
                >
                  <GooglePlayIcon />

                  <span>
                    <small>GET IT ON</small>
                    {t("googlePlay")}
                  </span>
                </a>

                <a
                  href={siteConfig.links.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.storeBadge}
                >
                  <AppleIcon />

                  <span>
                    <small>Download on the</small>
                    {t("appStore")}
                  </span>
                </a>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>

              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              <a
                href={siteConfig.links.x}
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <XIcon />
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </section>
        </div>

        <p className={styles.copyright}>
          {t("copyright", {year: currentYear})}
        </p>
      </div>
    </footer>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 3 12 9L4 21V3Z" fill="currentColor" />
      <path d="m16 12 3.5 2.6c.9.7.9 2.1 0 2.8L16 21V12Z" fill="currentColor" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.1 12.8c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.9-1.6 0-3.1.9-3.9 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.6Zm-2.3-7.1c.6-.8 1-1.8.9-2.9-.9 0-2.1.6-2.7 1.3-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.7-1.2Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.8V13h2.7v8h3.3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3l-4.9-6.4L6.4 21H3.3l7.3-8.4L2.9 3h6.3L13.7 9 18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.4 8.3H3.2V21h3.2V8.3ZM4.8 3A1.9 1.9 0 1 0 4.8 6.8 1.9 1.9 0 0 0 4.8 3ZM21 13.7c0-3.8-2-5.6-4.7-5.6-2.2 0-3.2 1.2-3.7 2.1V8.3H9.4V21h3.2v-6.3c0-1.7.3-3.3 2.4-3.3 2.1 0 2.1 1.9 2.1 3.4V21h3.2v-7.3Z" />
    </svg>
  );
}