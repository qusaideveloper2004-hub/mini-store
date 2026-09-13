import Image from 'next/image';

import styles from './TeamMemberCard.module.css';

type TeamMemberCardProps = {
  image: string;
  name: string;
  role: string;
  social: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
};

export default function TeamMemberCard({
  image,
  name,
  role,
  social,
}: TeamMemberCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageSurface}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={360}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3>{name}</h3>

        <p>{role}</p>

        <div className={styles.socialLinks}>
          <SocialLink
            href={social.twitter}
            label={`${name} Twitter`}
          >
            <TwitterIcon />
          </SocialLink>

          <SocialLink
            href={social.instagram}
            label={`${name} Instagram`}
          >
            <InstagramIcon />
          </SocialLink>

          <SocialLink
            href={social.linkedin}
            label={`${name} LinkedIn`}
          >
            <LinkedInIcon />
          </SocialLink>
        </div>
      </div>
    </article>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialLink({
  href,
  label,
  children,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={styles.socialLink}
    >
      {children}
    </a>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18.8 4.8a8.7 8.7 0 0 1-2.5.7 4.4 4.4 0 0 0-7.5 4c-3.6-.2-6.7-1.9-8.8-4.5a4.4 4.4 0 0 0 1.4 5.8A4.3 4.3 0 0 1 .5 10v.1a4.4 4.4 0 0 0 3.5 4.3 4.3 4.3 0 0 1-2 .1 4.4 4.4 0 0 0 4.1 3 8.8 8.8 0 0 1-5.5 1.9H0a12.4 12.4 0 0 0 6.7 2c8 0 12.4-6.6 12.4-12.4v-.6a8.9 8.9 0 0 0 2.2-2.3 8.7 8.7 0 0 1-2.5.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.2 8.7H3.4V20h2.8V8.7ZM4.8 4A1.7 1.7 0 1 0 4.8 7.4 1.7 1.7 0 0 0 4.8 4ZM20.6 13.5c0-3.4-1.8-5-4.2-5-1.9 0-2.7 1-3.2 1.8V8.7h-2.8V20h2.8v-5.6c0-1.5.3-3 2.1-3 1.8 0 1.8 1.7 1.8 3.1V20H20v-6.5h.6Z"
        fill="currentColor"
      />
    </svg>
  );
}