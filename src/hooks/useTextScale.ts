import { useState } from 'react';

const FONT_SCALES = [0.875, 1, 1.125, 1.25, 1.375, 1.5] as const;
const DEFAULT_SCALE_INDEX = 1;
const STORAGE_KEY = 'ki-font-scale-index';

export function useTextScale() {
  const [scaleIndex, setScaleIndex] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const n = Number(stored);
      if (n >= 0 && n < FONT_SCALES.length) return n;
    }
    return DEFAULT_SCALE_INDEX;
  });

  const decrease = () =>
    setScaleIndex((i) => {
      const next = Math.max(0, i - 1);
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });

  const increase = () =>
    setScaleIndex((i) => {
      const next = Math.min(FONT_SCALES.length - 1, i + 1);
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });

  return {
    scaleIndex,
    fontScale: FONT_SCALES[scaleIndex] as number,
    decrease,
    increase,
    atMin: scaleIndex === 0,
    atMax: scaleIndex === FONT_SCALES.length - 1,
  };
}
