import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { getChapterById } from '../../data/chapters';
import { getQuiz, type QuizAnswerRecord } from '../../data/quizzes';
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
  const { fontScale } = useTextScale();
  const progress = useProgress();

  const kapitelId = Number(kapitelIdStr);
  const quizId = Number(quizIdStr);
  const chapter = getChapterById(kapitelId);
  const quiz = getQuiz(kapitelId, quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);

  if (!chapter || !quiz) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const question = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;
  const total = quiz.questions.length;

  const handleSelect = (id: number) => {
    if (!hasChecked) setSelectedId(id);
  };

  const handleCheck = () => {
    if (!selectedId) return;
    const isCorrect = selectedId === question.correctAnswerId;
    if (isCorrect) setCorrectCount((n) => n + 1);
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, selectedAnswerId: selectedId, correct: isCorrect },
    ]);
    setHasChecked(true);
  };

  const handleAdvance = () => {
    if (isLastQuestion) {
      const score = correctCount;
      const stars = score === 0 ? 0 : score >= total ? 3 : score >= 2 ? 2 : 1;
      progress.saveQuizResult(kapitelId, quizId, score, total);
      navigate(`/kapittel/${kapitelId}/quiz/${quizId}/resultat`, {
        state: { correct: score, total, stars, kapitelId, quizId, answers },
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
      {/* ── Minimal header — back button only ── */}
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
      </header>

      {/* ── Main content ── */}
      <main className={styles.content}>
        <div className={styles.contentColumn}>

          {/* Page title */}
          <h1 className={styles.heading}>
            Quiz - Kapittel {kapitelId}: {chapter.title}
          </h1>

          {/* Dot progress track */}
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Spørsmål ${currentIndex + 1} av ${total}`}
          >
            {quiz.questions.map((_, i) => (
              <div key={i} className={styles.dotWrapper} aria-hidden="true">
                <div
                  className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                />
                {i === currentIndex && (
                  <span className={styles.dotLabel}>
                    {currentIndex + 1}/{total}
                  </span>
                )}
              </div>
            ))}
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
            {question.answers.map((answer) => {
              const state = getAnswerState(answer.id);
              return (
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
                  <span>{answer.text}</span>
                  {state === 'correct' && (
                    <span className={styles.feedbackCorrect} aria-hidden="true">Riktig!</span>
                  )}
                  {state === 'revealed-correct' && (
                    <span className={styles.feedbackCorrect} aria-hidden="true">Dette er det riktige svaret</span>
                  )}
                  {state === 'incorrect' && (
                    <span className={styles.feedbackIncorrect} aria-hidden="true">Feil</span>
                  )}
                </button>
              );
            })}
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
