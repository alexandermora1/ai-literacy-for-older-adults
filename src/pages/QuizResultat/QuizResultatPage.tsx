import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ScrollProgressBar } from '../../components/ScrollProgressBar/ScrollProgressBar';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { getChapterById } from '../../data/chapters';
import { getQuiz, type QuizAnswerRecord } from '../../data/quizzes';
import { getBadgeById } from '../../data/badges';
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
  stars: number;
  kapitelId: number;
  quizId: number;
  answers: QuizAnswerRecord[];
}

function resultHeading(stars: number): string {
  if (stars === 3) return 'Fantastisk!';
  if (stars === 2) return 'Godt jobbet!';
  if (stars === 1) return 'Godt forsøk!';
  return 'Ikke gi opp!';
}

export function QuizResultatPage() {
  const { kapitelId: kapitelIdStr, quizId: quizIdStr } = useParams<{
    kapitelId: string;
    quizId: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { fontScale } = useTextScale();
  const { newlyEarnedBadges } = useProgress();

  const kapitelId = Number(kapitelIdStr);
  const quizId = Number(quizIdStr);
  const chapter = getChapterById(kapitelId);
  const quiz = getQuiz(kapitelId, quizId);
  const state = location.state as ResultState | null;

  if (!chapter || !quiz || !state) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const { correct, total, stars, answers } = state;
  const hasBadges = newlyEarnedBadges.length > 0;
  const firstNewBadge = hasBadges ? getBadgeById(newlyEarnedBadges[0]) : null;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Header — back button only ── */}
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
        <ScrollProgressBar />
      </header>

      <main className={styles.content}>
        <div className={styles.contentColumn}>

          {/* ── Hero row: avatar + result ── */}
          <div className={styles.heroRow} aria-label="Ditt resultat">
            <div className={styles.heroAvatar} aria-hidden="true">🤖</div>
            <div className={styles.heroContent}>
              <h1 className={styles.resultHeading}>{resultHeading(stars)}</h1>
              <p className={styles.resultSubtitle}>
                Quiz for kapittel {kapitelId}: {chapter.title}
              </p>
              <div className={styles.starsRow}>
                <span
                  role="img"
                  aria-label={`${stars} av 3 stjerner`}
                  className={styles.starsIcons}
                >
                  {[1, 2, 3].map((n) => (
                    <span key={n} aria-hidden="true">
                      {n <= stars ? '⭐' : '☆'}
                    </span>
                  ))}
                </span>
                <span className={styles.scoreText}>
                  {correct} av {total} riktige
                </span>
              </div>
            </div>
          </div>

          {/* ── Badge preview — only when new badge(s) earned ── */}
          {firstNewBadge && (
            <section className={styles.badgeSection} aria-label="Opptjente merker">
              <div className={styles.badgeCard}>
                <span className={styles.badgeIcon} aria-hidden="true">
                  {firstNewBadge.icon}
                </span>
                <div className={styles.badgeInfo}>
                  <span className={styles.badgeLabel}>
                    {newlyEarnedBadges.length > 1
                      ? `${newlyEarnedBadges.length} nye merker opptjent!`
                      : 'Merke opptjent!'}
                  </span>
                  <span className={styles.badgeName}>{firstNewBadge.name}</span>
                </div>
                <span className={styles.badgeMedal} aria-hidden="true">🏅</span>
              </div>
            </section>
          )}

          {/* ── Answer review section ── */}
          <section aria-labelledby="review-heading">
            <h2 id="review-heading" className={styles.reviewHeading}>
              Gå gjennom svarene dine
            </h2>

            <ul className={styles.reviewList}>
              {quiz.questions.map((question, index) => {
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
                      <span
                        className={`${styles.reviewIcon} ${isCorrect ? styles.reviewIconCorrect : styles.reviewIconIncorrect}`}
                        role="img"
                        aria-label={isCorrect ? 'Riktig' : 'Feil'}
                      >
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <div className={styles.reviewHeaderText}>
                        <span className={styles.reviewStatus}>
                          Spørsmål {index + 1}: {isCorrect ? 'Riktig' : 'Feil'}
                        </span>
                        <p className={styles.reviewQuestion}>{question.question}</p>
                      </div>
                    </div>

                    <div className={styles.reviewAnswers}>
                      <div className={styles.answerBox}>
                        <span className={styles.answerLabel}>Ditt svar:</span>{' '}
                        {userAnswerText}
                      </div>
                      {!isCorrect && (
                        <div className={`${styles.answerBox} ${styles.answerBoxCorrect}`}>
                          <span className={styles.answerLabel}>Riktig svar:</span>{' '}
                          {correctAnswerText}
                        </div>
                      )}
                      {!isCorrect && (
                        <button
                          className={styles.btnLesEmnet}
                          type="button"
                          onClick={() => navigate(`/kapittel/${kapitelId}`)}
                          aria-label={`Les emnet på nytt for spørsmål ${index + 1}`}
                        >
                          <span aria-hidden="true">📖</span>
                          Les emnet på nytt
                        </button>
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
              Prøv quizen igjen
            </button>
            {hasBadges ? (
              <button
                className={styles.btnPrimary}
                type="button"
                onClick={() => navigate('/merke')}
                aria-label="Se merkene du har opptjent"
              >
                Se merke{newlyEarnedBadges.length > 1 ? 'r' : ''}!
              </button>
            ) : (
              <button
                className={styles.btnPrimary}
                type="button"
                onClick={() => navigate('/kursoversikt')}
                aria-label="Fortsett kurset fra kursoversikten"
              >
                Fortsett kurset
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
