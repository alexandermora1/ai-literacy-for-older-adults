import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { getChapterById } from '../../data/chapters';
import styles from './EmneoversiktPage.module.css';

function BackArrow() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true" focusable="false">
      <path d="M9 1L1 9L9 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function plural(count: number, singular: string, pluralForm: string): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

export function EmneoversiktPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  const chapterId = Number(id);
  const chapter = getChapterById(chapterId);
  const { getVisitedEmneCount, isEmneVisited, getQuizResult } = useProgress();

  if (!chapter) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const completedTopics = getVisitedEmneCount(chapterId);
  const completedActivities = chapter.activities.filter(
    (a) => a.type === 'quiz' && getQuizResult(chapterId, a.id)?.completed === true,
  ).length;
  const hasTopics = chapter.topics.length > 0;
  const hasActivities = chapter.activities.length > 0;

  const subtitle = `Det er ${plural(chapter.topics.length, 'emne', 'emner')} og ${plural(
    chapter.activities.length,
    'aktivitet',
    'aktiviteter'
  )} i dette kapittelet.`;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Header: back | TextSizeControl | actions ── */}
      <header className={styles.header}>
        <button
          className={styles.btnBack}
          type="button"
          onClick={() => navigate('/kursoversikt')}
          aria-label="Gå tilbake til kursoversikt"
        >
          <BackArrow />
          <span>Tilbake til kursoversikt</span>
        </button>

        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />

        <PageHeaderActions />
      </header>

      {/* ── Page content ── */}
      <main className={styles.content}>
        <h1 className={styles.heading}>{chapter.title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={`${styles.columnsRow} ${!hasTopics || !hasActivities ? styles.singleColumn : ''}`}>

          {/* Emner column */}
          {hasTopics && (
            <section className={styles.column} aria-labelledby="emner-heading">
              <h2 id="emner-heading" className={`${styles.columnLabel} ${styles.emneLabel}`}>
                Start på første emne og les de i rekkefølge
              </h2>
              <ul className={styles.cardList} role="list">
                {chapter.topics.map((topic, i) => (
                  <li key={topic.id}>
                    <TopicCard
                      title={`${i + 1}. ${topic.title}`}
                      description={topic.description}
                      variant="emne"
                      isCompleted={isEmneVisited(chapterId, topic.id)}
                      onClick={() => navigate(`/kapittel/${chapterId}/emne/${topic.id}`)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Aktiviteter column */}
          {hasActivities && (
            <section className={styles.column} aria-labelledby="aktiviteter-heading">
              <h2 id="aktiviteter-heading" className={`${styles.columnLabel} ${styles.aktivitetLabel}`}>
                Ta quiz og aktiviteter når du har lest om alle emnene
              </h2>
              <ul className={styles.cardList} role="list">
                {chapter.activities.map((activity) => (
                  <li key={activity.id}>
                    <TopicCard
                      title={activity.title}
                      description={activity.description}
                      variant="aktivitet"
                      isCompleted={
                        activity.type === 'quiz' &&
                        getQuizResult(chapterId, activity.id)?.completed === true
                      }
                      onClick={
                        activity.type === 'quiz'
                          ? () => navigate(`/kapittel/${chapterId}/quiz/${activity.id}`)
                          : undefined
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
