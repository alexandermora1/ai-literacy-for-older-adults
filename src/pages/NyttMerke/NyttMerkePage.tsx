import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { getBadgeById, getAllKapittelBadges, getAllSpesialBadges, type Badge } from '../../data/badges';
import styles from './NyttMerkePage.module.css';

const TOTAL_BADGES = getAllKapittelBadges().length + getAllSpesialBadges().length;

export function NyttMerkePage() {
  const navigate = useNavigate();
  const { fontScale } = useTextScale();
  const { newlyEarnedBadges, clearNewlyEarned, earnedBadges } = useProgress();

  // Capture the list at mount so clearing the hook state doesn't affect rendering
  const [badges] = useState<Badge[]>(() =>
    newlyEarnedBadges
      .map((id) => getBadgeById(id))
      .filter((b): b is Badge => b !== undefined),
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    clearNewlyEarned();
  }, [clearNewlyEarned]);

  if (badges.length === 0) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const badge = badges[currentIndex];
  const isLast = currentIndex === badges.length - 1;
  const earnedCount = earnedBadges.length;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      <main className={styles.content}>

        {/* ── "NYTT MERKE" pill ── */}
        <div className={styles.pill} aria-hidden="true">NYTT MERKE</div>

        {/* ── Heading ── */}
        <h1 className={styles.heading}>Gratulerer!</h1>
        <p className={styles.subtitle}>
          {badges.length > 1
            ? `Merke ${currentIndex + 1} av ${badges.length}`
            : 'Du har tjent et nytt merke'}
        </p>

        {/* ── Badge card ── */}
        <div
          key={badge.id}
          className={styles.badgeCard}
          role="img"
          aria-label={`Merke: ${badge.name}. ${badge.description}`}
        >
          <div className={styles.iconCircle} aria-hidden="true">
            <span className={styles.badgeIcon}>{badge.icon}</span>
          </div>
          <p className={styles.badgeName}>{badge.name.toUpperCase()}</p>
          <p className={styles.badgeDescription}>{badge.description}</p>
          <div
            className={styles.countPill}
            aria-label={`Merke ${earnedCount} av ${TOTAL_BADGES}`}
          >
            <span aria-hidden="true">🏅</span>
            <span>Merke {earnedCount} av {TOTAL_BADGES}</span>
          </div>
        </div>

        {/* ── Actions ── */}
        {isLast ? (
          <div className={styles.actions}>
            <button
              className={styles.btnFortsett}
              type="button"
              onClick={() => navigate('/kursoversikt')}
              aria-label="Fortsett kurset fra kursoversikten"
            >
              Fortsett kurset
            </button>
            <button
              className={styles.btnSeAlle}
              type="button"
              onClick={() => navigate('/fremgang')}
              aria-label="Se alle merkene dine på fremgangssiden"
            >
              Se alle merkene mine
            </button>
          </div>
        ) : (
          <button
            className={styles.btnFortsett}
            type="button"
            onClick={() => setCurrentIndex((i) => i + 1)}
            aria-label={`Gå til neste merke, ${currentIndex + 2} av ${badges.length}`}
          >
            Neste merke →
          </button>
        )}

      </main>
    </div>
  );
}
