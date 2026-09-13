"use client";

import {useState} from "react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/routing";
import {sidebarCategories} from "@/data/home";

import styles from "./CategorySidebar.module.css";

export default function CategorySidebar() {
  const t = useTranslations("homePage");

  const [openCategoryId, setOpenCategoryId] = useState<
    string | null
  >(null);

  return (
    <aside
      className={styles.sidebar}
      aria-label={t("sidebar.navigationLabel")}
    >
      <ul className={styles.categoryList}>
        {sidebarCategories.map((category) => {
          const hasChildren = Boolean(category.children?.length);

          const isOpen = openCategoryId === category.id;

          const categoryLabel = t(
            `sidebar.${category.id}`
          );

          return (
            <li
              key={category.id}
              className={styles.categoryItem}
              onMouseEnter={() => {
                if (hasChildren) {
                  setOpenCategoryId(category.id);
                }
              }}
              onMouseLeave={() => {
                if (hasChildren) {
                  setOpenCategoryId(null);
                }
              }}
            >
              <div className={styles.categoryRow}>
                <Link
                  href={category.href}
                  className={styles.categoryLink}
                >
                  {categoryLabel}
                </Link>

                {hasChildren && (
                  <button
                    type="button"
                    className={styles.submenuToggle}
                    aria-label={t("sidebar.openSubmenu", {
                      category: categoryLabel,
                    })}
                    aria-expanded={isOpen}
                    onClick={() => {
                      setOpenCategoryId(
                        isOpen ? null : category.id
                      );
                    }}
                  >
                    <ChevronIcon />
                  </button>
                )}
              </div>

              {hasChildren && isOpen && (
                <ul className={styles.submenu}>
                  {category.children?.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={child.href}
                        className={styles.submenuLink}
                      >
                        {t(`sidebar.${child.id}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}