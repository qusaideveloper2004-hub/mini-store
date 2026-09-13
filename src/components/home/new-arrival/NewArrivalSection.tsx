import {useTranslations} from "next-intl";

import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import {newArrivals} from "@/data/newArrivals";

import ArrivalCard from "./ArrivalCard";
import styles from "./NewArrivalSection.module.css";

export default function NewArrivalSection() {
  const t = useTranslations("homePage.newArrival");

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className={styles.grid}>
          {newArrivals.map((arrival) => (
            <ArrivalCard
              key={arrival.id}
              arrival={arrival}
              title={t(`items.${arrival.id}.title`)}
              description={t(`items.${arrival.id}.description`)}
              imageAlt={t(`items.${arrival.id}.imageAlt`)}
              shopNowLabel={t("shopNow")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}