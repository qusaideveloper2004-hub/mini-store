"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import styles from "./PromoCountdown.module.css";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const PROMO_DURATION = 3 * 24 * 60 * 60 * 1_000;

function getTimeLeft(targetTime: number): TimeLeft {
  const remainingTime = Math.max(targetTime - Date.now(), 0);

  return {
    days: Math.floor(remainingTime / (24 * 60 * 60 * 1_000)),
    hours: Math.floor(
      (remainingTime / (60 * 60 * 1_000)) % 24
    ),
    minutes: Math.floor(
      (remainingTime / (60 * 1_000)) % 60
    ),
    seconds: Math.floor((remainingTime / 1_000) % 60),
  };
}

export default function PromoCountdown() {
  const t = useTranslations("homePage.musicExperience");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = Date.now() + PROMO_DURATION;

    function updateTime() {
      setTimeLeft(getTimeLeft(targetTime));
    }

    updateTime();

    const intervalId = window.setInterval(updateTime, 1_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const items = [
    {label: t("hours"), value: timeLeft.hours},
    {label: t("days"), value: timeLeft.days},
    {label: t("minutes"), value: timeLeft.minutes},
    {label: t("seconds"), value: timeLeft.seconds},
  ];

  return (
    <div
      className={styles.countdown}
      aria-label={`${t("hours")}, ${t("days")}, ${t("minutes")}, ${t("seconds")}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={styles.item}
        >
          <strong className={styles.value}>
            {String(item.value).padStart(2, "0")}
          </strong>

          <span className={styles.label}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}