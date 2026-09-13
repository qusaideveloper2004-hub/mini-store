import styles from './StatsCard.module.css';

type StatsIcon =
  | 'customers'
  | 'sales'
  | 'products'
  | 'support';

type StatsCardProps = {
  value: string;
  label: string;
  icon: StatsIcon;
  isFeatured?: boolean;
};

export default function StatsCard({
  value,
  label,
  icon,
  isFeatured = false,
}: StatsCardProps) {
  return (
    <article
      className={
        isFeatured
          ? `${styles.card} ${styles.featured}`
          : styles.card
      }
    >
      <div className={styles.iconCircle}>
        <StatisticIcon icon={icon} />
      </div>

      <strong className={styles.value}>
        {value}
      </strong>

      <p className={styles.label}>
        {label}
      </p>
    </article>
  );
}

type StatisticIconProps = {
  icon: StatsIcon;
};

function StatisticIcon({
  icon,
}: StatisticIconProps) {
  if (icon === 'customers') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle
          cx="10"
          cy="7"
          r="3"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M17 10a3 3 0 0 0 0-6M20 20v-1.5a3.5 3.5 0 0 0-2.2-3.25"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === 'sales') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 7h16l-1.1 12H5.1L4 7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M8 9V6a4 4 0 0 1 8 0v3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === 'products') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m4.5 7.8 7.5 4.2 7.5-4.2M12 12v9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5h16v11H9l-5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10h.01M12 10h.01M16 10h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}