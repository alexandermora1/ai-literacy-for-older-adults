import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { useTextScale } from '../../hooks/useTextScale';
import { getChapterById } from '../../data/chapters';
import { getQuiz, type QuizAnswerRecord } from '../../data/quizzes';
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
  answers: QuizAnswerRecord[];
}

function starsForScore(correct: number, total: number): number {
  if (total === 0) return 0;
  const pct = correct / total;
  if (pct >= 1) return 3;
  if (pct >= 0.67) return 2;
  if (pct >= 0.34) return 1;
  return 0;
}

function resultMessage(stars: number): string {
  if (stars === 3) return 'Fantastisk! Du svarte riktig på alle spørsmålene!';
  if (stars === 2) return 'Bra jobbet! Du kan dette stoffet godt.';
  if (stars === 1) return 'Godt forsøk! Les gjennom emnene igjen og prøv på nytt.';
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
  const quiz = getQuiz(kapitelId, quizId);
  const state = location.state as ResultState | null;

  if (!chapter || !quiz || !state) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const { correct, total, answers } = state;
  const stars = starsForScore(correct, total);

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Header ── */}
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

          {/* ── Stars section ── */}
          <section className={styles.starsSection} aria-label="Ditt resultat">
            <span
              className={styles.starsRow}
              role="img"
              aria-label={`${stars} av 3 stjerner`}
            >
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={n <= stars ? styles.starFilled : styles.starEmpty}
                  aria-hidden="true"
                >
                  {n <= stars ? '⭐' : '☆'}
                </span>
              ))}
            </span>

            <p className={styles.starsLabel}>
              Du fikk <strong>{stars}</strong> av 3 stjerner
            </p>
            <p className={styles.scoreText}>
              {correct} av {total} riktige svar
            </p>
            <p className={styles.resultMessage}>{resultMessage(stars)}</p>
          </section>

          {/* ── Badge section ── */}
          <section className={styles.badgeSection} aria-label="Opptjente merker">
            <h2 className={styles.sectionHeading}>Opptjente merker</h2>
            <div className={styles.badgeCard}>
              <span className={styles.badgeIcon} aria-hidden="true">
                {chapter.icon}
              </span>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeLabel}>Merke opptjent!</span>
                <span className={styles.badgeName}>Quiz: {chapter.title}</span>
              </div>
              <span className={styles.badgeMedal} aria-hidden="true">🏅</span>
            </div>
          </section>

          {/* ── Answer review section ── */}
          <section className={styles.reviewSection} aria-labelledby="review-heading">
            <h2 id="review-heading" className={styles.sectionHeading}>
              Gå gjennom svarene dine
            </h2>

            <ul className={styles.reviewList}>
              {quiz.questions.map((question) => {
                const record = answers.find((a) => a.questionId === question.id);
                const isCorrect = record?.correct ?? false;
                const userAnswerText =
                  question.answers.find((a) => a.id === record?.selectedAnswerId)?.text ?? '–';
                const correctAnswerText =
                  question.answers.find((a) => a.id === question.correctAnswerId)?.text ?? '–';

                return (
                  <li
                    key={question.id}
                    className={`${styles.reviewItem} ${isCorrect ? styles.reviewItemCorrect : styles.reviewItemIncorrect}`}
                  >
                    <div className={styles.reviewHeader}>
                      {/* ✓/✗ symbol always present — color is supplementary (WCAG 1.4.1) */}
                      <span
                        className={`${styles.reviewIcon} ${isCorrect ? styles.reviewIconCorrect : styles.reviewIconIncorrect}`}
                        role="img"
                        aria-label={isCorrect ? 'Riktig' : 'Feil'}
                      >
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <p className={styles.reviewQuestion}>{question.question}</p>
                    </div>

                    <div className={styles.reviewAnswers}>
                      <p className={styles.reviewUserAnswer}>
                        <span className={styles.reviewAnswerLabel}>Ditt svar:</span>{' '}
                        {userAnswerText}
                      </p>
                      {!isCorrect && (
                        <p className={styles.reviewCorrectAnswer}>
                          <span className={styles.reviewAnswerLabel}>Riktig svar:</span>{' '}
                          {correctAnswerText}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ── Action buttons ── */}
          <div className={styles.actions}>
            <button
              className={styles.btnSecondary}
              type="button"
              onClick={() => navigate(`/kapittel/${kapitelId}/quiz/${quizId}`)}
              aria-label="Prøv quizen på nytt"
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
