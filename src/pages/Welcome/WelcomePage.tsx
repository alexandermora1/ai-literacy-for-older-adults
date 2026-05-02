import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero.png';
import styles from './WelcomePage.module.css';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <div className={styles.contentInner}>
          <img
            src={heroImage}
            alt="Eldre mann som snakker med en vennlig robot"
            className={styles.heroImage}
          />

          <h1 className={styles.heading}>
            Bli tryggere på KI i hverdagen
          </h1>

          <p className={styles.subtitle}>
            Lær hva kunstig intelligens (KI) er, hvor du møter det, og hvordan
            du kan bruke det på en smart og sikker måte.
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
            <span>Ingen konto</span>
            <span aria-hidden="true"> · </span>
            <span>Ingen innlogging</span>
            <span aria-hidden="true"> · </span>
            <span>Helt gratis</span>
          </p>
        </div>
      </main>
    </div>
  );
}
