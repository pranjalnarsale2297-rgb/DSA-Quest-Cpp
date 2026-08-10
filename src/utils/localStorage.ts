import { UserProgress, UserSettings, UserLevelName } from '../types';
import { BADGES } from '../data/badgesData';

const PROGRESS_KEY = 'dsa_quest_progress_v1';
const SETTINGS_KEY = 'dsa_quest_settings_v1';

export const LEVEL_THRESHOLDS: { level: number; name: UserLevelName; minXp: number }[] = [
  { level: 1, name: 'Beginner', minXp: 0 },
  { level: 2, name: 'Explorer', minXp: 150 },
  { level: 3, name: 'Coder', minXp: 400 },
  { level: 4, name: 'Algorithm Apprentice', minXp: 800 },
  { level: 5, name: 'DSA Warrior', minXp: 1400 },
  { level: 6, name: 'Problem Solver', minXp: 2200 },
  { level: 7, name: 'DSA Master', minXp: 3200 },
];

export function calculateLevel(xp: number): { level: number; levelName: UserLevelName; currentLevelXp: number; nextLevelXp: number; progressPercent: number } {
  let currentLevelObj = LEVEL_THRESHOLDS[0];
  let nextLevelObj = LEVEL_THRESHOLDS[1];

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].minXp) {
      currentLevelObj = LEVEL_THRESHOLDS[i];
      nextLevelObj = LEVEL_THRESHOLDS[i + 1] || { level: 8, name: 'DSA Master', minXp: 5000 };
      break;
    }
  }

  const range = nextLevelObj.minXp - currentLevelObj.minXp;
  const xpInLevel = xp - currentLevelObj.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.floor((xpInLevel / range) * 100)));

  return {
    level: currentLevelObj.level,
    levelName: currentLevelObj.name,
    currentLevelXp: currentLevelObj.minXp,
    nextLevelXp: nextLevelObj.minXp,
    progressPercent,
  };
}

const DEFAULT_PROGRESS: UserProgress = {
  xp: 120, // Initial boost for demo
  level: 1,
  levelName: 'Beginner',
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedTopics: ['cpp_basics'],
  completedGames: [],
  completedChallenges: [],
  unlockedBadges: ['badge_first_step'],
  quizScores: {
    cpp_basics: 100,
  },
  codeSolutions: {},
  currentTopicId: 'arrays',
};

const DEFAULT_SETTINGS: UserSettings = {
  darkMode: true,
  soundEnabled: true,
  animationsEnabled: true,
};

export function getStoredProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      saveProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    
    // Auto streak verify
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        parsed.streakDays = 1; // reset streak if missed a day
      }
      parsed.lastActiveDate = today;
      saveProgress(parsed);
    }
    return parsed;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export const getUserProgress = getStoredProgress;

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const levelInfo = calculateLevel(progress.xp);
    progress.level = levelInfo.level;
    progress.levelName = levelInfo.levelName;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

export const saveUserProgress = saveProgress;

export function getStoredSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export const getUserSettings = getStoredSettings;

export function saveSettings(settings: UserSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
}

export const saveUserSettings = saveSettings;

export function addXp(amount: number): UserProgress {
  const current = getStoredProgress();
  const newXP = current.xp + amount;
  const newLevelInfo = calculateLevel(newXP);

  current.xp = newXP;
  current.level = newLevelInfo.level;
  current.levelName = newLevelInfo.levelName;

  // Bump streak on activity
  const today = new Date().toISOString().split('T')[0];
  if (current.lastActiveDate !== today) {
    current.streakDays += 1;
    current.lastActiveDate = today;
  }

  saveProgress(current);
  return current;
}

export const addXP = addXp;

export function checkBadgeUnlocks(progress: UserProgress): string[] {
  const newlyUnlocked: string[] = [];

  BADGES.forEach((badge) => {
    if (progress.unlockedBadges.includes(badge.id)) return;

    if (badge.id === 'badge_first_step' && progress.completedTopics.length >= 1) {
      newlyUnlocked.push(badge.id);
    } else if (badge.id === 'badge_array_master' && progress.completedTopics.includes('arrays')) {
      newlyUnlocked.push(badge.id);
    } else if (badge.id === 'badge_streak_3' && progress.streakDays >= 3) {
      newlyUnlocked.push(badge.id);
    } else if (badge.id === 'badge_level_5' && progress.level >= 5) {
      newlyUnlocked.push(badge.id);
    } else if (badge.id === 'badge_game_champion' && progress.completedGames.length >= 3) {
      newlyUnlocked.push(badge.id);
    } else if (badge.id === 'badge_coder' && progress.completedChallenges.length >= 1) {
      newlyUnlocked.push(badge.id);
    }
  });

  return newlyUnlocked;
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // fallback
  }
}
