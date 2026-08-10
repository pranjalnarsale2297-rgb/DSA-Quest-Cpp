import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const TreeGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  // Tree: Root 10, Left 5, Right 15. Inorder = 5 -> 10 -> 15
  const expectedOrder = [5, 10, 15];
  const [userClicked, setUserClicked] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Goal: Click nodes in INORDER sequence (Left → Root → Right)');

  const handleNodeClick = (val: number) => {
    if (completed) return;
    const nextExpected = expectedOrder[userClicked.length];

    if (val === nextExpected) {
      const newClicked = [...userClicked, val];
      setUserClicked(newClicked);
      if (soundEnabled) soundManager.playClick();

      if (newClicked.length === expectedOrder.length) {
        setCompleted(true);
        if (soundEnabled) soundManager.playLevelUp();
        setMessage('🔥 Perfect Inorder Traversal! Node sequence: 5 → 10 → 15');
        if (onComplete) onComplete(50);
      }
    } else {
      if (soundEnabled) soundManager.playWrong();
      setMessage(`❌ Inorder visits Left subtree first! Expected ${nextExpected}, but you clicked ${val}. Try again!`);
      setUserClicked([]);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
            TREE GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Inorder Traversal Challenge</h3>
          <p className="text-xs text-slate-400">Click the tree nodes in correct Inorder sequence (Left → Root → Right)</p>
        </div>
      </div>

      <div className="my-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center gap-4">
        {/* Root 10 */}
        <button
          onClick={() => handleNodeClick(10)}
          className={`w-12 h-12 rounded-full font-bold font-mono text-sm border-2 transition ${
            userClicked.includes(10) ? 'bg-emerald-500 text-slate-950 border-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-100 hover:border-emerald-400'
          }`}
        >
          10
        </button>

        {/* Children 5 and 15 */}
        <div className="flex justify-around w-48">
          <button
            onClick={() => handleNodeClick(5)}
            className={`w-10 h-10 rounded-full font-bold font-mono text-xs border-2 transition ${
              userClicked.includes(5) ? 'bg-emerald-500 text-slate-950 border-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-100 hover:border-emerald-400'
            }`}
          >
            5
          </button>
          <button
            onClick={() => handleNodeClick(15)}
            className={`w-10 h-10 rounded-full font-bold font-mono text-xs border-2 transition ${
              userClicked.includes(15) ? 'bg-emerald-500 text-slate-950 border-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-100 hover:border-emerald-400'
            }`}
          >
            15
          </button>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-xs flex items-center justify-between">
        <span>{message}</span>
        {completed && <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />}
      </div>
    </div>
  );
};
