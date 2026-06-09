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
            onClick={() => navigate('/hjelp', { state: { fromWelcome: true } })}
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

          <footer className={styles.privacy}>
            <p>Dette kurset samler ikke inn personopplysninger om deg.</p>
            <p>Nettsiden lagrer kun informasjon om fremgangen din i kurset — hvilke kapitler du har fullført og resultater fra quizene. Denne informasjonen lagres lokalt i nettleseren din og sendes ikke til noen server.</p>
            <p>Deltar du i masterstudien, samles dine svar inn separat gjennom spørreskjemaene du mottar på e-post. Den prosessen beskrives nærmere i informasjonsskrivet du har fått tilsendt.</p>
            <p>Nettkurset er utviklet av Alexander Mora, masterstudent ved OsloMet</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
