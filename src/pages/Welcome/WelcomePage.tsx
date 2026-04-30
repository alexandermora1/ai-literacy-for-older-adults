import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* ── Right column: hero image (rendered first in DOM → top on portrait) ── */}
      <div className={styles.hero} aria-hidden="true">
        <span className={styles.heroEmoji}>🤖</span>
      </div>

      {/* ── Left column: content stack ── */}
      <main className={styles.content}>
        <div className={styles.contentInner}>
          <h1 className={styles.heading}>
            Bli kjent med KI i hverdagen
          </h1>

          <p className={styles.subtitle}>
            Et gratis kurs som hjelper deg å forstå kunstig intelligens —
            på dine premisser, i ditt eget tempo.
          </p>

          <button
            className={styles.btnKomIgang}
            type="button"
            onClick={() => navigate('/kursoversikt')}
            aria-label="Kom i gang med kurset"
          >
            Kom i gang
          </button>

          <p className={styles.trustLine}>
            Ingen innlogging · Ingen konto · Helt gratis
          </p>
        </div>
      </main>
    </div>
  );
}
