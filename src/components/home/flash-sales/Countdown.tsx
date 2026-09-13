"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import styles from "./Countdown.module.css";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const now = new Date();

  /*
    نحدد نهاية العرض عند بداية اليوم التالي:
    اليوم 23:59:59 ثم يبدأ من جديد غدًا.
  */
  const endDate = new Date();

  endDate.setDate(now.getDate() + 1);
  endDate.setHours(0, 0, 0, 0);

  const difference = Math.max(
    0,
    endDate.getTime() - now.getTime()
  );

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor(
      (difference % 86_400_000) / 3_600_000
    ),
    minutes: Math.floor(
      (difference % 3_600_000) / 60_000
    ),
    seconds: Math.floor(
      (difference % 60_000) / 1_000
    ),
  };
}

function formatTime(value: number) {
  return String(value).padStart(2, "0");
}

export default function Countdown() {
  const t = useTranslations("homePage.flashSales");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      setTimeLeft(getTimeLeft());
    };

    window.requestAnimationFrame(updateTime);

    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const items = [
    {label: t("days"), value: timeLeft.days},
    {label: t("hours"), value: timeLeft.hours},
    {label: t("minutes"), value: timeLeft.minutes},
    {label: t("seconds"), value: timeLeft.seconds},
  ];

  return (
    <div
      className={styles.countdown}
      aria-label={`${t("days")}, ${t("hours")}, ${t("minutes")}, ${t("seconds")}`}
    >
      {items.map((item, index) => (
        <div key={item.label} className={styles.item}>
          <span className={styles.label}>
            {item.label}
          </span>

          <strong className={styles.value}>
            {formatTime(item.value)}
          </strong>

          {index < items.length - 1 && (
            <span className={styles.separator}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
