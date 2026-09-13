"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLocale, useTranslations} from "next-intl";
import {z} from "zod";
import {createCheckoutSchema} from "@/schemas/checkout/checkoutSchema";
import {useCartStore} from "@/store/cartStore";
import {useOrderStore} from "@/store/orderStore";
import styles from "./CheckoutForm.module.css";

type CheckoutFormProps = {onOrderPlaced: (orderNumber: string) => void};

export default function CheckoutForm({onOrderPlaced}: CheckoutFormProps) {
  const locale = useLocale();
  const t = useTranslations("checkout");
  const checkoutSchema = createCheckoutSchema(locale as "en" | "ar");
  type CheckoutFormData = z.infer<typeof checkoutSchema>;
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrderStore((state) => state.createOrder);
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<CheckoutFormData>({resolver: zodResolver(checkoutSchema), defaultValues: {paymentMethod: "cash"}});

  function onSubmit(data: CheckoutFormData) {
    const orderNumber = generateOrderNumber();
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    createOrder({id: orderNumber, date: currentIsoDate(), items: items.map((item) => ({productId: item.id, title: item.title, image: item.image, price: item.price, quantity: item.quantity, subtotal: item.price * item.quantity})), subtotal, shipping: 0, total: subtotal, status: "processing"});
    clearCart();
    onOrderPlaced(orderNumber);
    void data;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>{t("billingDetails")}</h1>
      <Field label={t("name")} error={errors.name?.message}><input autoComplete="name" {...register("name")} /></Field>
      <Field label={t("email")} error={errors.email?.message}><input type="email" autoComplete="email" {...register("email")} /></Field>
      <Field label={t("phone")} error={errors.phone?.message}><input type="tel" autoComplete="tel" {...register("phone")} /></Field>
      <Field label={t("address")} error={errors.address?.message}><input autoComplete="street-address" {...register("address")} /></Field>
      <Field label={t("city")} error={errors.city?.message}><input autoComplete="address-level2" {...register("city")} /></Field>
      <fieldset className={styles.paymentMethods}><legend>{t("paymentMethod")}</legend><label><input type="radio" value="bank" {...register("paymentMethod")} /> {t("bank")}</label><label><input type="radio" value="cash" {...register("paymentMethod")} /> {t("cash")}</label></fieldset>
      <button className={styles.submitButton} type="submit" disabled={isSubmitting}>{t("placeOrder")}</button>
    </form>
  );
}

function Field({label, error, children}: {label: string; error?: string; children: React.ReactNode}) { return <label className={styles.field}><span>{label}</span>{children}{error ? <small role="alert">{error}</small> : null}</label>; }

function generateOrderNumber() {
  return `ORD-${Date.now()}`;
}

function currentIsoDate() {
  return new Date().toISOString();
}
