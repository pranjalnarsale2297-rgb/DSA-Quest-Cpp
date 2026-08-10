import React from 'react';
import { Award, Lock, Sparkles, Trophy } from 'lucide-react';
import { BADGES } from '../data/badgesData';
import { UserProgress } from '../types';

interface Props {
  progress: UserProgress;
}

export const BadgesPage: React.FC<Props> = ({ progress }) => {
  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      <div>
        <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
          ACHIEVEMENT GALLERY
        </span>
        <h2 className="text-3xl font-black text-white mt-1">Quest Badges & Trophies</h2>
        <p className="text-sm text-slate-400">
          Earn badges by completing topics, mini-games, maintaining streaks, and solving C++ challenges!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BADGES.map((badge) => {
          const isUnlocked = progress.unlockedBadges.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`p-6 rounded-3xl border flex flex-col items-center text-center space-y-3 transition-all ${
                isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-xl shadow-amber-500/10'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-500 to-indigo-500 text-white'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                {isUnlocked ? <Trophy className="w-8 h-8 text-amber-300" /> : <Lock className="w-8 h-8 text-slate-500" />}
              </div>

              <div>
                <h4 className="font-extrabold text-slate-100 text-base">{badge.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{badge.description}</p>
              </div>

              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  isUnlocked
                    ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {isUnlocked ? 'UNLOCKED' : `Requires ${badge.requiredXp || 100} XP`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
