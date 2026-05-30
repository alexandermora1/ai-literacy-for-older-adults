import { useNavigate, useLocation } from 'react-router-dom';
import { ScrollProgressBar } from '../../components/ScrollProgressBar/ScrollProgressBar';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
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
  const location = useLocation();
  const fromWelcome = (location.state as { fromWelcome?: boolean } | null)?.fromWelcome === true;
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();
  const { resetProgress } = useProgress(); // TODO: remove before release

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      <header className={styles.header}>
        {!fromWelcome ? (
          <button
            className={styles.btnBack}
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Gå tilbake til forrige side"
          >
            <BackArrow />
            <span>Tilbake</span>
          </button>
        ) : (
          <div className={styles.btnBackPlaceholder} aria-hidden="true" />
        )}

        <h1 className={styles.heading}>Hjelp</h1>

        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />
        <ScrollProgressBar />
      </header>

      <main className={styles.content}>
        <div className={styles.contentColumn}>

          <section className={styles.section} aria-labelledby="section-kapitler">
            <h2 id="section-kapitler" className={styles.sectionHeading}>
              Kurset er delt inn i 5 kapitler
            </h2>
            <p className={styles.bodyText}>
              Hvert kapittel handler om et tema, for eksempel «Hva er KI?» eller «KI i smarthjem». Du kan ta kapitlene i den rekkefølgen du vil, men å ta dem i rekkefølge anbefales.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-emner">
            <h2 id="section-emner" className={styles.sectionHeading}>
              Hvert kapittel har emner og aktiviteter
            </h2>
            <p className={styles.bodyText}>
              Emner er korte tekster du leser. Aktiviteter er quiz og øvelser hvor du tester det du har lært.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-stjerner">
            <h2 id="section-stjerner" className={styles.sectionHeading}>
              Tjen stjerner og merker
            </h2>
            <p className={styles.bodyText}>
              Du får stjerner for riktige svar i quizene, og merker når du fullfører kapitler. Du kan se hvor langt du har kommet når som helst ved å trykke på «Se fremgang»-knappen.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-tekst">
            <h2 id="section-tekst" className={styles.sectionHeading}>
              Du kan justere tekststørrelsen
            </h2>
            <div className={styles.textSizeDemo} aria-label="Eksempel på justering av tekststørrelse">
              <TextSizeControl
                onDecrease={decrease}
                onIncrease={increase}
                atMin={atMin}
                atMax={atMax}
              />
              <p className={styles.demoLabel}>Trykk på minustegnet for å gjøre teksten mindre eller plusstegnet for å gjøre teksten større</p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="section-hjelp">
            <h2 id="section-hjelp" className={styles.sectionHeading}>
              Denne skjermen er alltid tilgjengelig
            </h2>
            <p className={styles.bodyText}>
              Trykk på «Hjelp»-knappen øverst til høyre (nederst på mobil) når du vil se denne forklaringen igjen.
            </p>
          </section>

        </div>
      </main>

      <div className={styles.bottomAction}>
        <button
          className={styles.btnStart}
          type="button"
          onClick={() => navigate('/kursoversikt')}
          aria-label={fromWelcome ? 'Start kurset' : 'Fortsett kurset'}
        >
          {fromWelcome ? 'Trykk her for å starte kurset' : 'Fortsett kurset'}
        </button>
      </div>

      {/* TODO: remove before release */}
      <button
        className={styles.btnNullstill}
        type="button"
        onClick={() => { resetProgress(); navigate('/kursoversikt'); }}
        aria-label="Nullstill all fremgang og gå til kursoversikt"
      >
        Nullstill fremgang
      </button>

    </div>
  );
}
