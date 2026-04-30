import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { TopicCard } from '../../components/TopicCard/TopicCard';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { getChapterById } from '../../data/chapters';
import styles from './EmneoversiktPage.module.css';

function BackArrow() {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 1L1 9L9 17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmneoversiktPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  const chapterId = Number(id);
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return <Navigate to="/kursoversikt" replace />;
  }

  const completedTopics = 0;
  const completedActivities = 0;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      <header className={styles.header}>
        <button
          className={styles.btnBack}
          type="button"
          onClick={() => navigate('/kursoversikt')}
          aria-label="Gå tilbake til kursoversikt"
        >
          <BackArrow />
          <span>Kursoversikt</span>
        </button>

        <h1 className={styles.heading}>{chapter.title}</h1>

        <PageHeaderActions />
      </header>

      <div className={styles.metaRow}>
        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />
      </div>

      <main>
        {chapter.topics.length > 0 && (
          <section aria-labelledby="emner-heading" className={styles.section}>
            <div className={`${styles.sectionPill} ${styles.sectionPillGreen}`}>
              <span className={styles.sectionPillStripe} aria-hidden="true" />
              <span id="emner-heading" className={styles.sectionPillLabel}>
                Emner{' '}
                <span className={styles.sectionPillCount}>
                  · {completedTopics} av {chapter.topics.length} fullført
                </span>
              </span>
            </div>

            <ul className={styles.cardList} aria-label="Emner i dette kapittelet">
              {chapter.topics.map((topic) => (
                <li key={topic.id}>
                  <TopicCard
                    title={topic.title}
                    description={topic.description}
                    variant="emne"
                    onClick={() => navigate(`/kapittel/${chapterId}/emne/${topic.id}`)}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {chapter.activities.length > 0 && (
          <section aria-labelledby="aktiviteter-heading" className={styles.section}>
            <div className={`${styles.sectionPill} ${styles.sectionPillPurple}`}>
              <span className={styles.sectionPillStripe} aria-hidden="true" />
              <span id="aktiviteter-heading" className={styles.sectionPillLabel}>
                Aktiviteter{' '}
                <span className={styles.sectionPillCount}>
                  · {completedActivities} av {chapter.activities.length} fullført
                </span>
              </span>
            </div>

            <ul className={styles.cardList} aria-label="Aktiviteter i dette kapittelet">
              {chapter.activities.map((activity) => (
                <li key={activity.id}>
                  <TopicCard
                    title={activity.title}
                    description={activity.description}
                    variant="aktivitet"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
