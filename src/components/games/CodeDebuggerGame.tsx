import React, { useState } from 'react';
import { Trophy, Bug, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const CodeDebuggerGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    if (idx === 0) { // option A: <= should be <
      setCompleted(true);
      if (soundEnabled) soundManager.playLevelUp();
      if (onComplete) onComplete(50);
    } else {
      if (soundEnabled) soundManager.playWrong();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-rose-400 bg-rose-950/80 px-2.5 py-1 rounded-full border border-rose-800/80 flex items-center gap-1">
            <Bug className="w-3.5 h-3.5" /> BUG HUNTER GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Find the C++ Off-By-One Bug</h3>
          <p className="text-xs text-slate-400">Inspect the loop below. What is wrong with accessing array elements?</p>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 my-4 space-y-1">
        <p className="text-indigo-400">int arr[5] = &#123;10, 20, 30, 40, 50&#125;;</p>
        <p className="text-rose-400 font-bold bg-rose-950/30 p-1.5 rounded">
          for (int i = 0; i &lt;= 5; i++) &#123; // &lt;-- BUG IS HERE!
        </p>
        <p className="pl-4">cout &lt;&lt; arr[i] &lt;&lt; endl;</p>
        <p className="text-indigo-400">&#125;</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          'A. Condition `<= 5` should be `< 5` (accesses out of bounds arr[5]).',
          'B. Variable type `int` should be `float`.',
          'C. Loop variable `i` should start at 1 instead of 0.',
          'D. There is no bug, code executes perfectly.',
        ].map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`p-3 rounded-xl border text-xs text-left transition font-semibold ${
              completed && idx === 0
                ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200'
                : selectedOption === idx && idx !== 0
                ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                : 'bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {completed && (
        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-200 text-xs flex items-center justify-between">
          <span>🔥 Correct! An array of size 5 has valid indices 0 to 4. `i &lt;= 5` causes Out Of Bounds memory access at index 5!</span>
          <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
        </div>
      )}
    </div>
  );
};
