import React, { useState } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const RecursionGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  const [selectedBaseCase, setSelectedBaseCase] = useState<number | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelect = (idx: number) => {
    setSelectedBaseCase(idx);
    if (idx === 1) { // option 1 is correct: if (n <= 1) return 1;
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
          <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/80">
            RECURSION GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Base Case Defender</h3>
          <p className="text-xs text-slate-400">Select the correct Base Case to prevent Stack Overflow!</p>
        </div>
      </div>

      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 my-4 space-y-1">
        <p className="text-amber-400 font-bold">int factorial(int n) &#123;</p>
        <p className="pl-4 text-rose-300 font-bold bg-rose-950/30 p-1 rounded">
          // ??? WHICH BASE CASE BELONGS HERE?
        </p>
        <p className="pl-4">return n * factorial(n - 1);</p>
        <p className="text-amber-400 font-bold">&#125;</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          'if (n == 0) return 0;',
          'if (n <= 1) return 1;',
          'if (n == 10) return n;',
          'no base case needed',
        ].map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`p-3 rounded-xl border font-mono text-xs text-left transition font-semibold ${
              completed && idx === 1
                ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200'
                : selectedBaseCase === idx && idx !== 1
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
          <span>🔥 Correct! `if (n &lt;= 1) return 1;` stops recursion when n hits 1 or 0!</span>
          <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
        </div>
      )}
    </div>
  );
};
