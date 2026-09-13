import type {BrowseCategory, CategoryIcon} from "@/data/browseCategories";
import {Link} from "@/i18n/routing";

import styles from "./CategoryCard.module.css";

type CategoryCardProps = {
  category: BrowseCategory;
  label: string;
};

export default function CategoryCard({
  category,
  label,
}: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={styles.card}
    >
      <CategoryIcon icon={category.icon} />

      <span className={styles.label}>
        {label}
      </span>
    </Link>
  );
}

type CategoryIconProps = {
  icon: CategoryIcon;
};

function CategoryIcon({icon}: CategoryIconProps) {
  const commonProps = {
    className: styles.icon,
    viewBox: "0 0 64 64",
    fill: "none",
    "aria-hidden": true,
  };

  switch (icon) {
    case "phone":
      return (
        <svg {...commonProps}>
          <rect x="18" y="6" width="28" height="52" rx="4" stroke="currentColor" strokeWidth="3" />
          <path d="M28 50h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "computer":
      return (
        <svg {...commonProps}>
          <rect x="8" y="12" width="48" height="34" rx="3" stroke="currentColor" strokeWidth="3" />
          <path d="M24 56h16M32 46v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "watch":
      return (
        <svg {...commonProps}>
          <rect x="20" y="18" width="24" height="28" rx="5" stroke="currentColor" strokeWidth="3" />
          <path d="M25 18V8h14v10M25 46v10h14V46" stroke="currentColor" strokeWidth="3" />
        </svg>
      );

    case "camera":
      return (
        <svg {...commonProps}>
          <path d="M8 22h12l4-6h16l4 6h12v30H8V22Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="32" cy="37" r="10" stroke="currentColor" strokeWidth="3" />
        </svg>
      );

    case "headphones":
      return (
        <svg {...commonProps}>
          <path d="M12 36V30a20 20 0 0 1 40 0v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 34h8v18h-8a4 4 0 0 1-4-4V38a4 4 0 0 1 4-4ZM52 34h-8v18h8a4 4 0 0 0 4-4V38a4 4 0 0 0-4-4Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );

    case "gamepad":
      return (
        <svg {...commonProps}>
          <path d="M17 26h30a9 9 0 0 1 8.6 6.3l3.2 10.5A7 7 0 0 1 52.1 52h-4.4l-7-7H23.3l-7 7h-4.4a7 7 0 0 1-6.7-9.2l3.2-10.5A9 9 0 0 1 17 26Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M18 35v10M13 40h10M43 37h.1M50 43h.1" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
  }
}