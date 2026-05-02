export interface Badge {
  id: string;
  name: string;
  description: string;
  unlockHint: string;
  icon: string;
}

// 5 Kapittelmerker — one per chapter 1–5
const KAPITTEL_BADGES: Record<number, Badge> = {
  1: {
    id: 'ki-utforsker',
    name: 'KI-utforsker',
    description: 'Fullførte Introduksjon til KI',
    unlockHint: 'Fullfør kapittel 1',
    icon: '🔭',
  },
  2: {
    id: 'trygg-pa-teknologi',
    name: 'Trygg på teknologi',
    description: 'Fullførte Bygge selvtillit med KI',
    unlockHint: 'Fullfør kapittel 2',
    icon: '💡',
  },
  3: {
    id: 'ki-skaper',
    name: 'KI-skaper',
    description: 'Fullførte Generativ KI',
    unlockHint: 'Fullfør kapittel 3',
    icon: '🎨',
  },
  4: {
    id: 'smarthjemekspert',
    name: 'Smarthjemekspert',
    description: 'Fullførte KI i smarthjem',
    unlockHint: 'Fullfør kapittel 4',
    icon: '🏠',
  },
  5: {
    id: 'sikkerhetsekspert',
    name: 'Sikkerhetsekspert',
    description: 'Fullførte Hold deg trygg med KI',
    unlockHint: 'Fullfør kapittel 5',
    icon: '🛡️',
  },
};

// 5 Spesialmerker — awarded for revisiting and improving
const SPESIAL_BADGES: Badge[] = [
  {
    id: 'ki-kjenner',
    name: 'KI-kjenner',
    description: 'Fullførte alle kapitler i kurset',
    unlockHint: 'Fullfør alle kapitler',
    icon: '🎓',
  },
  {
    id: 'ki-veteran',
    name: 'KI-veteran',
    description: 'Gjentok alle kapitler',
    unlockHint: 'Gjenta alle kapitler',
    icon: '🏆',
  },
  {
    id: 'grundig',
    name: 'Grundig!',
    description: 'Gjentok ett helt kapittel',
    unlockHint: 'Gjenta ett kapittel',
    icon: '📚',
  },
  {
    id: 'lurer-pa-mer',
    name: 'Lurer på mer',
    description: 'Gjentok et emne',
    unlockHint: 'Gjenta et emne',
    icon: '🔍',
  },
  {
    id: 'enda-bedre',
    name: 'Enda bedre!',
    description: 'Forbedret et quizresultat',
    unlockHint: 'Forbedre et quizresultat',
    icon: '⬆️',
  },
];

export function getAllKapittelBadges(): Badge[] {
  return Object.values(KAPITTEL_BADGES);
}

export function getAllSpesialBadges(): Badge[] {
  return SPESIAL_BADGES;
}

export function getQuizBadge(chapterId: number, stars: number): Badge | null {
  if (stars === 0) return null;
  return KAPITTEL_BADGES[chapterId] ?? null;
}

const ALL_BADGES_BY_ID: Record<string, Badge> = Object.fromEntries(
  [...Object.values(KAPITTEL_BADGES), ...SPESIAL_BADGES].map((b) => [b.id, b]),
);

export function getBadgeById(id: string): Badge | undefined {
  return ALL_BADGES_BY_ID[id];
}
