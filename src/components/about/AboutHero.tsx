import Image from 'next/image';

import styles from './AboutHero.module.css';

type AboutHeroProps = {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
  image: string;
  imageAlt: string;
};

export default function AboutHero({
  title,
  paragraphOne,
  paragraphTwo,
  image,
  imageAlt,
}: AboutHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>{title}</h1>

        <p>{paragraphOne}</p>

        <p>{paragraphTwo}</p>
      </div>

      <div className={styles.imageSurface}>
        <Image
          src={image}
          alt={imageAlt}
          width={600}
          height={500}
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
}