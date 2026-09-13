"use client";

import {Link} from "@/i18n/routing";
import styles from "./CartSummary.module.css";

type CartSummaryProps = {
  subtotal: string;
  labels: {title: string; subtotal: string; shipping: string; free: string; total: string; checkout: string};
};

export default function CartSummary({subtotal, labels}: CartSummaryProps) {
  return (
    <aside className={styles.summary}>
      <h2>{labels.title}</h2>
      <dl className={styles.rows}>
        <div><dt>{labels.subtotal}:</dt><dd>{subtotal}</dd></div>
        <div><dt>{labels.shipping}:</dt><dd>{labels.free}</dd></div>
        <div className={styles.total}><dt>{labels.total}:</dt><dd>{subtotal}</dd></div>
      </dl>
      <Link href="/checkout" className={styles.checkoutButton}>{labels.checkout}</Link>
    </aside>
  );
}
