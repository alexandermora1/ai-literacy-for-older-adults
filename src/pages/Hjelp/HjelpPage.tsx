import { useNavigate, useLocation } from 'react-router-dom';
import { ScrollProgressBar } from '../../components/ScrollProgressBar/ScrollProgressBar';
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
  const location = useLocation();
  const fromWelcome = (location.state as { fromWelcome?: boolean } | null)?.fromWelcome === true;
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  return (
    <div
      className={styles.page}
      style={{ "--font-scale": fontScale } as React.CSSProperties}
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
        <div className={styles.headingBalancer} aria-hidden="true" />

        <div className={styles.textSizeRow}>
          <TextSizeControl
            onDecrease={decrease}
            onIncrease={increase}
            atMin={atMin}
            atMax={atMax}
          />
        </div>
        <ScrollProgressBar />
      </header>

      <main className={styles.content}>
        <div className={styles.contentColumn}>
          <section
            className={styles.section}
            aria-labelledby="section-oversikt"
          >
            <h2 id="section-oversikt" className={styles.sectionHeading}>
              Slik er kurset bygget opp
            </h2>
            <p className={styles.bodyText}>
              Kurset er delt inn i 5 kapitler. Hvert kapittel handler om et
              tema, for eksempel «Hva er KI?» eller «KI i smarthjem». Vi
              anbefaler å ta kapitlene i rekkefølge, men du kan også hoppe frem
              og tilbake om du vil.
            </p>
            <p className={styles.bodyText}>
              Inne i hvert kapittel finner du <strong>emner</strong> og en{" "}
              <strong>quiz</strong>. Les alle emnene først, og ta quizen når du
              er ferdig.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-kilder">
            <h2 id="section-kilder" className={styles.sectionHeading}>
              Kilder
            </h2>
            <p className={styles.bodyText}>
              Tekstinnholdet i kurset er basert på faglige kilder og skrevet for
              å gjøre tekniske begreper tilgjengelige for deg som leser.
              Hoveddelen av innholdet bygger på artikler fra Store norske
              leksikon (snl.no), supplert med andre norske og internasjonale
              kilder. Fullstendige kildehenvisninger finner du under «Kilder og
              videre lesning» på slutten av hvert kapittel.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-lese">
            <h2 id="section-lese" className={styles.sectionHeading}>
              Slik leser du et emne
            </h2>
            <p className={styles.bodyText}>
              Trykk på et emne i listen for å åpne det. Bla nedover for å lese
              teksten. Når du har lest til bunnen av siden, blir «Neste
              emne»-knappen grønn og aktiv — da er emnet fullført og du kan gå
              videre.
            </p>
            <p className={styles.bodyText}>
              Øverst på siden ser du en grønn strek som viser hvor langt du har
              kommet i teksten. Nederst på siden kan du gå til forrige eller
              neste emne.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-quiz">
            <h2 id="section-quiz" className={styles.sectionHeading}>
              Slik tar du quizen
            </h2>
            <p className={styles.bodyText}>
              Quizen finner du i aktivitetslisten under emnene i hvert kapittel.
              Trykk på quizen for å starte.
            </p>
            <p className={styles.bodyText}>
              Du får ett spørsmål om gangen med fire svaralternativer. Trykk på
              det svaret du tror er riktig, og trykk deretter på «Sjekk
              svar»-knappen. Du ser med én gang om du svarte riktig eller feil.
              Trykk «Neste spørsmål» for å gå videre. Til slutt får du en
              oppsummering med poeng og stjerner.
            </p>
          </section>

          <section
            className={styles.section}
            aria-labelledby="section-stjerner"
          >
            <h2 id="section-stjerner" className={styles.sectionHeading}>
              Stjerner og merker
            </h2>
            <p className={styles.bodyText}>
              Du kan tjene opptil 3 stjerner per quiz, avhengig av hvor mange
              riktige svar du får. Hvis du ikke er fornøyd med resultatet, kan
              du ta quizen på nytt — det er ingen grense på antall forsøk.
            </p>
            <p className={styles.bodyText}>
              Når du fullfører et kapittel, tjener du et merke. Det dukker opp
              en feiringsside automatisk. Du kan se alle merkene dine ved å
              trykke på «Se fremgang»-knappen øverst på de fleste sider.
            </p>
          </section>

          <section
            className={styles.section}
            aria-labelledby="section-navigasjon"
          >
            <h2 id="section-navigasjon" className={styles.sectionHeading}>
              Komme seg rundt i kurset
            </h2>
            <p className={styles.bodyText}>
              Øverst til venstre på de fleste sider finner du en «Tilbake»-knapp
              som tar deg tilbake til forrige side. Øverst til høyre finner du
              knappene «Se fremgang» og «Hjelp».
            </p>
            <p className={styles.bodyText}>
              «Se fremgang» viser deg en oversikt over hvor langt du har kommet,
              hvilke stjerner du har tjent, og hvilke merker du har fått.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="section-tekst">
            <h2 id="section-tekst" className={styles.sectionHeading}>
              Juster tekststørrelsen
            </h2>
            <p className={styles.bodyText}>
              Synes du teksten er for liten eller for stor? Bruk knappene
              nedenfor til å justere. Valget lagres automatisk, så du slipper å
              gjøre det på nytt neste gang.
            </p>
            <div
              className={styles.textSizeDemo}
              aria-label="Eksempel på justering av tekststørrelse"
            >
              <TextSizeControl
                onDecrease={decrease}
                onIncrease={increase}
                atMin={atMin}
                atMax={atMax}
              />
              <p className={styles.demoLabel}>
                Trykk på minustegnet (–) for å gjøre teksten mindre, eller
                plusstegnet (+) for å gjøre teksten større
              </p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="section-hjelp">
            <h2 id="section-hjelp" className={styles.sectionHeading}>
              Denne siden er alltid tilgjengelig
            </h2>
            <p className={styles.bodyText}>
              Trykk på «Hjelp»-knappen øverst til høyre på de fleste sider for å
              komme tilbake hit.
            </p>
          </section>
        </div>
      </main>

      <div className={styles.bottomAction}>
        <button
          className={styles.btnStart}
          type="button"
          onClick={() => navigate("/kursoversikt")}
          aria-label={fromWelcome ? "Start kurset" : "Fortsett kurset"}
        >
          {fromWelcome ? "Trykk her for å starte kurset" : "Fortsett kurset"}
        </button>
      </div>

    </div>
  );
}
