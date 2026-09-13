"use client";

import {useTranslations} from "next-intl";

import styles from "./DeliveryInfo.module.css";

export default function DeliveryInfo() {
  const t = useTranslations("productDetails");

  return (
    <section className={styles.deliveryInfo}>
      <div className={styles.item}>
        <TruckIcon />

        <div>
          <h2 className={styles.title}>{t("freeDelivery")}</h2>

          <p className={styles.description}>
            {t("freeDeliveryDescription")}
          </p>
        </div>
      </div>

      <div className={styles.item}>
        <ReturnIcon />

        <div>
          <h2 className={styles.title}>{t("returnDelivery")}</h2>

          <p className={styles.description}>
            {t("returnDeliveryDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}

function TruckIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M5 10h25v23H5V10Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 17h8l5 7v9H30V17Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="14" cy="35" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="36" cy="35" r="4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M10 24a14 14 0 1 0 4-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 8v10h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
