import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowLeft, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const ArraySortGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [numbers, setNumbers] = useState<number[]>([40, 10, 50, 20, 30]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const isSorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const handleTileClick = (idx: number) => {
    if (completed) return;

    if (selectedIdx === null) {
      setSelectedIdx(idx);
      if (soundEnabled) soundManager.playClick();
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      // Swap elements
      const newArr = [...numbers];
      const temp = newArr[selectedIdx];
      newArr[selectedIdx] = newArr[idx];
      newArr[idx] = temp;
      setNumbers(newArr);
      setSelectedIdx(null);

      if (isSorted(newArr)) {
        setCompleted(true);
        if (soundEnabled) soundManager.playLevelUp();
        if (onComplete) onComplete(50);
      } else {
        if (soundEnabled) soundManager.playClick();
      }
    }
  };

  const handleShuffle = () => {
    setNumbers([40, 10, 50, 20, 30].sort(() => Math.random() - 0.5));
    setSelectedIdx(null);
    setCompleted(false);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/80">
            MINI GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Array Sort Challenge</h3>
          <p className="text-xs text-slate-400">Click any two numbers to swap them into ascending order!</p>
        </div>

        <button
          onClick={handleShuffle}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          title="Shuffle Array"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="my-8 flex justify-center items-center gap-3">
        {numbers.map((val, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTileClick(idx)}
              className={`w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold cursor-pointer transition-all shadow-lg ${
                completed
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                  : isSelected
                  ? 'bg-indigo-600/40 border-indigo-400 ring-4 ring-indigo-500/30 text-white scale-105'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
              }`}
            >
              <span className="text-[10px] text-slate-400">[{idx}]</span>
              <span className="text-xl font-bold">{val}</span>
            </motion.div>
          );
        })}
      </div>

      {completed ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/80 text-emerald-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            <div>
              <p className="font-bold text-sm">Challenge Solved! Array is Sorted!</p>
              <p className="text-xs text-emerald-300/80">+50 XP added to your DSA Quest profile!</p>
            </div>
          </div>
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white"
          >
            Play Again
          </button>
        </motion.div>
      ) : (
        <p className="text-center text-xs text-slate-400">
          Target Goal: <span className="font-mono font-bold text-indigo-300">[10, 20, 30, 40, 50]</span>
        </p>
      )}
    </div>
  );
};
