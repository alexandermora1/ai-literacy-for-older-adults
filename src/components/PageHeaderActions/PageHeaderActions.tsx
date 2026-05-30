import { useNavigate, useLocation } from 'react-router-dom';
import styles from './PageHeaderActions.module.css';

function fromLabelForPath(pathname: string): string {
  if (/^\/kapittel\/\d+\/emne\/\d+$/.test(pathname)) return 'Emneoversikt';
  if (/^\/kapittel\/\d+\/quiz\/\d+/.test(pathname)) return 'Emneoversikt';
  if (/^\/kapittel\/\d+$/.test(pathname)) return 'Emneoversikt';
  if (pathname === '/kursoversikt') return 'Kursoversikt';
  return 'Kursoversikt';
}

export function PageHeaderActions() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.actions}>
      <button
        className={styles.btnPrimary}
        type="button"
        aria-label="Se fremgang i kurset"
        onClick={() => navigate('/fremgang', { state: { fromLabel: fromLabelForPath(pathname) } })}
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
