import { useNavigate } from 'react-router-dom';
import { useTextScale } from '../../hooks/useTextScale';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import styles from './HjelpPage.module.css';

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HjelpPage() {
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      <header className={styles.header}>
        <button
          className={styles.btnBack}
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Gå tilbake til forrige side"
        >
          <BackArrow />
          <span>Tilbake</span>
        </button>

        <h1 className={styles.heading}>Hjelp</h1>

        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />
      </header>

      <main className={styles.content}>
        <div className={styles.contentColumn}>

          <section className={styles.section} aria-labelledby="section-bruk">
            <h2 id="section-bruk" className={styles.sectionHeading}>
              Slik bruker du kurset
            </h2>
            <p className={styles.bodyText}>
              Kurset er delt opp i kapitler. Hvert kapittel inneholder flere korte emner som du kan lese i ditt eget tempo.
            </p>
            <p className={styles.bodyText}>
              Når du har lest gjennom et kapittel, kan du ta en quiz for å sjekke hva du har lært. Du får stjerner og merker basert på hvor godt du gjør det.
            </p>
            <p className={styles.bodyText}>
              Du kan gå frem og tilbake mellom emnene med pilknappene nederst på siden, og alltid gå tilbake til oversikten via menyen øverst.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-tekst">
            <h2 id="section-tekst" className={styles.sectionHeading}>
              Tekststørrelse
            </h2>
            <p className={styles.bodyText}>
              Du kan gjøre teksten større eller mindre ved å bruke knappene øverst til høyre på de fleste sider. Valget ditt lagres automatisk.
            </p>
            <div className={styles.textSizeDemo} aria-label="Eksempel på justering av tekststørrelse">
              <TextSizeControl
                onDecrease={decrease}
                onIncrease={increase}
                atMin={atMin}
                atMax={atMax}
              />
              <p className={styles.demoLabel}>A– gjør teksten mindre · A+ gjør teksten større</p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="section-hjelp">
            <h2 id="section-hjelp" className={styles.sectionHeading}>
              Trenger du mer hjelp?
            </h2>
            <p className={styles.bodyText}>
              Dette kurset er laget i samarbeid med Seniornett Norge. Seniornett har frivillige over hele landet som kan hjelpe deg med digitale spørsmål.
            </p>
            <p className={styles.bodyText}>
              Du finner din nærmeste Seniornett-avdeling på{' '}
              <strong>seniornett.no</strong>
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
