"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {useCartStore} from "@/store/cartStore";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const items = useCartStore((state) => state.items);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  if (orderNumber) {
    return <main className={styles.page}><div className="container"><section className={styles.successState}><SuccessIcon /><h1>{t("orderSuccess")}</h1><p>{t("orderSuccessDescription")}</p><p className={styles.orderNumber}>{t("orderNumber")}: <strong>{orderNumber}</strong></p><div className={styles.successActions}><Link className={styles.primaryButton} href="/account/orders">{t("viewOrders")}</Link><Link className={styles.secondaryButton} href="/">{t("backToHome")}</Link></div></section></div></main>;
  }

  if (items.length === 0) {
    return <main className={styles.page}><div className="container"><section className={styles.emptyState}><h1>{t("emptyCart")}</h1><p>{t("emptyCartDescription")}</p><Link className={styles.primaryButton} href="/shop">{t("continueShopping")}</Link></section></div></main>;
  }

  return (
    <main className={styles.page}><div className="container">
      <nav className={styles.breadcrumbs}><Link href="/">{t("home")}</Link><span>/</span><Link href="/cart">{t("cart")}</Link><span>/</span><span>{t("title")}</span></nav>
      <div className={styles.content}><CheckoutForm onOrderPlaced={setOrderNumber} /><CheckoutSummary /></div>
    </div></main>
  );
}

function SuccessIcon() { return <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
