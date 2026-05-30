import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
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

type ContentBlock =
  | { type: 'lead'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string };

const PLACEHOLDER_CONTENT: ContentBlock[] = [
  {
    type: 'lead',
    text: 'ChatGPT og lignende verktøy kan skrive tekst, svare på spørsmål og hjelpe deg med mye. Men hva er det egentlig?',
  },
  {
    type: 'paragraph',
    text: 'Du har kanskje hørt om ChatGPT i nyhetene. Det er et eksempel på det som kalles generativ KI – en type KI som kan lage nytt innhold, som tekst, bilder og musikk.',
  },
  {
    type: 'paragraph',
    text: 'Ordet "generativ" betyr rett og slett at den lager noe nytt. Du stiller et spørsmål eller gir den en oppgave, og den svarer med noe den har satt sammen selv – basert på alt den har lært.',
  },
  {
    type: 'paragraph',
    text: 'Det er litt som å snakke med en veldig belest venn. Du spør om noe, og vennen svarer med egne ord – selv om de har lest det et sted før.',
  },
  {
    type: 'heading',
    text: 'Hvordan fungerer det i praksis?',
  },
  {
    type: 'paragraph',
    text: 'Når du skriver noe til ChatGPT, leser den det du har skrevet og lager et svar ord for ord. Den velger hvert ord basert på hva som gir mest mening ut fra sammenhengen – litt som når du gjetter neste ord i en setning.',
  },
  {
    type: 'paragraph',
    text: 'ChatGPT har lært av enorme mengder tekst fra internett, bøker og artikler. Det gjør at den kan svare på spørsmål om nesten hva som helst – fra matlaging til historie til medisinske spørsmål.',
  },
  {
    type: 'paragraph',
    text: 'Du kommuniserer med den ved å skrive vanlig tekst, akkurat som du sender en melding. Du trenger ikke lære deg noen spesielle kommandoer eller koder.',
  },
  {
    type: 'heading',
    text: 'Eksempel fra hverdagen',
  },
  {
    type: 'paragraph',
    text: 'Si at du vil skrive et brev til barnebarna dine, men sliter med å finne de riktige ordene. Du kan be ChatGPT om hjelp: "Kan du hjelpe meg å skrive et hyggelig brev til barnebarna mine?" – og den vil komme med et forslag du kan bruke eller endre som du vil.',
  },
  {
    type: 'paragraph',
    text: 'Du kan også bruke den til å få forklart noe du lurer på. For eksempel: "Kan du forklare hva blodtrykk er på en enkel måte?" Den svarer deg med det samme, på vanlig norsk.',
  },
  {
    type: 'heading',
    text: 'Flere verktøy enn ChatGPT',
  },
  {
    type: 'paragraph',
    text: 'ChatGPT er det mest kjente verktøyet, men det finnes flere. Microsoft har et lignende verktøy som heter Copilot, og Google har ett som heter Gemini. Alle fungerer på omtrent samme måte – du skriver, og de svarer.',
  },
  {
    type: 'paragraph',
    text: 'I dette kurset bruker vi ChatGPT som eksempel, men det du lærer her gjelder for alle lignende verktøy.',
  },
  {
    type: 'paragraph',
    text: 'Husk: Generativ KI finner ikke svar i en database – den setter sammen svar basert på mønstre den har lært. Det betyr at den noen ganger kan ta feil, selv om svaret høres overbevisende ut. Det kommer vi tilbake til i emne 5.',
  },
];

export function EmneinnholdPage() {
  const { kapitelId: kapitelIdStr, emneId: emneIdStr } = useParams<{
    kapitelId: string;
    emneId: string;
  }>();
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();
  const { markEmneVisited } = useProgress();

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
      {/* ── Sticky header: back | text size | actions ── */}
      <header className={styles.header}>
        <button
          className={styles.btnBack}
          type="button"
          onClick={() => navigate(`/kapittel/${kapitelId}`)}
          aria-label="Tilbake til emneoversikt"
        >
          <BackArrow />
          <span>Tilbake til emneoversikt</span>
        </button>

        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />

        <PageHeaderActions />
      </header>

      {/* ── Scrollable body ── */}
      <main className={styles.content}>
        <div className={styles.contentColumn}>

          {/* Title and meta */}
          <div className={styles.titleBlock}>
            <h1 className={styles.heading}>{topic.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaPosition}>
                Emne {topicIndex + 1} av {topics.length}
              </span>
              <span className={styles.metaTime}>
                <ClockIcon />
                Ca. 3 min
              </span>
            </div>
          </div>

          {/* Body content */}
          <div className={styles.body}>
            {PLACEHOLDER_CONTENT.map((block, i) => {
              if (block.type === 'lead') {
                return (
                  <p key={i} className={styles.leadParagraph}>
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className={styles.sectionHeading}>
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={i} className={styles.paragraph}>
                  {block.text}
                </p>
              );
            })}
          </div>

        </div>
      </main>

      {/* ── Fixed bottom navigation ── */}
      <nav className={styles.bottomNav} aria-label="Naviger mellom emner">
        <div className={styles.btnPrevSlot}>
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
            className={styles.btnNext}
            type="button"
            onClick={() => {
              markEmneVisited(kapitelId, emneId);
              navigate(`/kapittel/${kapitelId}`);
            }}
            aria-label="Fullfør emnet og gå tilbake til emneoversikt"
          >
            Tilbake til emneoversikt
          </button>
        ) : (
          <button
            className={styles.btnNext}
            type="button"
            onClick={() => {
              markEmneVisited(kapitelId, emneId);
              navigate(`/kapittel/${kapitelId}/emne/${nextId}`);
            }}
            aria-label="Fullfør emnet og gå til neste emne"
          >
            Neste emne
            <ChevronRight />
          </button>
        )}
      </nav>
    </div>
  );
}
