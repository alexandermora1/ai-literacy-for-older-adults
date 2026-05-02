import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../../components/ModuleCard/ModuleCard';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { CHAPTERS } from '../../data/chapters';
import { getAllKapittelBadges, getAllSpesialBadges } from '../../data/badges';
import { MAX_STARS } from '../../data/progress';
import styles from './KursoversiktPage.module.css';

const TOTAL_BADGES = getAllKapittelBadges().length + getAllSpesialBadges().length;

export function KursoversiktPage() {
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();
  const progress = useProgress();

  const totalStars = progress.totalStars;
  const completedChapters = CHAPTERS.filter(
    (ch) => progress.getKapittelStatus(ch.id) === 'fullført',
  ).length;
  const earnedBadges = progress.earnedBadges.length;

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      {/* ── Top bar: controls right-aligned ── */}
      <div className={styles.topBar}>
        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />
        <PageHeaderActions />
      </div>

      {/* ── Heading row: title left + stats right ── */}
      <div className={styles.headingRow}>
        <h1 className={styles.heading}>Kursoversikt</h1>
        <p className={styles.stats} aria-live="polite">
          <span>{completedChapters} av {CHAPTERS.length} kapitler fullført</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span>{totalStars} av {MAX_STARS} stjerner</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span>{earnedBadges} av {TOTAL_BADGES} merker</span>
        </p>
      </div>

      <main>
        <ul className={styles.grid} aria-label="Kursmoduler">
          {CHAPTERS.map((chapter) => {
            const status = progress.getKapittelStatus(chapter.id);
            const isCompleted = status === 'fullført';
            const stars = progress.getKapittelStars(chapter.id);
            const visitedCount = progress.getVisitedEmneCount(chapter.id);
            const totalTopics = chapter.topics.length;
            const completionLabel =
              totalTopics === 0 ? chapter.activities[0]?.description : undefined;

            return (
              <li key={chapter.id} className={styles.gridCell}>
                <ModuleCard
                  title={chapter.title}
                  chapterNumber={chapter.id}
                  completedTopics={isCompleted ? totalTopics : visitedCount}
                  totalTopics={totalTopics}
                  icon={chapter.icon}
                  variant={isCompleted ? 'completed' : 'in-progress'}
                  stars={stars}
                  completionLabel={completionLabel}
                  onClick={() => navigate(`/kapittel/${chapter.id}`)}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
