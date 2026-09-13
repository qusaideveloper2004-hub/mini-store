import {Link} from '@/i18n/routing';

import styles from './ContactPage.module.css';

type ContactPageProps = {
  children: React.ReactNode;
  homeLabel: string;
  title: string;
  breadcrumbLabel: string;

  callUsTitle: string;
  callUsDescription: string;
  phone: string;

  writeUsTitle: string;
  writeUsDescription: string;
  email: string;
};

export default function ContactPage({
  children,
  homeLabel,
  title,
  breadcrumbLabel,
  callUsTitle,
  callUsDescription,
  phone,
  writeUsTitle,
  writeUsDescription,
  email,
}: ContactPageProps) {
  return (
    <main className={styles.page}>
      <div className="container">
        <nav
          className={styles.breadcrumbs}
          aria-label={breadcrumbLabel}
        >
          <Link href="/">
            {homeLabel}
          </Link>

          <span aria-hidden="true">/</span>

          <span>{title}</span>
        </nav>

        <div className={styles.content}>
          <aside className={styles.contactInfo}>
            <ContactInfoItem
              icon={<PhoneIcon />}
              title={callUsTitle}
              description={callUsDescription}
              value={phone}
            />

            <div className={styles.divider} />

            <ContactInfoItem
              icon={<MailIcon />}
              title={writeUsTitle}
              description={writeUsDescription}
              value={email}
            />
          </aside>

          <section className={styles.formArea}>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}

type ContactInfoItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
};

function ContactInfoItem({
  icon,
  title,
  description,
  value,
}: ContactInfoItemProps) {
  return (
    <section className={styles.infoItem}>
      <div className={styles.iconCircle}>
        {icon}
      </div>

      <div>
        <h2>{title}</h2>

        <p>{description}</p>

        <p>{value}</p>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.5 3.5h2l1.2 4.2-1.6 1.6a14.3 14.3 0 0 0 5.6 5.6l1.6-1.6 4.2 1.2v2c0 1.1-.9 2-2 2C10.2 18.5 5.5 13.8 5.5 6.5c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="m4.5 7 7.5 5.5L19.5 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}