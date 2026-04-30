import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { getChapterById } from '../../data/chapters';
import styles from './EmneinnholdPage.module.css';

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5V8L10.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PLACEHOLDER_PARAGRAPHS = [
  'Generativ KI er en form for kunstig intelligens som er i stand til å skape nytt, originalt innhold. Dette kan være tekst, bilder, musikk, video eller annet digitalt innhold. Teknologien er trent på store mengder eksisterende data, og bruker denne kunnskapen til å generere noe som ligner på, men ikke er en kopi av, det den har sett før.',
  'De siste årene har generativ KI blitt tilgjengelig for vanlige folk gjennom enkle programmer og apper. Du har kanskje allerede prøvd å bruke en slik tjeneste uten å tenke over det. Chatbots som kan svare på spørsmål, apper som kan redigere bilder med ett klikk, eller programmer som kan skrive tekst — alt dette er eksempler på generativ KI.',
  'Det som skiller generativ KI fra eldre former for KI, er evnen til å produsere innhold som ikke er forhåndsdefinert. En tradisjonell datamaskin utfører nøyaktig de instruksjonene den er programmert til. Generativ KI derimot kan finne opp noe nytt basert på mønstrene den har lært fra enorme mengder data.',
  'Et kjent eksempel er språkmodeller som kan skrive sammenhengende tekst. Disse modellene er trent på milliarder av setninger fra bøker, artikler og nettsider. Når du stiller dem et spørsmål, genererer de et svar ord for ord, basert på hva de har lært om hva som naturlig kommer etter hvert ord i en bestemt sammenheng.',
  'Det er viktig å huske at generativ KI ikke "forstår" innholdet det produserer på samme måte som et menneske gjør. KI har ikke følelser, meninger eller bevissthet. Det den gjør, er å gjenkjenne mønstre og bruke disse mønstrene til å lage noe som ser meningsfullt ut — men det er ikke alltid riktig eller pålitelig.',
  'I dette emnet skal vi se nærmere på hvordan generativ KI fungerer i praksis, hvilke verktøy som er tilgjengelige for deg, og hvordan du kan bruke dem på en trygg og fornuftig måte i hverdagen. Vi vil også se på noen av begrensningene ved teknologien, slik at du vet når du bør dobbeltsjekke informasjonen du får.',
];

export function EmneinnholdPage() {
  const { kapitelId: kapitelIdStr, emneId: emneIdStr } = useParams<{
    kapitelId: string;
    emneId: string;
  }>();
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  const kapitelId = Number(kapitelIdStr);
  const emneId = Number(emneIdStr);
  const chapter = getChapterById(kapitelId);
  const topics = chapter?.topics ?? [];
  const topicIndex = topics.findIndex((t) => t.id === emneId);
  const topic = topicIndex !== -1 ? topics[topicIndex] : null;

  if (!chapter || !topic) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const isFirst = topicIndex === 0;
  const isLast = topicIndex === topics.length - 1;
  const prevId = isFirst ? null : topics[topicIndex - 1].id;
  const nextId = isLast ? null : topics[topicIndex + 1].id;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Sticky header ── */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button
            className={styles.btnBack}
            type="button"
            onClick={() => navigate(`/kapittel/${kapitelId}`)}
            aria-label="Tilbake til emneoversikt"
          >
            <BackArrow />
            <span>Tilbake til emneoversikt</span>
          </button>

          <h1 className={styles.heading}>{topic.title}</h1>

          <PageHeaderActions />
        </div>

        <div className={styles.headerMeta}>
          <span className={styles.metaTime}>
            <ClockIcon />
            Ca. 3 min
          </span>
          <span className={styles.metaPosition}>
            Emne {topicIndex + 1} av {topics.length}
          </span>
          <TextSizeControl
            onDecrease={decrease}
            onIncrease={increase}
            atMin={atMin}
            atMax={atMax}
          />
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <main className={styles.content}>
        <div className={styles.contentColumn}>
          {PLACEHOLDER_PARAGRAPHS.map((text, i) => (
            <p key={i} className={styles.paragraph}>
              {text}
            </p>
          ))}
        </div>
      </main>

      {/* ── Fixed bottom navigation ── */}
      <nav className={styles.bottomNav} aria-label="Naviger mellom emner">
        <div>
          {!isFirst && (
            <button
              className={styles.btnPrev}
              type="button"
              onClick={() => navigate(`/kapittel/${kapitelId}/emne/${prevId}`)}
              aria-label="Gå til forrige emne"
            >
              <ChevronLeft />
              Forrige emne
            </button>
          )}
        </div>

        {isLast ? (
          <button
            className={styles.btnNextPrimary}
            type="button"
            onClick={() => navigate(`/kapittel/${kapitelId}`)}
            aria-label="Tilbake til emneoversikt"
          >
            Tilbake til emneoversikt
          </button>
        ) : (
          <button
            className={styles.btnNextPrimary}
            type="button"
            onClick={() => navigate(`/kapittel/${kapitelId}/emne/${nextId}`)}
            aria-label="Gå til neste emne"
          >
            Neste emne
            <ChevronRight />
          </button>
        )}
      </nav>
    </div>
  );
}
