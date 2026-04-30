import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { getChapterById } from '../../data/chapters';
import { getQuiz } from '../../data/quizzes';
import styles from './QuizPage.module.css';

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AnswerState = 'default' | 'selected' | 'correct' | 'incorrect' | 'revealed-correct';

export function QuizPage() {
  const { kapitelId: kapitelIdStr, quizId: quizIdStr } = useParams<{
    kapitelId: string;
    quizId: string;
  }>();
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  const kapitelId = Number(kapitelIdStr);
  const quizId = Number(quizIdStr);
  const chapter = getChapterById(kapitelId);
  const quiz = getQuiz(kapitelId, quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  if (!chapter || !quiz) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const question = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const completedCount = hasChecked ? currentIndex + 1 : currentIndex;

  const handleSelect = (id: number) => {
    if (!hasChecked) setSelectedId(id);
  };

  const handleCheck = () => {
    if (!selectedId) return;
    if (selectedId === question.correctAnswerId) {
      setCorrectCount((n) => n + 1);
    }
    setHasChecked(true);
  };

  const handleAdvance = () => {
    if (isLastQuestion) {
      navigate(`/kapittel/${kapitelId}/quiz/${quizId}/resultat`, {
        state: { correct: correctCount, total: quiz.questions.length, kapitelId, quizId },
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
      setHasChecked(false);
    }
  };

  const getAnswerState = (answerId: number): AnswerState => {
    if (!hasChecked) {
      return selectedId === answerId ? 'selected' : 'default';
    }
    if (answerId === question.correctAnswerId) {
      return selectedId === answerId ? 'correct' : 'revealed-correct';
    }
    if (answerId === selectedId) return 'incorrect';
    return 'default';
  };

  const answerClassName = (answerId: number) => {
    const state = getAnswerState(answerId);
    return [
      styles.answerCard,
      state === 'selected' ? styles.answerSelected : '',
      state === 'correct' ? styles.answerCorrect : '',
      state === 'revealed-correct' ? styles.answerRevealedCorrect : '',
      state === 'incorrect' ? styles.answerIncorrect : '',
      hasChecked ? styles.answerLocked : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  const answerAriaLabel = (answerId: number, text: string) => {
    const state = getAnswerState(answerId);
    if (state === 'correct') return `Riktig svar: ${text}`;
    if (state === 'revealed-correct') return `Riktig svar: ${text}`;
    if (state === 'incorrect') return `Feil svar: ${text}`;
    return text;
  };

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
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
        </div>

        <div className={styles.headerMeta}>
          <TextSizeControl
            onDecrease={decrease}
            onIncrease={increase}
            atMin={atMin}
            atMax={atMax}
          />
        </div>
      </header>

      {/* ── Main content ── */}
      <main className={styles.content}>
        <div className={styles.contentColumn}>

          {/* Progress bar */}
          <div className={styles.progressSection}>
            <div
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={quiz.questions.length}
              aria-label={`Fremgang: ${completedCount} av ${quiz.questions.length} spørsmål besvart`}
              className={styles.progressBar}
            >
              {quiz.questions.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.segment} ${i < completedCount ? styles.segmentFilled : ''}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className={styles.progressCounter} aria-hidden="true">
              {completedCount}/{quiz.questions.length}
            </span>
          </div>

          {/* Question */}
          <div className={styles.questionBlock}>
            <p className={styles.questionText}>{question.question}</p>
            <p className={styles.questionHint}>Velg ett riktig svar</p>
          </div>

          {/* Answer grid */}
          <div
            role="radiogroup"
            aria-label="Velg et svar"
            className={styles.answerGrid}
          >
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                type="button"
                role="radio"
                aria-checked={selectedId === answer.id}
                className={answerClassName(answer.id)}
                onClick={() => handleSelect(answer.id)}
                aria-label={answerAriaLabel(answer.id, answer.text)}
                disabled={hasChecked}
              >
                {answer.text}
              </button>
            ))}
          </div>

          {/* Action button */}
          {hasChecked ? (
            <button
              className={styles.btnSjekk}
              type="button"
              onClick={handleAdvance}
              aria-label={isLastQuestion ? 'Se resultatet av quizen' : 'Gå til neste spørsmål'}
            >
              {isLastQuestion ? 'Se resultat' : 'Neste spørsmål'}
            </button>
          ) : (
            <button
              className={`${styles.btnSjekk} ${!selectedId ? styles.btnSjekkDisabled : ''}`}
              type="button"
              onClick={handleCheck}
              disabled={!selectedId}
              aria-label="Sjekk svaret ditt"
            >
              Sjekk svar
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
