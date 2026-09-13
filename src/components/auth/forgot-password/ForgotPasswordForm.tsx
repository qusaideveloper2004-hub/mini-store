"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useLocale, useTranslations} from "next-intl";
import {z} from "zod";

import {Link} from "@/i18n/routing";
import {createForgotPasswordSchema} from "@/schemas/auth/forgotPasswordSchema";

import styles from "./ForgotPasswordForm.module.css";

export default function ForgotPasswordForm() {
  const locale = useLocale();
  const t = useTranslations("forgotPassword");

  const forgotPasswordSchema = createForgotPasswordSchema(
    locale as "en" | "ar"
  );

  type ForgotPasswordFormData = z.infer<
    typeof forgotPasswordSchema
  >;

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  function onSubmit(data: ForgotPasswordFormData) {
    console.log("Forgot password:", data);

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <section className={styles.success}>
        <h1 className={styles.successTitle}>
          {t("successTitle")}
        </h1>

        <p className={styles.successDescription}>
          {t("successDescription")}
        </p>

        <Link
          href="/login"
          className={styles.backToLogin}
        >
          {t("backToLogin")}
        </Link>
      </section>
    );
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {t("title")}
        </h1>

        <p className={styles.subtitle}>
          {t("subtitle")}
        </p>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.field}>
          <label
            htmlFor="emailOrPhone"
            className={styles.srOnly}
          >
            {t("emailOrPhone")}
          </label>

          <input
            id="emailOrPhone"
            type="text"
            autoComplete="username"
            placeholder={t("emailOrPhonePlaceholder")}
            aria-invalid={Boolean(errors.emailOrPhone)}
            aria-describedby={
              errors.emailOrPhone
                ? "emailOrPhone-error"
                : undefined
            }
            className={styles.input}
            {...register("emailOrPhone")}
          />

          {errors.emailOrPhone && (
            <p
              id="emailOrPhone-error"
              className={styles.error}
            >
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
        >
          {t("submit")}
        </button>

        <Link
          href="/login"
          className={styles.backToLogin}
        >
          {t("backToLogin")}
        </Link>
      </form>
    </div>
  );
}