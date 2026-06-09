import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ScrollProgressBar } from '../../components/ScrollProgressBar/ScrollProgressBar';
import { PageHeaderActions } from '../../components/PageHeaderActions/PageHeaderActions';
import { TextSizeControl } from '../../components/TextSizeControl/TextSizeControl';
import { useTextScale } from '../../hooks/useTextScale';
import { useProgress } from '../../hooks/useProgress';
import { getChapterById } from '../../data/chapters';
import { getTopicContent } from '../../data/content';
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

  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    setHasReachedBottom(false);
    let marked = false;

    const checkBottom = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled >= total - 50) {
        setHasReachedBottom(true);
        if (!marked) {
          marked = true;
          markEmneVisited(kapitelId, emneId);
        }
      }
    };

    const timeout = setTimeout(checkBottom, 100);
    window.addEventListener('scroll', checkBottom, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', checkBottom);
    };
  // markEmneVisited intentionally excluded — stable enough for a one-shot call per emne
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kapitelId, emneId]);
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
        <ScrollProgressBar />
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
                {topic.estimertTid ?? 'Ca. 3 min'}
              </span>
            </div>
          </div>

          {/* Body content */}
          <div className={styles.body}>
            {getTopicContent(kapitelId, emneId).map((block, i) => {
              if (block.type === 'lead') {
                return <p key={i} className={styles.leadParagraph}>{block.text}</p>;
              }
              if (block.type === 'heading') {
                return <h2 key={i} className={styles.sectionHeading}>{block.text}</h2>;
              }
              if (block.type === 'subheading') {
                return <p key={i} className={styles.subHeading}>{block.text}</p>;
              }
              if (block.type === 'rich-paragraph') {
                return (
                  <p key={i} className={styles.paragraph}>
                    {block.segments.map((seg, j) =>
                      seg.href ? (
                        <a key={j} href={seg.href} className={styles.inlineLink} target="_blank" rel="noopener noreferrer">{seg.text}</a>
                      ) : seg.italic ? (
                        <em key={j}>{seg.text}</em>
                      ) : (
                        <span key={j}>{seg.text}</span>
                      )
                    )}
                  </p>
                );
              }
              if (block.type === 'italic-paragraph') {
                return <p key={i} className={styles.italicParagraph}>{block.text}</p>;
              }
              if (block.type === 'bullet-list') {
                return (
                  <ul key={i} className={styles.bulletList}>
                    {block.items.map((item, j) => (
                      <li key={j} className={styles.bulletItem}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'paragraph') {
                return <p key={i} className={styles.paragraph}>{block.text}</p>;
              }
              if (block.type === 'sources') {
                return (
                  <aside key={i} className={styles.sources}>
                    <p className={styles.sourcesTitle}>{block.title}</p>
                    {block.items.map((segments, j) => (
                      <p key={j} className={styles.sourceItem}>
                        {segments.map((seg, k) =>
                          seg.href ? (
                            <a key={k} href={seg.href} className={styles.inlineLink} target="_blank" rel="noopener noreferrer">{seg.text}</a>
                          ) : seg.italic ? (
                            <em key={k}>{seg.text}</em>
                          ) : (
                            <span key={k}>{seg.text}</span>
                          )
                        )}
                      </p>
                    ))}
                  </aside>
                );
              }
              return null;
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
            disabled={!hasReachedBottom}
            onClick={() => navigate(`/kapittel/${kapitelId}`)}
            aria-label="Fullfør emnet og gå tilbake til emneoversikt"
          >
            Tilbake til emneoversikt
          </button>
        ) : (
          <button
            className={styles.btnNext}
            type="button"
            disabled={!hasReachedBottom}
            onClick={() => navigate(`/kapittel/${kapitelId}/emne/${nextId}`)}
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
