export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const QUIZ_BADGES: Record<number, Badge> = {
  1: {
    id: 'ki-utforsker',
    name: 'KI-utforsker',
    description: 'Fullførte quizen om Introduksjon til KI',
    icon: '🔭',
  },
  2: {
    id: 'ki-selvtillit',
    name: 'Selvtillit med KI',
    description: 'Fullførte quizen om å bygge selvtillit med KI',
    icon: '💡',
  },
  3: {
    id: 'ki-kreativ',
    name: 'Kreativ med KI',
    description: 'Fullførte quizen om generativ KI',
    icon: '🎨',
  },
  4: {
    id: 'smarthjem-ekspert',
    name: 'Smarthjem-ekspert',
    description: 'Fullførte quizen om KI i smarthjem',
    icon: '🏠',
  },
  5: {
    id: 'ki-trygg',
    name: 'KI-trygg bruker',
    description: 'Fullførte quizen om trygg bruk av KI',
    icon: '🛡️',
  },
};

export function getQuizBadge(chapterId: number, stars: number): Badge | null {
  if (stars === 0) return null;
  return QUIZ_BADGES[chapterId] ?? null;
}
