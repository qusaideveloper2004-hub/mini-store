"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useLocale, useTranslations} from "next-intl";
import {z} from "zod";

import {Link, useRouter} from "@/i18n/routing";
import {createLoginSchema} from "@/schemas/auth/loginSchema";
import {useAuthStore} from "@/store/authStore";

import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const locale = useLocale();
  const t = useTranslations("login");

  const loginSchema = createLoginSchema(
    locale as "en" | "ar"
  );

  type LoginFormData = z.infer<typeof loginSchema>;

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    login({
      firstName: "User",
      lastName: "",
      email: data.emailOrPhone,
      address: "",
      password: data.password,
    });

    router.replace("/");
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

        <div className={styles.field}>
          <label
            htmlFor="password"
            className={styles.srOnly}
          >
            {t("password")}
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password
                ? "password-error"
                : undefined
            }
            className={styles.input}
            {...register("password")}
          />

          {errors.password && (
            <p
              id="password-error"
              className={styles.error}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
          >
            {t("submit")}
          </button>

          <Link
            href="/forgot-password"
            className={styles.forgotPassword}
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <p className={styles.signupPrompt}>
          {t("noAccount")}{" "}

          <Link
            href="/signup"
            className={styles.signupLink}
          >
            {t("createAccount")}
          </Link>
        </p>
      </form>
    </div>
  );
}