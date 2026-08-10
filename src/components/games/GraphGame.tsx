import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  onComplete?: (xpEarned: number) => void;
  soundEnabled?: boolean;
}

export const GraphGame: React.FC<Props> = ({ onComplete, soundEnabled = true }) => {
  // Graph: A - B - C. Goal: Path A to C
  const [path, setPath] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Goal: Find a valid path from Node A to Node C by clicking nodes in order!');

  const handleNodeClick = (node: string) => {
    if (completed) return;

    if (path.length === 0) {
      if (node === 'A') {
        setPath(['A']);
        if (soundEnabled) soundManager.playClick();
        setMessage('Started path at A. Click neighbor node!');
      }
    } else if (path.length === 1 && path[0] === 'A') {
      if (node === 'B') {
        setPath(['A', 'B']);
        if (soundEnabled) soundManager.playClick();
        setMessage('Node B visited. Now click destination C!');
      }
    } else if (path.length === 2 && path[1] === 'B') {
      if (node === 'C') {
        setPath(['A', 'B', 'C']);
        setCompleted(true);
        if (soundEnabled) soundManager.playLevelUp();
        setMessage('🔥 Valid Path A → B → C Discovered!');
        if (onComplete) onComplete(50);
      }
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800/80">
            GRAPH GAME (+50 XP)
          </span>
          <h3 className="text-xl font-bold mt-2 text-white">Pathfinder Quest</h3>
          <p className="text-xs text-slate-400">Connect A to C through valid connected edge paths</p>
        </div>
      </div>

      <div className="my-6 p-6 bg-slate-950 rounded-xl border border-slate-800 flex justify-center items-center gap-8">
        {['A', 'B', 'C'].map((node) => (
          <button
            key={node}
            onClick={() => handleNodeClick(node)}
            className={`w-12 h-12 rounded-full font-bold font-mono text-sm border-2 transition ${
              path.includes(node)
                ? 'bg-indigo-500 text-white border-indigo-300 ring-4 ring-indigo-400/30'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-400'
            }`}
          >
            {node}
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 text-xs flex items-center justify-between">
        <span>{message}</span>
        {completed && <Trophy className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />}
      </div>
    </div>
  );
};
