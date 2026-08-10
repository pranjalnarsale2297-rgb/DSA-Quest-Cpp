import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, LogOut } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const QueueGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [queue, setQueue] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [stepGoal, setStepGoal] = useState<string>('Step 1: Enqueue 100');

  const handleEnqueue100 = () => {
    if (queue.length === 0) {
      setQueue([100]);
      setStepGoal('Step 2: Enqueue 200');
      if (soundEnabled) soundManager.playClick();
    }
  };

  const handleEnqueue200 = () => {
    if (queue.length === 1 && queue[0] === 100) {
      setQueue([100, 200]);
      setStepGoal('Step 3: Dequeue front element (100)');
      if (soundEnabled) soundManager.playClick();
    }
  };

  const handleDequeue = () => {
    if (queue.length === 2 && queue[0] === 100) {
      setQueue([200]);
      setCompleted(true);
      if (soundEnabled) soundManager.playLevelUp();
      setStepGoal('🎉 FIFO Queue Challenge Solved!');
      if (onComplete) onComplete(50);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-800/80">
            QUEUE PUZZLE (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">FIFO Line Manager</h3>
          <p className="text-xs text-slate-400">Perform: Enqueue 100 → Enqueue 200 → Dequeue</p>
        </div>
      </div>

      <div className="my-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center items-center gap-2 min-h-[80px]">
        <AnimatePresence>
          {queue.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              className="w-16 h-12 bg-teal-600 rounded-xl flex items-center justify-center font-mono font-bold text-white shadow"
            >
              {val}
            </motion.div>
          ))}
        </AnimatePresence>
        {queue.length === 0 && <span className="text-xs text-slate-500 italic">Queue Empty</span>}
      </div>

      <div className="p-3 mb-4 rounded-xl bg-teal-950/40 border border-teal-800/50 text-teal-200 text-xs flex items-center justify-between">
        <span>{stepGoal}</span>
        {completed && <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />}
      </div>

      {!completed && (
        <div className="flex justify-center gap-3">
          <button
            onClick={handleEnqueue100}
            disabled={queue.length !== 0}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-xs text-white disabled:opacity-40"
          >
            Enqueue 100
          </button>
          <button
            onClick={handleEnqueue200}
            disabled={queue.length !== 1}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-xs text-white disabled:opacity-40"
          >
            Enqueue 200
          </button>
          <button
            onClick={handleDequeue}
            disabled={queue.length !== 2}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white disabled:opacity-40 flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Dequeue
          </button>
        </div>
      )}
    </div>
  );
};
