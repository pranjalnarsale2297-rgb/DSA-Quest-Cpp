import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Trophy,
  Award,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Code2,
  BrainCircuit,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { UserProgress, LeaderboardEntry } from '../types';
import { XPBar } from '../components/XPBar';
import { LESSONS_DATA } from '../data/lessonsData';
import { CODING_CHALLENGES } from '../data/challengesData';

interface Props {
  progress: UserProgress;
  onNavigate: (page: string, topicId?: string) => void;
}

export const DashboardPage: React.FC<Props> = ({ progress, onNavigate }) => {
  const totalTopicsCount = 55;
  const overallPercent = Math.round((progress.completedTopics.length / totalTopicsCount) * 100);

  // Daily challenge details
  const dailyChallenge = CODING_CHALLENGES[1]; // Reverse Array

  // Mock Leaderboard items with user dynamic position
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Alex', xp: 4200, level: 7, avatarColor: 'bg-amber-500' },
    { rank: 2, name: 'Riya', xp: 3900, level: 7, avatarColor: 'bg-indigo-500' },
    { rank: 3, name: 'Sam', xp: 3500, level: 6, avatarColor: 'bg-emerald-500' },
    {
      rank: progress.xp >= 3500 ? 3 : 4,
      name: 'You (Coder)',
      xp: progress.xp,
      level: progress.level,
      isCurrentUser: true,
      avatarColor: 'bg-purple-600',
    },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  const currentTopic = LESSONS_DATA[progress.currentTopicId] || LESSONS_DATA['arrays'];

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      {/* Header Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-800/50 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-3">
          <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
            STUDENT DASHBOARD
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Welcome back, Coder! 👋
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            You are currently on <strong className="text-indigo-300">Level {progress.level}: {progress.levelName}</strong>. Keep your daily streak alive and level up your algorithm skills!
          </p>

          <div className="pt-2 max-w-md">
            <XPBar xp={progress.xp} />
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/60">
            <Flame className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Streak</span>
            <span className="text-2xl font-black font-mono text-white">{progress.streakDays} Days</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/60">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Total XP</span>
            <span className="text-2xl font-black font-mono text-indigo-400">{progress.xp}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Problems Solved</span>
            <span className="text-2xl font-black font-mono text-emerald-400">{progress.completedChallenges.length}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/60">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-semibold">Badges Unlocked</span>
            <span className="text-2xl font-black font-mono text-purple-300">{progress.unlockedBadges.length}</span>
          </div>
        </div>
      </div>

      {/* Overall Journey Progress Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-base text-slate-200">DSA Quest Journey Progress</h3>
          <span className="text-sm font-mono font-bold text-indigo-400">{overallPercent}% Complete</span>
        </div>
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(2, overallPercent)}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout: Main Actions & Daily Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3): Continue Learning & Quick Shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">CONTINUE LEARNING</span>
              <h3 className="text-xl font-extrabold text-white">{currentTopic.title}</h3>
              <p className="text-xs text-slate-400">{currentTopic.level}</p>
            </div>

            <button
              onClick={() => onNavigate('learn', currentTopic.topicId)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white text-sm transition shadow-lg shadow-indigo-600/30"
            >
              Continue Lesson <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Hub Shortcuts */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onNavigate('games')}
              className="cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 flex items-center justify-center font-bold">
                <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-slate-100">Mini-Games Hub</h4>
              <p className="text-xs text-slate-400">Play sorting, stack, queue, and search mini-games for XP!</p>
            </div>

            <div
              onClick={() => onNavigate('coding')}
              className="cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 text-indigo-400 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-bold text-slate-100">C++ Coding IDE</h4>
              <p className="text-xs text-slate-400">Solve C++ challenges with step-by-step test cases and 3-tier hints!</p>
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Daily Challenge & Leaderboard */}
        <div className="space-y-6">
          {/* Daily Challenge Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                <Zap className="w-4 h-4 fill-amber-400" /> DAILY CHALLENGE
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                +100 XP
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">{dailyChallenge.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{dailyChallenge.problemStatement}</p>

            <button
              onClick={() => onNavigate('coding', dailyChallenge.id)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-amber-500/20"
            >
              Solve Daily Challenge
            </button>
          </div>

          {/* Local Leaderboard Preview */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-200">Local Leaderboard</h4>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Demo Data</span>
            </div>

            <div className="space-y-2">
              {leaderboard.map((item) => (
                <div
                  key={item.name}
                  className={`p-2.5 rounded-xl flex items-center justify-between text-xs font-mono transition ${
                    item.isCurrentUser
                      ? 'bg-purple-950/60 border border-purple-500/60 font-bold text-white'
                      : 'bg-slate-950/60 border border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 text-center font-bold text-slate-500">#{item.rank}</span>
                    <span className={`w-6 h-6 rounded-full ${item.avatarColor} flex items-center justify-center font-bold text-white text-[10px]`}>
                      {item.name[0]}
                    </span>
                    <span>{item.name}</span>
                  </div>

                  <span className="font-bold text-indigo-400">{item.xp} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
