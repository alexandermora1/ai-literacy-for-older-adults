import { useNavigate } from 'react-router-dom';
import { ModuleCard } from '../../components/ModuleCard/ModuleCard';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import styles from './KursoversiktPage.module.css';

interface ModuleConfig {
  chapterNumber: number;
  title: string;
  icon: string;
  completedTopics: number;
  totalTopics: number;
  variant: 'completed' | 'in-progress';
  stars?: number;
  completionLabel?: string;
}

const MODULES: ModuleConfig[] = [
  {
    chapterNumber: 1,
    title: 'Introduksjon til KI',
    icon: '🤖',
    completedTopics: 5,
    totalTopics: 5,
    variant: 'completed',
    stars: 3,
  },
  {
    chapterNumber: 2,
    title: 'Bygge selvtillit med KI',
    icon: '💪',
    completedTopics: 1,
    totalTopics: 4,
    variant: 'in-progress',
  },
  {
    chapterNumber: 3,
    title: 'Generativ KI',
    icon: '✨',
    completedTopics: 0,
    totalTopics: 4,
    variant: 'in-progress',
  },
  {
    chapterNumber: 4,
    title: 'KI i smarthjem',
    icon: '🏠',
    completedTopics: 0,
    totalTopics: 4,
    variant: 'in-progress',
  },
  {
    chapterNumber: 5,
    title: 'Hold deg trygg med KI',
    icon: '🛡️',
    completedTopics: 0,
    totalTopics: 4,
    variant: 'in-progress',
  },
  {
    chapterNumber: 6,
    title: 'Avslutt kurset',
    icon: '🏁',
    completedTopics: 0,
    totalTopics: 0,
    variant: 'in-progress',
    completionLabel: 'Ta det avsluttende spørreskjemaet og fullfør kurset',
  },
];

export function KursoversiktPage() {
  const navigate = useNavigate();
  const { fontScale, decrease, increase, atMin, atMax } = useTextScale();

  return (
    <div
      className={styles.page}
      style={{ '--font-scale': fontScale } as React.CSSProperties}
    >
      <header className={styles.header}>
        <h1 className={styles.heading}>Kursoversikt</h1>
        <PageHeaderActions />
      </header>

      <div className={styles.metaRow}>
        <p className={styles.progressSummary} aria-live="polite">
          <span>4 av 10 merker</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span>3 av 15 stjerner</span>
          <span className={styles.dot} aria-hidden="true">·</span>
          <span>1 av 6 kapitler fullført</span>
        </p>

        <TextSizeControl
          onDecrease={decrease}
          onIncrease={increase}
          atMin={atMin}
          atMax={atMax}
        />
      </div>

      <main>
        <ul className={styles.grid} aria-label="Kursmoduler">
          {MODULES.map((mod) => (
            <li key={mod.chapterNumber} className={styles.gridCell}>
              <ModuleCard
                title={mod.title}
                chapterNumber={mod.chapterNumber}
                completedTopics={mod.completedTopics}
                totalTopics={mod.totalTopics}
                icon={mod.icon}
                variant={mod.variant}
                stars={mod.stars}
                completionLabel={mod.completionLabel}
                onClick={() => navigate(`/kapittel/${mod.chapterNumber}`)}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
