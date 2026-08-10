import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowDown, ArrowUp } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const StackGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [stack, setStack] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [stepGoal, setStepGoal] = useState<string>('Step 1: Push 10');

  const handlePush10 = () => {
    if (stack.length === 0) {
      setStack([10]);
      setStepGoal('Step 2: Push 20');
      if (soundEnabled) soundManager.playClick();
    }
  };

  const handlePush20 = () => {
    if (stack.length === 1 && stack[0] === 10) {
      setStack([10, 20]);
      setStepGoal('Step 3: Pop top element (20)');
      if (soundEnabled) soundManager.playClick();
    }
  };

  const handlePop = () => {
    if (stack.length === 2 && stack[1] === 20) {
      setStack([10]);
      setCompleted(true);
      if (soundEnabled) soundManager.playLevelUp();
      setStepGoal('🎉 Challenge Completed!');
      if (onComplete) onComplete(50);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800/80">
            STACK PUZZLE (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">LIFO Sequence Challenge</h3>
          <p className="text-xs text-slate-400">Perform the exact sequence: Push 10 → Push 20 → Pop</p>
        </div>
      </div>

      <div className="my-6 flex flex-col items-center">
        <div className="w-40 h-44 border-x-4 border-b-4 border-purple-500/60 bg-slate-950/80 rounded-b-2xl p-3 flex flex-col-reverse justify-start gap-2">
          <AnimatePresence>
            {stack.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                className="w-full h-9 bg-purple-600 rounded-xl flex items-center justify-center font-mono font-bold text-white shadow"
              >
                {val}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-3 mb-4 rounded-xl bg-purple-950/40 border border-purple-800/50 text-purple-200 text-xs flex items-center justify-between">
        <span>{stepGoal}</span>
        {completed && <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />}
      </div>

      {!completed && (
        <div className="flex justify-center gap-3">
          <button
            onClick={handlePush10}
            disabled={stack.length !== 0}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white disabled:opacity-40"
          >
            Push 10
          </button>
          <button
            onClick={handlePush20}
            disabled={stack.length !== 1}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white disabled:opacity-40"
          >
            Push 20
          </button>
          <button
            onClick={handlePop}
            disabled={stack.length !== 2}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white disabled:opacity-40"
          >
            Pop
          </button>
        </div>
      )}
    </div>
  );
};
