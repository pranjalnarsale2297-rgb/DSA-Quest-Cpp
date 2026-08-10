import React from 'react';
import { calculateLevel } from '../utils/localStorage';
import { UserLevelName } from '../types';

interface Props {
  xp: number;
}

export const XPBar: React.FC<Props> = ({ xp }) => {
  const levelInfo = calculateLevel(xp);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="font-bold text-indigo-300">
          Level {levelInfo.level}: <span className="text-white">{levelInfo.levelName}</span>
        </span>
        <span className="text-slate-400">
          <strong className="text-indigo-400">{xp}</strong> / {levelInfo.nextLevelXp} XP
        </span>
      </div>

      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 shadow-md shadow-indigo-500/30"
          style={{ width: `${levelInfo.progressPercent}%` }}
        />
      </div>
    </div>
  );
};
