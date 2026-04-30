import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { useTextScale } from '../../hooks/useTextScale';
import type { Badge } from '../../data/badges';
import styles from './NyttMerkePage.module.css';

interface MerkeState {
  badge: Badge;
  kapitelId: number;
  quizId: number;
}

export function NyttMerkePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fontScale } = useTextScale();

  const state = location.state as MerkeState | null;

  if (!state?.badge) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const { badge } = state;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* Minimal top bar — keeps Se fremgang / Hjelp accessible */}
      <div className={styles.topBar}>
        <PageHeaderActions />
      </div>

      <main className={styles.content}>
        <h1 className={styles.heading}>Nytt merke!</h1>

        <div className={styles.badgeIconWrapper} aria-hidden="true">
          <span className={styles.badgeIcon}>{badge.icon}</span>
        </div>

        <p className={styles.badgeName}>{badge.name}</p>
        <p className={styles.badgeDescription}>{badge.description}</p>

        <div className={styles.actions}>
          <button
            className={styles.btnSecondary}
            type="button"
            onClick={() => navigate('/kursoversikt')}
            aria-label="Se alle merkene mine på kursoversikten"
          >
            Se alle merkene mine
          </button>
          <button
            className={styles.btnPrimary}
            type="button"
            onClick={() => navigate('/kursoversikt')}
            aria-label="Fortsett kurset fra kursoversikten"
          >
            Fortsett kurset
          </button>
        </div>
      </main>
    </div>
  );
}
