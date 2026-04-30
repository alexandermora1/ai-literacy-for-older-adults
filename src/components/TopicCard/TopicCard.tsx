import styles from './TopicCard.module.css';

type TopicCardVariant = 'emne' | 'aktivitet';

interface TopicCardProps {
  title: string;
  description: string;
  variant: TopicCardVariant;
  onClick?: () => void;
}

function ChevronRight() {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 1L9 9L1 17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TopicCard({ title, description, variant, onClick }: TopicCardProps) {
  const isEmne = variant === 'emne';

  return (
    <button
      className={`${styles.card} ${isEmne ? styles.emne : styles.aktivitet}`}
      onClick={onClick}
      aria-label={`${title}: ${description}`}
      type="button"
    >
      <span className={styles.accentStripe} aria-hidden="true" />

      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>

      <span className={styles.chevron}>
        <ChevronRight />
      </span>
    </button>
  );
}
