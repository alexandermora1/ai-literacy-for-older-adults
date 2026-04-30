import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { useTextScale } from '../../hooks/useTextScale';
import { getChapterById } from '../../data/chapters';
import styles from './QuizResultatPage.module.css';

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface ResultState {
  correct: number;
  total: number;
  kapitelId: number;
  quizId: number;
}

function starsForScore(correct: number, total: number): number {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 1) return 3;
  if (pct >= 0.67) return 2;
  if (pct >= 0.34) return 1;
  return 0;
}

function resultMessage(correct: number, total: number): string {
  const pct = correct / total;
  if (pct >= 1) return 'Fantastisk! Du svarte riktig på alle spørsmålene!';
  if (pct >= 0.67) return 'Bra jobbet! Du kan dette stoffet godt.';
  if (pct >= 0.34) return 'Godt forsøk! Les gjennom emnene igjen og prøv på nytt.';
  return 'Ikke gi opp! Gå tilbake og les emnene på nytt — det hjelper!';
}

export function QuizResultatPage() {
  const { kapitelId: kapitelIdStr, quizId: quizIdStr } = useParams<{
    kapitelId: string;
    quizId: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { fontScale } = useTextScale();

  const kapitelId = Number(kapitelIdStr);
  const quizId = Number(quizIdStr);
  const chapter = getChapterById(kapitelId);
  const state = location.state as ResultState | null;

  if (!chapter || !state) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const { correct, total } = state;
  const stars = starsForScore(correct, total);

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      <header className={styles.header}>
        <button
          className={styles.btnBack}
          type="button"
          onClick={() => navigate(`/kapittel/${kapitelId}`)}
          aria-label="Tilbake til kapitteloversikt"
        >
          <BackArrow />
          <span>Tilbake til kapitteloversikt</span>
        </button>

        <h1 className={styles.heading}>
          Quiz – Kapittel {kapitelId}: {chapter.title}
        </h1>

        <PageHeaderActions />
      </header>

      <main className={styles.content}>
        <div className={styles.contentColumn}>
          <div className={styles.resultCard}>
            <p className={styles.resultLabel}>Ditt resultat</p>

            <p className={styles.resultScore} aria-live="polite">
              <span className={styles.resultCorrect}>{correct}</span>
              <span className={styles.resultTotal}> av {total} riktige</span>
            </p>

            {stars > 0 && (
              <span
                className={styles.resultStars}
                role="img"
                aria-label={`${stars} av 3 stjerner`}
              >
                {'⭐'.repeat(stars)}{'☆'.repeat(3 - stars)}
              </span>
            )}

            <p className={styles.resultMessage}>{resultMessage(correct, total)}</p>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.btnSecondary}
              type="button"
              onClick={() => navigate(`/kapittel/${kapitelId}/quiz/${quizId}`)}
              aria-label="Prøv quizen igjen"
            >
              Prøv igjen
            </button>
            <button
              className={styles.btnPrimary}
              type="button"
              onClick={() => navigate(`/kapittel/${kapitelId}`)}
              aria-label="Tilbake til emneoversikten for dette kapittelet"
            >
              Tilbake til emneoversikt
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
