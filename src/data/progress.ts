import { CHAPTERS } from './chapters';

export interface ChapterProgress {
  chapterId: number;
  emnerCompleted: number;
  totalEmner: number;
  quizStars: number;
  isComplete: boolean;
}

export interface Progress {
  earnedBadgeIds: string[];
  chapterProgress: ChapterProgress[];
}

// Placeholder: chapter 1 complete (3 stars), chapter 2 in progress (1 av 4 deler)
export const PLACEHOLDER_PROGRESS: Progress = {
  earnedBadgeIds: ['ki-utforsker', 'lurer-pa-mer', 'enda-bedre', 'grundig'],
  chapterProgress: CHAPTERS.map((ch) => {
    if (ch.id === 1) {
      return {
        chapterId: 1,
        emnerCompleted: ch.topics.length,
        totalEmner: ch.topics.length,
        quizStars: 3,
        isComplete: true,
      };
    }
    if (ch.id === 2) {
      return {
        chapterId: 2,
        emnerCompleted: 1,
        totalEmner: ch.topics.length,
        quizStars: 0,
        isComplete: false,
      };
    }
    return {
      chapterId: ch.id,
      emnerCompleted: 0,
      totalEmner: ch.topics.length,
      quizStars: 0,
      isComplete: false,
    };
  }),
};

export function getTotalStars(progress: Progress): number {
  return progress.chapterProgress.reduce((sum, cp) => sum + cp.quizStars, 0);
}

export const MAX_STARS = 15; // 5 chapters × 3 stars

export function getCompletedChaptersCount(progress: Progress): number {
  return progress.chapterProgress.filter((cp) => cp.isComplete).length;
}
