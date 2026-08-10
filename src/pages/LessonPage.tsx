import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Eye,
  Gamepad2,
  BrainCircuit,
  Code2,
  CheckCircle2,
  HelpCircle,
  Trophy,
  ArrowRight,
  Flame,
  Award,
} from 'lucide-react';
import { UserProgress, UserSettings } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { CODING_CHALLENGES } from '../data/challengesData';
import { LineByLineCode } from '../components/LineByLineCode';
import { ArrayVisualizer } from '../components/visualizers/ArrayVisualizer';
import { BinarySearchVisualizer } from '../components/visualizers/BinarySearchVisualizer';
import { StackVisualizer } from '../components/visualizers/StackVisualizer';
import { QueueVisualizer } from '../components/visualizers/QueueVisualizer';
import { LinkedListVisualizer } from '../components/visualizers/LinkedListVisualizer';
import { RecursionVisualizer } from '../components/visualizers/RecursionVisualizer';
import { TreeVisualizer } from '../components/visualizers/TreeVisualizer';
import { GraphVisualizer } from '../components/visualizers/GraphVisualizer';
import { ComplexityVisualizer } from '../components/visualizers/ComplexityVisualizer';
import { ArraySortGame } from '../components/games/ArraySortGame';
import { BinarySearchGame } from '../components/games/BinarySearchGame';
import { StackGame } from '../components/games/StackGame';
import { QueueGame } from '../components/games/QueueGame';
import { LinkedListGame } from '../components/games/LinkedListGame';
import { RecursionGame } from '../components/games/RecursionGame';
import { TreeGame } from '../components/games/TreeGame';
import { GraphGame } from '../components/games/GraphGame';
import { CodeDebuggerGame } from '../components/games/CodeDebuggerGame';
import { soundManager } from '../utils/audio';

interface Props {
  topicId: string;
  progress: UserProgress;
  settings: UserSettings;
  onCompleteTopic: (topicId: string, xpEarned: number) => void;
  onNavigateToCoding: (challengeId: string) => void;
  onNavigateToQuiz: (topicId: string) => void;
}

export const LessonPage: React.FC<Props> = ({
  topicId,
  progress,
  settings,
  onCompleteTopic,
  onNavigateToCoding,
  onNavigateToQuiz,
}) => {
  const lesson = LESSONS_DATA[topicId] || LESSONS_DATA['cpp_basics'];
  const quizData = QUIZZES_DATA[topicId];
  const challenge = CODING_CHALLENGES.find((c) => c.topicId === topicId) || CODING_CHALLENGES[0];

  const isCompleted = progress.completedTopics.includes(topicId);

  const handleMarkComplete = () => {
    if (!isCompleted) {
      if (settings.soundEnabled) soundManager.playLevelUp();
      onCompleteTopic(topicId, 50);
    }
  };

  const renderVisualizer = () => {
    switch (lesson.visualizationType) {
      case 'array':
        return <ArrayVisualizer soundEnabled={settings.soundEnabled} />;
      case 'binary_search':
        return <BinarySearchVisualizer soundEnabled={settings.soundEnabled} />;
      case 'stack':
        return <StackVisualizer soundEnabled={settings.soundEnabled} />;
      case 'queue':
        return <QueueVisualizer soundEnabled={settings.soundEnabled} />;
      case 'linked_list':
        return <LinkedListVisualizer soundEnabled={settings.soundEnabled} />;
      case 'recursion':
        return <RecursionVisualizer soundEnabled={settings.soundEnabled} />;
      case 'tree':
        return <TreeVisualizer soundEnabled={settings.soundEnabled} />;
      case 'graph':
        return <GraphVisualizer soundEnabled={settings.soundEnabled} />;
      case 'complexity':
        return <ComplexityVisualizer />;
      default:
        return <ArrayVisualizer soundEnabled={settings.soundEnabled} />;
    }
  };

  const renderMiniGame = () => {
    switch (lesson.miniGameId) {
      case 'array_sort':
        return <ArraySortGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'binary_search':
        return <BinarySearchGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'stack':
        return <StackGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'queue':
        return <QueueGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'linked_list':
        return <LinkedListGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'recursion':
        return <RecursionGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'tree':
        return <TreeGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'graph':
        return <GraphGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      case 'debugger':
        return <CodeDebuggerGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
      default:
        return <ArraySortGame soundEnabled={settings.soundEnabled} onComplete={(xp) => onCompleteTopic(topicId, xp)} />;
    }
  };

  return (
    <div className="space-y-12 p-4 lg:p-8 max-w-5xl mx-auto text-slate-100 pb-24">
      {/* Lesson Banner Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-800/50 backdrop-blur-xl space-y-3 relative overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
            {lesson.level}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
              <CheckCircle2 className="w-4 h-4" /> COMPLETED (+50 XP)
            </span>
          )}
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white">{lesson.title}</h2>

        {/* Learning Flow Pipeline Badge */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold pt-2 text-slate-400">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300">1. LEARN</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300">2. SEE</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300">3. PLAY</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300">4. QUIZ</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300">5. CODE</span>
        </div>
      </div>

      {/* SECTION 1: WHAT IS IT? */}
      <section className="space-y-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">1. WHAT IS IT?</h3>
        </div>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed pl-2">
          {lesson.whatIsIt}
        </p>
      </section>

      {/* SECTION 2: REAL LIFE EXAMPLE */}
      <section className="space-y-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">2. REAL LIFE EXAMPLE</h3>
        </div>
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/50 space-y-2 text-sm text-purple-200">
          <h4 className="font-bold text-purple-300 text-base">Analogy: {lesson.realLifeExample.analogy}</h4>
          <p className="leading-relaxed text-xs md:text-sm text-purple-200/90">{lesson.realLifeExample.details}</p>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE VISUALIZATION */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-teal-950 text-teal-400 border border-teal-800">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">3. SEE IT IN ACTION</h3>
        </div>
        {renderVisualizer()}
      </section>

      {/* SECTION 4: C++ CODE */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-950 text-blue-400 border border-blue-800">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">4. C++ CODE & EXPLANATION</h3>
        </div>
        <LineByLineCode
          codeLines={lesson.codeLines}
          rawCode={lesson.cppCode}
          expectedOutput={lesson.expectedOutput}
          soundEnabled={settings.soundEnabled}
        />
      </section>

      {/* SECTION 5: MINI GAME */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-100">5. MINI GAME — {lesson.miniGameTitle}</h3>
        </div>
        {renderMiniGame()}
      </section>

      {/* SECTION 6: QUIZ & CODING LAUNCHERS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Quiz Launcher */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-900 text-indigo-300">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-white">6. Topic Quiz</h4>
              <p className="text-xs text-slate-400">5 interactive questions (+10 XP per question)</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToQuiz(topicId)}
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white text-xs transition shadow-lg shadow-indigo-600/30"
          >
            Start Topic Quiz
          </button>
        </div>

        {/* Coding Challenge Launcher */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-700/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-900 text-purple-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-white">7. C++ Challenge</h4>
              <p className="text-xs text-slate-400">{challenge.title} (+{challenge.xpReward} XP)</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToCoding(challenge.id)}
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 font-extrabold text-white text-xs transition shadow-lg shadow-purple-600/30"
          >
            Solve Coding Challenge
          </button>
        </div>
      </section>

      {/* Complete Topic Action Button */}
      <div className="pt-6 flex justify-center">
        <button
          onClick={handleMarkComplete}
          disabled={isCompleted}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-base shadow-2xl transition-all ${
            isCompleted
              ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300 opacity-80 cursor-default'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:scale-105 shadow-emerald-600/30'
          }`}
        >
          <CheckCircle2 className="w-6 h-6" />
          {isCompleted ? 'Topic Completed! (+50 XP Earned)' : 'Mark Topic as Completed (+50 XP)'}
        </button>
      </div>
    </div>
  );
};
