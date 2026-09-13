"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/routing";
import {heroSlides} from "@/data/home";

import styles from "./HeroCarousel.module.css";

export default function HeroCarousel() {
  const t = useTranslations("homePage");
  const tHeader = useTranslations("header");

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlideIndex) =>
        (currentSlideIndex + 1) % heroSlides.length
      );
    }, 5_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className={styles.hero}>
      <article className={styles.slide}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            {t(`hero.${currentSlide.id}.eyebrow`)}
          </p>

          <h1 className={styles.title}>
            {t(`hero.${currentSlide.id}.title`)}
          </h1>

          <Link
            href={currentSlide.href}
            className={styles.cta}
          >
            {tHeader("shopNow")}

            <ArrowIcon />
          </Link>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={currentSlide.image}
            alt={t(`hero.${currentSlide.id}.imageAlt`)}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
      </article>

      <div className={styles.dots}>
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={
              index === activeSlide
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            aria-label={t("hero.goToSlide", {
              number: index + 1,
            })}
            aria-current={
              index === activeSlide
                ? "true"
                : undefined
            }
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
