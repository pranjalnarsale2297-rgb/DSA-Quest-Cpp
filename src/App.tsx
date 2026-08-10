import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LevelUpModal } from './components/LevelUpModal';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { LessonPage } from './pages/LessonPage';
import { GamesPage } from './pages/GamesPage';
import { CodingPage } from './pages/CodingPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { BadgesPage } from './pages/BadgesPage';
import { ProgressPage } from './pages/ProgressPage';
import { ComplexityPage } from './pages/ComplexityPage';
import { SettingsPage } from './pages/SettingsPage';
import {
  getUserProgress,
  saveUserProgress,
  getUserSettings,
  saveUserSettings,
  addXp,
  calculateLevel,
  checkBadgeUnlocks,
} from './utils/localStorage';
import { soundManager } from './utils/audio';
import { UserProgress, UserSettings } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<string>('landing');
  const [activeTopicId, setActiveTopicId] = useState<string>('arrays');
  const [activeChallengeId, setActiveChallengeId] = useState<string>('two_sum_sim');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState<UserProgress>(getUserProgress());
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());

  // Celebration Modal state
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    xpEarned?: number;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Sync audio state with soundManager
  useEffect(() => {
    soundManager.setSoundEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  const handleNavigate = (page: string, topicId?: string) => {
    setActivePage(page);
    if (topicId) setActiveTopicId(topicId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const updated = { ...settings, soundEnabled: !settings.soundEnabled };
    setSettings(updated);
    saveUserSettings(updated);
    soundManager.setSoundEnabled(updated.soundEnabled);
    if (updated.soundEnabled) soundManager.playClick();
  };

  const handleUpdateSettings = (newSet: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSet };
    setSettings(updated);
    saveUserSettings(updated);
  };

  const handleResetProgress = () => {
    localStorage.removeItem('dsa_quest_progress_v1');
    const fresh = getUserProgress();
    setProgress(fresh);
  };

  // Generic XP gain helper that checks level up & badge unlocks
  const handleAwardXp = (amount: number, reasonTitle: string, reasonMsg: string) => {
    const oldLevel = progress.level;
    const updated = addXp(amount);

    // Check unlocked badges
    const newBadges = checkBadgeUnlocks(updated);
    updated.unlockedBadges = Array.from(new Set([...updated.unlockedBadges, ...newBadges]));
    saveUserProgress(updated);
    setProgress(updated);

    const levelInfo = calculateLevel(updated.xp);

    if (levelInfo.level > oldLevel) {
      if (settings.soundEnabled) soundManager.playLevelUp();
      setModalState({
        isOpen: true,
        title: `🎉 LEVEL UP! Level ${levelInfo.level}: ${levelInfo.levelName}`,
        message: `Congratulations! You unlocked Level ${levelInfo.level} in DSA Quest! Keep building your C++ algorithm skills!`,
        xpEarned: amount,
      });
    } else {
      setModalState({
        isOpen: true,
        title: reasonTitle,
        message: reasonMsg,
        xpEarned: amount,
      });
    }
  };

  const handleCompleteTopic = (topicId: string, xpEarned: number) => {
    const completedList = Array.from(new Set([...progress.completedTopics, topicId]));
    const updatedProgress = { ...progress, completedTopics: completedList, currentTopicId: topicId };
    saveUserProgress(updatedProgress);
    setProgress(updatedProgress);

    handleAwardXp(
      xpEarned,
      '🌟 Topic Completed!',
      `You successfully mastered ${topicId.toUpperCase().replace('_', ' ')}!`
    );
  };

  const handleSolveChallenge = (challengeId: string, xpReward: number) => {
    const completedList = Array.from(new Set([...progress.completedChallenges, challengeId]));
    const updatedProgress = { ...progress, completedChallenges: completedList };
    saveUserProgress(updatedProgress);
    setProgress(updatedProgress);

    handleAwardXp(
      xpReward,
      '🔥 C++ Challenge Solved!',
      'Great work! All C++ test cases passed successfully!'
    );
  };

  const handleCompleteQuiz = (xpEarned: number) => {
    handleAwardXp(
      xpEarned,
      '🧠 Quiz Completed!',
      `You earned ${xpEarned} XP on this knowledge check!`
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        progress={progress}
        settings={settings}
        onToggleSound={handleToggleSound}
        onOpenMobileNav={() => setIsMobileNavOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Shell with Sidebar */}
      <div className="flex-1 flex">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          isMobileOpen={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
        />

        {/* Page Views router */}
        <main className="flex-1 overflow-x-hidden">
          {activePage === 'landing' && (
            <LandingPage
              progress={progress}
              onStartLearning={() => handleNavigate('learn', 'cpp_basics')}
              onExploreRoadmap={() => handleNavigate('roadmap')}
            />
          )}

          {activePage === 'dashboard' && (
            <DashboardPage
              progress={progress}
              onNavigate={(page, topicId) => handleNavigate(page, topicId)}
            />
          )}

          {activePage === 'roadmap' && (
            <RoadmapPage
              progress={progress}
              onSelectTopic={(topicId) => handleNavigate('learn', topicId)}
            />
          )}

          {activePage === 'learn' && (
            <LessonPage
              topicId={activeTopicId}
              progress={progress}
              settings={settings}
              onCompleteTopic={handleCompleteTopic}
              onNavigateToCoding={(cId) => {
                setActiveChallengeId(cId);
                handleNavigate('coding');
              }}
              onNavigateToQuiz={(tId) => {
                setActiveTopicId(tId);
                handleNavigate('quizzes');
              }}
            />
          )}

          {activePage === 'games' && (
            <GamesPage
              progress={progress}
              settings={settings}
              onCompleteGame={(xp) =>
                handleAwardXp(xp, '🎮 Mini-Game Victory!', 'You solved the interactive algorithm game!')
              }
            />
          )}

          {activePage === 'coding' && (
            <CodingPage
              initialChallengeId={activeChallengeId}
              progress={progress}
              settings={settings}
              onSolveChallenge={handleSolveChallenge}
            />
          )}

          {activePage === 'quizzes' && (
            <QuizzesPage
              initialTopicId={activeTopicId}
              progress={progress}
              settings={settings}
              onCompleteQuiz={handleCompleteQuiz}
            />
          )}

          {activePage === 'badges' && <BadgesPage progress={progress} />}

          {activePage === 'progress' && <ProgressPage progress={progress} />}

          {activePage === 'complexity' && <ComplexityPage />}

          {activePage === 'settings' && (
            <SettingsPage
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>
      </div>

      {/* Level Up / Award Celebration Modal */}
      <LevelUpModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        xpEarned={modalState.xpEarned}
      />
    </div>
  );
}
