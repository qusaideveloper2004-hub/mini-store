import type {ReactNode} from "react";

import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  afterTitle?: ReactNode;
  endContent?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  afterTitle,
  endContent,
}: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeading}>
      <div className={styles.eyebrow}>
        <span className={styles.marker} />

        <p>{eyebrow}</p>
      </div>

      <div className={styles.contentRow}>
        <h2 className={styles.title}>
          {title}
        </h2>

        {afterTitle && (
          <div className={styles.afterTitle}>
            {afterTitle}
          </div>
        )}

        {endContent && (
          <div className={styles.endContent}>
            {endContent}
          </div>
        )}
      </div>
    </div>
  );
}
