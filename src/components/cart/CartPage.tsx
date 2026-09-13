"use client";

import {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {useCartStore} from "@/store/cartStore";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const [message, setMessage] = useState("");
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formatPrice = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {style: "currency", currency: "USD"});

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className="container">
          <nav className={styles.breadcrumbs}><Link href="/">{t("home")}</Link><span>/</span><span>{t("title")}</span></nav>
          <section className={styles.emptyState}>
            <CartIcon />
            <h1>{t("emptyTitle")}</h1>
            <p>{t("emptyDescription")}</p>
            <Link href="/shop" className={styles.primaryButton}>{t("continueShopping")}</Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumbs}><Link href="/">{t("home")}</Link><span>/</span><span>{t("title")}</span></nav>
        <h1 className={styles.srOnly}>{t("title")}</h1>
        <section className={styles.cartTable}>
          <div className={styles.tableHeader}><span>{t("product")}</span><span>{t("price")}</span><span>{t("quantity")}</span><span>{t("subtotal")}</span></div>
          <div className={styles.items}>
            {items.map((item) => <CartItemRow key={item.id} item={item} price={formatPrice.format(item.price)} subtotal={formatPrice.format(item.price * item.quantity)} decreaseLabel={t("decreaseQuantity", {title: item.title})} increaseLabel={t("increaseQuantity", {title: item.title})} removeLabel={t("remove", {title: item.title})} onDecrease={() => decreaseQuantity(item.id)} onIncrease={() => increaseQuantity(item.id)} onRemove={() => removeFromCart(item.id)} />)}
          </div>
        </section>
        <div className={styles.actions}>
          <Link href="/shop" className={styles.secondaryButton}>{t("returnToShop")}</Link>
          <button type="button" className={styles.secondaryButton} onClick={() => setMessage(t("cartUpdated"))}>{t("updateCart")}</button>
        </div>
        {message ? <p className={styles.statusMessage} role="status">{message}</p> : null}
        <section className={styles.bottomSection}>
          <form className={styles.couponForm} onSubmit={(event) => { event.preventDefault(); setMessage(t("couponUnavailable")); }}>
            <label className={styles.srOnly} htmlFor="coupon">{t("couponPlaceholder")}</label>
            <input id="coupon" name="coupon" placeholder={t("couponPlaceholder")} />
            <button type="submit" className={styles.primaryButton}>{t("applyCoupon")}</button>
          </form>
          <CartSummary subtotal={formatPrice.format(total)} labels={{title: t("cartTotal"), subtotal: t("subtotal"), shipping: t("shipping"), free: t("free"), total: t("total"), checkout: t("proceedToCheckout")}} />
        </section>
      </div>
    </main>
  );
}

function CartIcon() { return <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L20.5 8H6.2M9.5 20a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm8 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
