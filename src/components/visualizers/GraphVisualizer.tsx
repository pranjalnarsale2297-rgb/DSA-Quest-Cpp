import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  soundEnabled?: boolean;
}

export const GraphVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('Click Start BFS to explore nodes level-by-level starting from Node A!');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Graph adjacency: A connects B, C; B connects D, E; C connects F
  const handleBFS = async () => {
    setIsRunning(true);
    setVisitedNodes([]);
    const queue = ['A'];
    const visited = new Set<string>();
    visited.add('A');

    const adj: Record<string, string[]> = {
      A: ['B', 'C'],
      B: ['D', 'E'],
      C: ['F'],
      D: [],
      E: [],
      F: [],
    };

    const order: string[] = [];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      order.push(curr);
      setVisitedNodes([...order]);
      if (soundEnabled) soundManager.playClick();
      setStatus(`BFS visiting Node ${curr}... Queue holds: [${queue.join(', ')}]`);
      await new Promise((r) => setTimeout(r, 800));

      for (const neighbor of adj[curr] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    if (soundEnabled) soundManager.playCorrect();
    setStatus('🔥 BFS Complete! Explored all connected components level-by-level.');
    setIsRunning(false);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Graph BFS Traversal Visualizer
          </h3>
          <p className="text-sm text-slate-400">Breadth-First Search using queue FIFO frontier</p>
        </div>

        <button
          onClick={handleBFS}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition text-sm disabled:opacity-50 shadow-lg shadow-indigo-600/20"
        >
          <Play className="w-3.5 h-3.5" /> Start BFS (A)
        </button>
      </div>

      {/* Visual Graph Layout */}
      <div className="my-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center gap-8 min-h-[200px]">
        {/* Node A */}
        <motion.div
          animate={{ scale: visitedNodes.includes('A') ? 1.15 : 1 }}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all ${
            visitedNodes.includes('A') ? 'bg-indigo-500 text-white border-indigo-300 ring-4 ring-indigo-400/30' : 'bg-slate-800 border-slate-700'
          }`}
        >
          A
        </motion.div>

        {/* Level 1: B and C */}
        <div className="w-full max-w-xs flex justify-around">
          {['B', 'C'].map((node) => (
            <motion.div
              key={node}
              animate={{ scale: visitedNodes.includes(node) ? 1.15 : 1 }}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all ${
                visitedNodes.includes(node) ? 'bg-indigo-500 text-white border-indigo-300 ring-4 ring-indigo-400/30' : 'bg-slate-800 border-slate-700'
              }`}
            >
              {node}
            </motion.div>
          ))}
        </div>

        {/* Level 2: D, E, F */}
        <div className="w-full max-w-sm flex justify-around">
          {['D', 'E', 'F'].map((node) => (
            <motion.div
              key={node}
              animate={{ scale: visitedNodes.includes(node) ? 1.15 : 1 }}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all ${
                visitedNodes.includes(node) ? 'bg-indigo-500 text-white border-indigo-300 ring-4 ring-indigo-400/30' : 'bg-slate-800 border-slate-700'
              }`}
            >
              {node}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-3 mb-4 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 text-sm flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{status}</span>
      </div>
    </div>
  );
};
