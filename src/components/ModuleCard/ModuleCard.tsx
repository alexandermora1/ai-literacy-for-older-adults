import styles from './ModuleCard.module.css';

type ModuleCardVariant = 'completed' | 'in-progress';

interface ModuleCardProps {
  title: string;
  chapterNumber: number;
  completedTopics: number;
  totalTopics: number;
  icon: string;
  variant: ModuleCardVariant;
  stars?: number;
  completionLabel?: string;
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

export function ModuleCard({
  title,
  chapterNumber,
  completedTopics,
  totalTopics,
  icon,
  variant,
  stars = 0,
  completionLabel,
  onClick,
}: ModuleCardProps) {
  const isCompleted = variant === 'completed';
  const progressText = completionLabel ?? `${completedTopics} av ${totalTopics} deler fullført`;
  const starsLabel = stars > 0 ? `, ${stars} av 3 stjerner` : '';
  const ariaLabel = `${title}, Kapittel ${chapterNumber}, ${progressText}${starsLabel}`;

  return (
    <button
      className={`${styles.card} ${isCompleted ? styles.completed : styles.inProgress}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {!isCompleted && (
        <span className={styles.accentStripe} aria-hidden="true" />
      )}

      <div className={styles.body}>
        <span className={styles.chapterLabel}>KAPITTEL {chapterNumber}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.completionText}>{progressText}</span>
        {isCompleted && stars > 0 && (
          <span
            className={styles.stars}
            role="img"
            aria-label={`${stars} av 3 stjerner`}
          >
            {'⭐'.repeat(stars)}
          </span>
        )}
      </div>

      <span className={styles.iconBox} aria-hidden="true">
        {icon}
      </span>

      <span className={styles.chevron}>
        <ChevronRight />
      </span>
    </button>
  );
}
