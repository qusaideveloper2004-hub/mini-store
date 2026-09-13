"use client";

import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {useCartStore} from "@/store/cartStore";
import styles from "./CheckoutSummary.module.css";

export default function CheckoutSummary() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {style: "currency", currency: "USD"});
  return <aside className={styles.summary}><h2>{t("orderSummary")}</h2><ul className={styles.items}>{items.map((item) => <li key={item.id}><div className={styles.product}><span className={styles.imageSurface}><Image src={item.image} alt={item.title} width={52} height={52} /></span><span>{item.title} <small>× {item.quantity}</small></span></div><span>{formatPrice.format(item.price * item.quantity)}</span></li>)}</ul><dl className={styles.totals}><div><dt>{t("subtotal")}:</dt><dd>{formatPrice.format(total)}</dd></div><div><dt>{t("shipping")}:</dt><dd>{t("free")}</dd></div><div className={styles.total}><dt>{t("total")}:</dt><dd>{formatPrice.format(total)}</dd></div></dl></aside>;
}
