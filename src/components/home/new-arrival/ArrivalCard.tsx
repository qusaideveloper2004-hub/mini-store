import Image from "next/image";

import type {NewArrival} from "@/data/newArrivals";
import {Link} from "@/i18n/routing";

import styles from "./ArrivalCard.module.css";

type ArrivalCardProps = {
  arrival: NewArrival;
  title: string;
  description: string;
  imageAlt: string;
  shopNowLabel: string;
};

export default function ArrivalCard({
  arrival,
  title,
  description,
  imageAlt,
  shopNowLabel,
}: ArrivalCardProps) {
  return (
    <Link
      href={arrival.href}
      className={`${styles.card} ${styles[arrival.variant]}`}
      aria-label={title}
    >
      <Image
        src={arrival.image}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={styles.image}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>

        <span className={styles.shopNow}>
          {shopNowLabel}
        </span>
      </div>
    </Link>
  );
}