import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Play, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const BinarySearchGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const sortedArray = [10, 20, 30, 42, 50, 60, 70, 80];
  const target = 42;
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(sortedArray.length - 1);
  const [completed, setCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Goal: Find 42 in minimum steps! Click the middle element.');

  const mid = Math.floor(low + (high - low) / 2);

  const handleMidClick = (clickedIdx: number) => {
    if (completed) return;
    if (clickedIdx !== mid) {
      if (soundEnabled) soundManager.playWrong();
      setMessage(`⚠️ Always click the MID element at index ${mid}! Binary search must check the middle.`);
      return;
    }

    const val = sortedArray[mid];
    if (val === target) {
      setCompleted(true);
      if (soundEnabled) soundManager.playLevelUp();
      setMessage(`🔥 Found target 42 at index ${mid}! Binary search complete!`);
      if (onComplete) onComplete(50);
    } else if (val < target) {
      setLow(mid + 1);
      if (soundEnabled) soundManager.playClick();
      setMessage(`arr[${mid}] (${val}) < 42. Eliminating left half. Move LOW pointer to ${mid + 1}.`);
    } else {
      setHigh(mid - 1);
      if (soundEnabled) soundManager.playClick();
      setMessage(`arr[${mid}] (${val}) > 42. Eliminating right half. Move HIGH pointer to ${mid - 1}.`);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800/80">
            BINARY SEARCH GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Find Target 42</h3>
          <p className="text-xs text-slate-400">Click the glowing MID element at index {mid} to halve the search space!</p>
        </div>
      </div>

      <div className="my-8 flex justify-center items-center gap-2 flex-wrap">
        {sortedArray.map((val, idx) => {
          const isMid = idx === mid;
          const isLow = idx === low;
          const isHigh = idx === high;
          const isEliminated = idx < low || idx > high;

          return (
            <motion.div
              key={idx}
              animate={{ opacity: isEliminated ? 0.3 : 1, scale: isMid ? 1.1 : 1 }}
              onClick={() => handleMidClick(idx)}
              className={`w-14 h-18 rounded-xl border-2 flex flex-col items-center justify-center font-mono cursor-pointer transition-all ${
                completed && idx === mid
                  ? 'bg-emerald-600/40 border-emerald-400 text-emerald-100 ring-4 ring-emerald-400/40'
                  : isMid
                  ? 'bg-cyan-600/30 border-cyan-400 text-cyan-100 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20'
                  : isEliminated
                  ? 'bg-slate-950 border-slate-800 text-slate-600 line-through'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              <span className="text-[9px] text-slate-400">[{idx}]</span>
              <span className="text-base font-bold">{val}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-cyan-200 text-xs flex items-center justify-between">
        <span>{message}</span>
        {completed && <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />}
      </div>
    </div>
  );
};
