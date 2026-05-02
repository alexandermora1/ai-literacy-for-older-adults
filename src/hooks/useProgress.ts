import { useCallback, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type KapittelStatus = 'ikke-startet' | 'igang' | 'fullført';

export interface QuizResult {
  score: number;        // best score ever for this quiz
  totalQuestions: number;
  completed: boolean;
  attemptCount: number;
}

export interface KapittelProgress {
  status: KapittelStatus;
  stars: number;
  visitedEmneIds: number[];
  emneVisitCounts: Record<number, number>;
  quizResults: Record<number, QuizResult>;
}

export interface ProgressData {
  kapitler: Record<number, KapittelProgress>;
  earnedBadgeIds: string[];
}

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ki-kurs-fremgang';
const PENDING_BADGES_KEY = 'ki-kurs-ny-merke';

function makeInitialState(): ProgressData {
  return { kapitler: {}, earnedBadgeIds: [] };
}

function loadFromStorage(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return makeInitialState();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (typeof parsed !== 'object' || parsed === null) return makeInitialState();
    return {
      kapitler:
        typeof parsed.kapitler === 'object' && parsed.kapitler !== null
          ? (parsed.kapitler as Record<number, KapittelProgress>)
          : {},
      earnedBadgeIds: Array.isArray(parsed.earnedBadgeIds)
        ? (parsed.earnedBadgeIds as string[])
        : [],
    };
  } catch {
    return makeInitialState();
  }
}

function saveToStorage(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded or storage unavailable — fail silently
  }
}

// Standalone export for use in tests / dev tooling outside React
export function resetProgress(): void {
  saveToStorage(makeInitialState());
  try { localStorage.removeItem(PENDING_BADGES_KEY); } catch { /* ignore */ }
}

function loadPendingBadges(): string[] {
  try {
    const raw = localStorage.getItem(PENDING_BADGES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function savePendingBadges(ids: string[]): void {
  try {
    if (ids.length === 0) {
      localStorage.removeItem(PENDING_BADGES_KEY);
    } else {
      localStorage.setItem(PENDING_BADGES_KEY, JSON.stringify(ids));
    }
  } catch { /* ignore */ }
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function emptyKapittel(): KapittelProgress {
  return {
    status: 'ikke-startet',
    stars: 0,
    visitedEmneIds: [],
    emneVisitCounts: {},
    quizResults: {},
  };
}

// Merges stored record with defaults so older stored data without new fields still works
function getKp(data: ProgressData, kapitelId: number): KapittelProgress {
  const stored = data.kapitler[kapitelId];
  if (!stored) return emptyKapittel();
  return {
    ...emptyKapittel(),
    ...stored,
    emneVisitCounts: stored.emneVisitCounts ?? {},
    quizResults: stored.quizResults ?? {},
  };
}

function starsForScore(score: number, total: number): number {
  if (total === 0 || score === 0) return 0;
  if (score >= total) return 3;
  if (score >= 2) return 2;
  return 1;
}

// ─── Badge logic ──────────────────────────────────────────────────────────────

const KAPITTEL_QUIZ_ID = 1; // each chapter has exactly one quiz with id 1

const KAPITTEL_BADGE_MAP: [number, string][] = [
  [1, 'ki-utforsker'],
  [2, 'trygg-pa-teknologi'],
  [3, 'ki-skaper'],
  [4, 'smarthjemekspert'],
  [5, 'sikkerhetsekspert'],
];

function checkBadges(data: ProgressData, isScoreImprovement: boolean): string[] {
  const earned = new Set(data.earnedBadgeIds);

  // Kapittelmerker — one per chapter, unlocked when quiz is completed (score >= 1)
  for (const [id, badgeId] of KAPITTEL_BADGE_MAP) {
    if (getKp(data, id).status === 'fullført') earned.add(badgeId);
  }

  // ki-kjenner — all 5 chapters completed
  if (KAPITTEL_BADGE_MAP.every(([id]) => getKp(data, id).status === 'fullført')) {
    earned.add('ki-kjenner');
  }

  // ki-veteran — every one of the 5 chapter quizzes completed more than once
  if (
    KAPITTEL_BADGE_MAP.every(
      ([id]) => (getKp(data, id).quizResults[KAPITTEL_QUIZ_ID]?.attemptCount ?? 0) > 1,
    )
  ) {
    earned.add('ki-veteran');
  }

  // grundig — any chapter quiz completed more than once
  if (
    KAPITTEL_BADGE_MAP.some(
      ([id]) => (getKp(data, id).quizResults[KAPITTEL_QUIZ_ID]?.attemptCount ?? 0) > 1,
    )
  ) {
    earned.add('grundig');
  }

  // lurer-pa-mer — any emne visited more than once
  const anyEmneRevisited = Object.values(data.kapitler).some((kp) =>
    Object.values(kp.emneVisitCounts ?? {}).some((count) => count > 1),
  );
  if (anyEmneRevisited) earned.add('lurer-pa-mer');

  // enda-bedre — score improved vs previous best attempt
  if (isScoreImprovement) earned.add('enda-bedre');

  return Array.from(earned);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseProgressReturn {
  // Per-kapittel readers
  getKapittelStatus: (kapitelId: number) => KapittelStatus;
  getKapittelStars: (kapitelId: number) => number;
  getVisitedEmneCount: (kapitelId: number) => number;
  getQuizResult: (kapitelId: number, quizId: number) => QuizResult | null;
  isEmneVisited: (kapitelId: number, emneId: number) => boolean;
  // Aggregate
  totalStars: number;
  earnedBadges: string[];
  newlyEarnedBadges: string[];
  // Writers
  markEmneVisited: (kapitelId: number, emneId: number) => void;
  saveQuizResult: (kapitelId: number, quizId: number, score: number, totalQuestions: number) => void;
  clearNewlyEarned: () => void;
  resetProgress: () => void;
}

export function useProgress(): UseProgressReturn {
  const [data, setData] = useState<ProgressData>(loadFromStorage);
  const [newlyEarnedBadges, setNewlyEarnedBadges] = useState<string[]>(loadPendingBadges);

  const getKapittelStatus = useCallback(
    (kapitelId: number): KapittelStatus => getKp(data, kapitelId).status,
    [data],
  );

  const getKapittelStars = useCallback(
    (kapitelId: number): number => getKp(data, kapitelId).stars,
    [data],
  );

  const getVisitedEmneCount = useCallback(
    (kapitelId: number): number => getKp(data, kapitelId).visitedEmneIds.length,
    [data],
  );

  const getQuizResult = useCallback(
    (kapitelId: number, quizId: number): QuizResult | null =>
      getKp(data, kapitelId).quizResults[quizId] ?? null,
    [data],
  );

  const isEmneVisited = useCallback(
    (kapitelId: number, emneId: number): boolean =>
      getKp(data, kapitelId).visitedEmneIds.includes(emneId),
    [data],
  );

  const totalStars = Object.values(data.kapitler).reduce((sum, kp) => sum + kp.stars, 0);

  // markEmneVisited — increments visit count; sets kapittel 'igang' on first ever visit
  const markEmneVisited = useCallback(
    (kapitelId: number, emneId: number) => {
      const kp = getKp(data, kapitelId);
      const prevCount = kp.emneVisitCounts[emneId] ?? 0;
      const alreadyVisited = kp.visitedEmneIds.includes(emneId);

      const newKp: KapittelProgress = {
        ...kp,
        status: kp.status === 'ikke-startet' ? 'igang' : kp.status,
        visitedEmneIds: alreadyVisited ? kp.visitedEmneIds : [...kp.visitedEmneIds, emneId],
        emneVisitCounts: { ...kp.emneVisitCounts, [emneId]: prevCount + 1 },
      };

      const newData: ProgressData = {
        ...data,
        kapitler: { ...data.kapitler, [kapitelId]: newKp },
      };

      setData(newData);
      saveToStorage(newData);
    },
    [data],
  );

  // saveQuizResult — persists result, runs badge checks, surfaces newly earned badges
  const saveQuizResult = useCallback(
    (kapitelId: number, quizId: number, score: number, totalQuestions: number) => {
      const kp = getKp(data, kapitelId);
      const previousResult = kp.quizResults[quizId];
      const previousBest = previousResult?.score ?? 0;
      const isScoreImprovement = previousResult?.completed === true && score > previousBest;
      const newStars = starsForScore(score, totalQuestions);

      const newKp: KapittelProgress = {
        ...kp,
        status:
          score >= 1 || kp.status === 'fullført'
            ? 'fullført'
            : kp.status === 'ikke-startet'
              ? 'igang'
              : kp.status,
        stars: Math.max(kp.stars, newStars),
        quizResults: {
          ...kp.quizResults,
          [quizId]: {
            score: Math.max(previousBest, score),
            totalQuestions,
            completed: true,
            attemptCount: (previousResult?.attemptCount ?? 0) + 1,
          },
        },
      };

      const intermediate: ProgressData = {
        ...data,
        kapitler: { ...data.kapitler, [kapitelId]: newKp },
      };

      const newEarnedIds = checkBadges(intermediate, isScoreImprovement);
      const prevEarnedSet = new Set(data.earnedBadgeIds);
      const newlyEarned = newEarnedIds.filter((id) => !prevEarnedSet.has(id));

      const finalData: ProgressData = { ...intermediate, earnedBadgeIds: newEarnedIds };

      setData(finalData);
      saveToStorage(finalData);
      savePendingBadges(newlyEarned);
      setNewlyEarnedBadges(newlyEarned);
    },
    [data],
  );

  const clearNewlyEarned = useCallback(() => {
    savePendingBadges([]);
    setNewlyEarnedBadges([]);
  }, []);

  const reset = useCallback(() => {
    const initial = makeInitialState();
    saveToStorage(initial);
    savePendingBadges([]);
    setData(initial);
    setNewlyEarnedBadges([]);
  }, []);

  return {
    getKapittelStatus,
    getKapittelStars,
    getVisitedEmneCount,
    getQuizResult,
    isEmneVisited,
    totalStars,
    earnedBadges: data.earnedBadgeIds,
    newlyEarnedBadges,
    markEmneVisited,
    saveQuizResult,
    clearNewlyEarned,
    resetProgress: reset,
  };
}
