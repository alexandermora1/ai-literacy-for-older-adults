import styles from './TextSizeControl.module.css';

interface TextSizeControlProps {
  onDecrease: () => void;
  onIncrease: () => void;
  atMin: boolean;
  atMax: boolean;
}

export function TextSizeControl({ onDecrease, onIncrease, atMin, atMax }: TextSizeControlProps) {
  return (
    <div className={styles.control} role="group" aria-label="Juster tekststørrelse">
      <button
        className={styles.btn}
        type="button"
        onClick={onDecrease}
        disabled={atMin}
        aria-label="Reduser tekststørrelse"
      >
        −
      </button>
      <button
        className={styles.btn}
        type="button"
        onClick={onIncrease}
        disabled={atMax}
        aria-label="Øk tekststørrelse"
      >
        +
      </button>
      <span className={styles.label} aria-hidden="true">
        Tekststørrelse
      </span>
    </div>
  );
}
