import {useTranslations} from "next-intl";

import {serviceFeatures} from "@/data/serviceFeatures";

import ServiceFeatureCard from "./ServiceFeatureCard";
import styles from "./ServiceFeaturesSection.module.css";

export default function ServiceFeaturesSection() {
  const t = useTranslations("homePage.serviceFeatures");

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.features}>
          {serviceFeatures.map((feature) => (
            <ServiceFeatureCard
              key={feature.id}
              feature={feature}
              title={t(`items.${feature.id}.title`)}
              description={t(`items.${feature.id}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}