import Image from "next/image";
import type {ReactNode} from "react";

import styles from "./AuthLayout.module.css";

type AuthLayoutProps = {
  image: string;
  imageAlt: string;
  imagePosition?: string;
  children: ReactNode;
};

export default function AuthLayout({
  image,
  imageAlt,
  imagePosition,
  children,
}: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.visual}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
          style={imagePosition ? {objectPosition: imagePosition} : undefined}
        />
      </div>

      <div className={styles.formArea}>
        {children}
      </div>
    </div>
  );
}