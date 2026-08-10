import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowRight, Repeat } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const LinkedListGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [list, setList] = useState<number[]>([10, 20, 30]);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleReverse = () => {
    if (isReversed) return;
    setList([30, 20, 10]);
    setIsReversed(true);
    if (soundEnabled) soundManager.playLevelUp();
    if (onComplete) onComplete(50);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
            LINKED LIST GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Reverse Pointer Quest</h3>
          <p className="text-xs text-slate-400">Click Reverse to invert pointer direction from Head to Tail!</p>
        </div>
      </div>

      <div className="my-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center items-center gap-2">
        <span className="text-xs font-mono font-bold text-emerald-400">HEAD →</span>
        {list.map((val, idx) => (
          <React.Fragment key={idx}>
            <div className="px-3 py-2 bg-slate-800 border border-emerald-500 rounded-lg font-mono font-bold text-emerald-200">
              [{val}|next]
            </div>
            {idx < list.length - 1 && <ArrowRight className="w-4 h-4 text-emerald-400" />}
          </React.Fragment>
        ))}
        <span className="text-xs font-mono font-bold text-rose-400">→ NULL</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">
          {isReversed ? '🔥 List successfully reversed to [30, 20, 10]!' : 'Goal: Reverse list pointers.'}
        </span>

        {isReversed ? (
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Trophy className="w-5 h-5 text-amber-400 animate-bounce" /> +50 XP Earned!
          </div>
        ) : (
          <button
            onClick={handleReverse}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white"
          >
            <Repeat className="w-3.5 h-3.5" /> Reverse Linked List
          </button>
        )}
      </div>
    </div>
  );
};
