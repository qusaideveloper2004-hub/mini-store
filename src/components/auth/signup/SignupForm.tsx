"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useLocale, useTranslations} from "next-intl";
import {z} from "zod";

import {Link, useRouter} from "@/i18n/routing";
import {createSignupSchema} from "@/schemas/auth/signupSchema";
import {useAuthStore} from "@/store/authStore";

import styles from "./SignupForm.module.css";

export default function SignupForm() {
  const locale = useLocale();
  const t = useTranslations("signup");

  const signupSchema = createSignupSchema(
    locale as "en" | "ar"
  );

  type SignupFormData = z.infer<typeof signupSchema>;

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data: SignupFormData) {
    login({
      firstName: data.name,
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
          <label htmlFor="name" className={styles.srOnly}>
            {t("name")}
          </label>

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "name-error" : undefined
            }
            className={styles.input}
            {...register("name")}
          />

          {errors.name && (
            <p id="name-error" className={styles.error}>
              {errors.name.message}
            </p>
          )}
        </div>

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
            autoComplete="new-password"
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

        <button
          type="submit"
          className={styles.submitButton}
        >
          {t("submit")}
        </button>

        <a
          href="https://accounts.google.com/"
          target="_blank"
          rel="noreferrer"
          className={styles.googleButton}
        >
          <GoogleIcon />

          {t("signUpWithGoogle")}
        </a>

        <p className={styles.loginPrompt}>
          {t("alreadyHaveAccount")}{" "}

          <Link
            href="/login"
            className={styles.loginLink}
          >
            {t("login")}
          </Link>
        </p>
      </form>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={styles.googleIcon}
    >
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.72-.06-1.22-.2-1.74H12v3.39h5.37c-.11.84-.74 2.1-2.14 2.95l-.02.11 3.11 2.36.22.02c2.01-1.82 2.81-4.51 2.81-7.09Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.85 6.45-2.3l-3.07-2.49c-.82.56-1.92.95-3.38.95a5.86 5.86 0 0 1-5.54-3.96l-.1.01-3.23 2.46-.03.1A9.77 9.77 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.46 13.7A5.8 5.8 0 0 1 6.15 12c0-.59.11-1.16.3-1.7v-.12L3.2 7.68l-.1.05A9.45 9.45 0 0 0 2.5 12c0 1.53.37 2.98.6 4.27l3.36-2.57Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.34c1.85 0 3.1.78 3.81 1.43l2.78-2.65C16.83 3.5 14.63 2.5 12 2.5a9.77 9.77 0 0 0-8.9 5.23l3.35 2.57A5.86 5.86 0 0 1 12 6.34Z"
      />
    </svg>
  );
}