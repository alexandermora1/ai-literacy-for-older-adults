import { useNavigate, useLocation } from 'react-router-dom';
import { ScrollProgressBar } from '../../components/ScrollProgressBar/ScrollProgressBar';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { getAllKapittelBadges, getAllSpesialBadges, type Badge } from '../../data/badges';
import { CHAPTERS } from '../../data/chapters';
import { MAX_STARS } from '../../data/progress';
import styles from './MinFremgangPage.module.css';
const kapittelBadges = getAllKapittelBadges();
const spesialBadges = getAllSpesialBadges();
const TOTAL_BADGES = kapittelBadges.length + spesialBadges.length;

// Only chapters 1–5 shown in progress (chapter 6 has no quiz/emner)
const PROGRESS_CHAPTERS = CHAPTERS.filter((ch) => ch.id <= 5);

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <span className={styles.iconComplete} aria-hidden="true">✓</span>
  );
}

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
}

function ProgressBar({ value, max, label }: ProgressBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className={styles.progressTrack}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
  );
}

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
}

function BadgeCard({ badge, earned }: BadgeCardProps) {
  return (
    <li
      className={`${styles.badgeCard} ${earned ? styles.badgeCardEarned : styles.badgeCardLocked}`}
      aria-label={earned ? `${badge.name}: Oppnådd` : `${badge.name}: Låst — ${badge.unlockHint}`}
    >
      <div className={`${styles.badgeCircle} ${earned ? styles.badgeCircleEarned : styles.badgeCircleLocked}`}>
        <span aria-hidden="true">{badge.icon}</span>
      </div>
      <span className={styles.badgeName}>{badge.name}</span>
      {earned ? (
        <span className={styles.earnedPill} aria-hidden="true">✓ Oppnådd</span>
      ) : (
        <span className={styles.unlockHint}>{badge.unlockHint}</span>
      )}
    </li>
  );
}

export function MinFremgangPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromLabel = (location.state as { fromLabel?: string } | null)?.fromLabel;
  const { fontScale } = useTextScale();
  const progress = useProgress();

  const totalStars = progress.totalStars;
  const earnedBadges = progress.earnedBadges.length;
  const earnedSet = new Set(progress.earnedBadges);

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Header ── */}
      <header className={styles.header}>
        <button
          className={styles.btnBack}
          type="button"
          onClick={() => fromLabel ? navigate(-1) : navigate('/kursoversikt')}
          aria-label={fromLabel ? `Tilbake til ${fromLabel}` : 'Tilbake til kursoversikt'}
        >
          <BackArrow />
          <span>{fromLabel ? `Tilbake til ${fromLabel}` : 'Tilbake til kursoversikt'}</span>
        </button>
        <ScrollProgressBar />
      </header>

      <main className={styles.content}>
        <div className={styles.contentColumn}>

          <h1 className={styles.heading}>Min fremgang</h1>

          {/* ── Kapittelfremgang card ── */}
          <section className={styles.progressCard} aria-labelledby="kap-heading">
            <h2 id="kap-heading" className={styles.cardHeading}>Kapittelfremgang</h2>

            <ul className={styles.chapterList} role="list">
              {PROGRESS_CHAPTERS.map((chapter) => {
                const status = progress.getKapittelStatus(chapter.id);
                const isComplete = status === 'fullført';
                const visitedCount = progress.getVisitedEmneCount(chapter.id);
                const inProgress = !isComplete && visitedCount > 0;
                const emnerCompleted = isComplete ? chapter.topics.length : visitedCount;
                const totalEmner = chapter.topics.length;
                let statusText: string;
                let statusIcon: React.ReactNode;
                if (isComplete) {
                  statusText = 'Fullført';
                  statusIcon = <CheckCircle />;
                } else if (inProgress) {
                  statusText = `${emnerCompleted} av ${totalEmner} deler`;
                  statusIcon = <span className={styles.iconInProgress} aria-hidden="true">→</span>;
                } else {
                  statusText = 'Ikke startet';
                  statusIcon = <span className={styles.iconNotStarted} aria-hidden="true">○</span>;
                }

                return (
                  <li key={chapter.id} className={styles.chapterRow}>
                    <div className={styles.chapterRowHeader}>
                      {statusIcon}
                      <span className={`${styles.chapterName} ${isComplete ? styles.chapterNameComplete : ''}`}>
                        {chapter.title}
                      </span>
                      <span className={`${styles.chapterStatusText} ${isComplete ? styles.statusComplete : ''}`}>
                        {statusText}
                      </span>
                    </div>
                    <ProgressBar
                      value={isComplete ? totalEmner : emnerCompleted}
                      max={totalEmner}
                      label={`Fremgang for ${chapter.title}: ${statusText}`}
                    />
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ── Stats row ── */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={styles.statIcon} aria-hidden="true">⭐</span>
                <span className={styles.statValue}>{totalStars}/{MAX_STARS}</span>
              </div>
              <span className={styles.statLabel}>Stjerner</span>
              <ProgressBar
                value={totalStars}
                max={MAX_STARS}
                label={`Stjerner: ${totalStars} av ${MAX_STARS}`}
              />
            </div>

            <div className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={styles.statIcon} aria-hidden="true">🥇</span>
                <span className={styles.statValue}>{earnedBadges}/{TOTAL_BADGES}</span>
              </div>
              <span className={styles.statLabel}>Merker</span>
              <ProgressBar
                value={earnedBadges}
                max={TOTAL_BADGES}
                label={`Merker: ${earnedBadges} av ${TOTAL_BADGES}`}
              />
            </div>
          </div>

          {/* ── Kapittelmerker ── */}
          <section className={styles.badgeSection} aria-labelledby="kapittel-badges-heading">
            <div className={styles.badgeSectionHeader}>
              <h2 id="kapittel-badges-heading" className={styles.badgeSectionHeading}>
                Kapittelmerker
              </h2>
              <p className={styles.badgeSectionSubtitle}>
                Tjen et merke for hvert kapittel du fullfører
              </p>
            </div>
            <ul className={styles.badgeGrid} role="list">
              {kapittelBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} earned={earnedSet.has(badge.id)} />
              ))}
            </ul>
          </section>

          {/* ── Spesialmerker ── */}
          <section className={styles.badgeSection} aria-labelledby="spesial-badges-heading">
            <div className={styles.badgeSectionHeader}>
              <h2 id="spesial-badges-heading" className={styles.badgeSectionHeading}>
                Spesialmerker
              </h2>
              <p className={styles.badgeSectionSubtitle}>
                Tjen flere merker ved å gjenta og forbedre deg
              </p>
            </div>
            <ul className={styles.badgeGrid} role="list">
              {spesialBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} earned={earnedSet.has(badge.id)} />
              ))}
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}
