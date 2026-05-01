import { useNavigate } from 'react-router-dom';
import styles from './PageHeaderActions.module.css';

export function PageHeaderActions() {
  const navigate = useNavigate();

  return (
    <div className={styles.actions}>
      <button
        className={styles.btnPrimary}
        type="button"
        aria-label="Se fremgang i kurset"
        onClick={() => navigate('/fremgang')}
      >
        Se fremgang
      </button>
      <button
        className={styles.btnSecondary}
        type="button"
        aria-label="Åpne hjelp"
        onClick={() => navigate('/hjelp')}
      >
        Hjelp
      </button>
    </div>
  );
}
