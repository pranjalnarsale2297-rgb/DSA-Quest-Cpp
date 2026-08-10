import React from 'react';
import { BarChart3, CheckCircle2, Flame, Award, Trophy, BookOpen } from 'lucide-react';
import { UserProgress } from '../types';
import { XPBar } from '../components/XPBar';
import { LESSONS_DATA } from '../data/lessonsData';

interface Props {
  progress: UserProgress;
}

export const ProgressPage: React.FC<Props> = ({ progress }) => {
  const totalTopics = 55;
  const completedCount = progress.completedTopics.length;
  const percent = Math.round((completedCount / totalTopics) * 100);

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      <div>
        <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
          STUDENT ANALYTICS
        </span>
        <h2 className="text-3xl font-black text-white mt-1">Learning Progress Overview</h2>
      </div>

      {/* Hero Stats */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total XP</span>
            <span className="text-3xl font-black font-mono text-indigo-400">{progress.xp} XP</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-semibold block">Topics Solved</span>
            <span className="text-3xl font-black font-mono text-emerald-400">{completedCount} / {totalTopics}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-semibold block">Streak</span>
            <span className="text-3xl font-black font-mono text-amber-400 flex items-center gap-1">
              <Flame className="w-6 h-6 fill-amber-400" /> {progress.streakDays} Days
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-semibold block">Badges Earned</span>
            <span className="text-3xl font-black font-mono text-purple-300">{progress.unlockedBadges.length}</span>
          </div>
        </div>

        <div className="pt-2">
          <XPBar xp={progress.xp} />
        </div>
      </div>

      {/* Completed Topics Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-lg text-slate-200">Completed Topics Tracker</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.keys(LESSONS_DATA).map((tId) => {
            const lesson = LESSONS_DATA[tId];
            const isDone = progress.completedTopics.includes(tId);

            return (
              <div
                key={tId}
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-mono font-semibold ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <span>{lesson.title}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-slate-600">Pending</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
