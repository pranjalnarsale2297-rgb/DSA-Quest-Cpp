import React from 'react';
import { Flame, Volume2, VolumeX, Menu, Award, Zap } from 'lucide-react';
import { XPBar } from './XPBar';
import { UserProgress, UserSettings } from '../types';

interface Props {
  progress: UserProgress;
  settings: UserSettings;
  onToggleSound: () => void;
  onOpenMobileNav: () => void;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<Props> = ({
  progress,
  settings,
  onToggleSound,
  onOpenMobileNav,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => onNavigate('dashboard')}
          className="cursor-pointer flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300 font-mono leading-none">
              DSA QUEST
            </h1>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-tight">C++ GAMIFIED LEARNING</span>
          </div>
        </div>
      </div>

      {/* Center Stats Bar (Desktop) */}
      <div className="hidden md:flex items-center gap-6 w-1/3">
        <XPBar xp={progress.xp} />
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-400 text-xs font-bold font-mono shadow-inner">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>{progress.streakDays} Day Streak</span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-xl border transition ${
            settings.soundEnabled
              ? 'bg-indigo-950/60 border-indigo-700/80 text-indigo-300 hover:bg-indigo-900/60'
              : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
          }`}
          title={settings.soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        >
          {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Profile XP Pill */}
        <div
          onClick={() => onNavigate('progress')}
          className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition text-xs font-mono"
        >
          <Award className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-slate-200">{progress.xp} XP</span>
        </div>
      </div>
    </header>
  );
};
