import CategorySidebar from "./CategorySidebar";
import HeroCarousel from "./HeroCarousel";

import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <div className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <CategorySidebar />

        <HeroCarousel />
      </div>
    </div>
  );
}