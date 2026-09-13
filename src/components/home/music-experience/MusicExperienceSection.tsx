import Image from "next/image";
import {useTranslations} from "next-intl";

import {musicExperience} from "@/data/home";
import {Link} from "@/i18n/routing";

import PromoCountdown from "./PromoCountdown";
import styles from "./MusicExperienceSection.module.css";

export default function MusicExperienceSection() {
  const t = useTranslations("homePage.musicExperience");

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>
              {t("eyebrow")}
            </p>

            <h2 className={styles.title}>
              {t("title")}
            </h2>

            <PromoCountdown />

            <Link
              href={musicExperience.href}
              className={styles.buyNowButton}
            >
              {t("buyNow")}
            </Link>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={musicExperience.image}
              alt={t("imageAlt")}
              width={600}
              height={420}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}