"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";

import styles from "./Footer.module.css";

export default function NewsletterForm() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");

    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.emailField}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder={t("emailPlaceholder")}
          aria-label={t("emailPlaceholder")}
        />

        <button type="submit" aria-label={t("subscribe")}>
          <ArrowIcon />
        </button>
      </form>

      {status === "success" && (
        <p className={styles.subscribeSuccess}>
          {t("subscribeSuccess")}
        </p>
      )}

      {status === "error" && (
        <p className={styles.subscribeError}>
          {t("subscribeError")}
        </p>
      )}
    </div>
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

