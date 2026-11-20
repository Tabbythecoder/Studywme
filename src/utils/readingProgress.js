/**
 * Reading Progress Manager
 * Persists authentic reading progress (0 - 100%) in localStorage.
 * Only lessons that have been opened and scrolled have progress > 0%.
 */

const STORAGE_KEY = 'studywme_reading_progress';

export function getAllReadingProgress() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getLessonProgress(lessonId) {
  if (!lessonId) return 0;
  const all = getAllReadingProgress();
  return typeof all[lessonId] === 'number' ? all[lessonId] : 0;
}

export function saveLessonProgress(lessonId, percent) {
  if (!lessonId || typeof window === 'undefined') return 0;
  try {
    const all = getAllReadingProgress();
    const current = typeof all[lessonId] === 'number' ? all[lessonId] : 0;
    const clamped = Math.min(100, Math.max(0, Math.round(percent)));
    const highest = Math.max(current, clamped);
    all[lessonId] = highest;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return highest;
  } catch {
    return percent;
  }
}

export function getSubjectReadingStats(subject) {
  if (!subject || !subject.lessons) return { completedCount: 0, overallProgress: 0, startedCount: 0 };
  const all = getAllReadingProgress();
  let totalPercent = 0;
  let completedCount = 0;
  let startedCount = 0;

  subject.lessons.forEach((l) => {
    const p = typeof all[l.id] === 'number' ? all[l.id] : 0;
    totalPercent += p;
    if (p > 0) startedCount++;
    if (p >= 90) completedCount++;
  });

  const overallProgress = subject.lessons.length > 0 
    ? Math.round(totalPercent / subject.lessons.length) 
    : 0;

  return { completedCount, overallProgress, startedCount };
}
