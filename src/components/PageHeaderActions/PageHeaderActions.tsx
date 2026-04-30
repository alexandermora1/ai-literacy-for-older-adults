import styles from './PageHeaderActions.module.css';

export function PageHeaderActions() {
  return (
    <div className={styles.actions}>
      <button
        className={styles.btnPrimary}
        type="button"
        aria-label="Se fremgang i kurset"
      >
        Se fremgang
      </button>
      <button
        className={styles.btnSecondary}
        type="button"
        aria-label="Åpne hjelp"
      >
        Hjelp
      </button>
    </div>
  );
}
