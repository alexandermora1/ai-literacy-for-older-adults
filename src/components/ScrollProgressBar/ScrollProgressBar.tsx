import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ScrollProgressBar.module.css';

export function ScrollProgressBar() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }
      // Progress = how much of the full page has been seen (viewport bottom position)
      setProgress(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  );
}
