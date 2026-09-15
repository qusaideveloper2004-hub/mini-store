// "use client";

// import {useLocale} from "next-intl";

// import {usePathname, useRouter} from "@/i18n/routing";

// import styles from "./LanguageSwitcher.module.css";

// export default function LanguageSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const selectedLocale = e.target.value;
//     if (selectedLocale !== locale) {
//       router.replace(pathname, {locale: selectedLocale});
//     }
//   }

//   return (
//     <select
//       value={locale}
//       onChange={handleLanguageChange}
//       aria-label="Select Language"
//       className={styles.select}
//     >
//       <option value="en" className={styles.option}>
//         English
//       </option>
//       <option value="ar" className={styles.option}>
//         العربية
//       </option>
//     </select>
//   );
// }



// "use client";

// import {useLocale} from "next-intl";

// import {usePathname, useRouter} from "@/i18n/routing";

// import styles from "./LanguageSwitcher.module.css";

// export default function LanguageSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const selectedLocale = e.target.value;
//     if (selectedLocale !== locale) {
//       router.replace(pathname, {locale: selectedLocale});
//     }
//   }

//   return (
//     <select
//       value={locale}
//       onChange={handleLanguageChange}
//       aria-label="Select Language"
//       className={styles.select}
//     >
//       <option value="en" className={styles.option}>
//         English
//       </option>
//       <option value="ar" className={styles.option}>
//         العربية
//       </option>
//     </select>
//   );
// }


"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/routing";

import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedLocale = e.target.value;
    if (selectedLocale !== locale) {
      router.replace(pathname, {locale: selectedLocale});
    }
  }

  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      aria-label="Select Language"
      className={styles.select}
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}