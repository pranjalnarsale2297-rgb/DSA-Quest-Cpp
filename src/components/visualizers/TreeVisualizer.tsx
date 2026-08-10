import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  soundEnabled?: boolean;
}

export const TreeVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Select a traversal method and click Run Traversal!');

  // Binary Search Tree: Root 20, Left 10 (Left 5, Right 15), Right 30 (Left 25, Right 35)
  const runTraversal = async () => {
    setIsTraversing(true);
    setVisitedNodes([]);
    let sequence: { val: number; name: string }[] = [];

    if (traversalType === 'inorder') {
      // Left -> Root -> Right
      sequence = [
        { val: 5, name: 'Leaf 5' },
        { val: 10, name: 'Node 10' },
        { val: 15, name: 'Leaf 15' },
        { val: 20, name: 'ROOT 20' },
        { val: 25, name: 'Leaf 25' },
        { val: 30, name: 'Node 30' },
        { val: 35, name: 'Leaf 35' },
      ];
      setStatus('Inorder Traversal: Left Subtree → Root → Right Subtree (Yields SORTED order for BST!)');
    } else if (traversalType === 'preorder') {
      // Root -> Left -> Right
      sequence = [
        { val: 20, name: 'ROOT 20' },
        { val: 10, name: 'Node 10' },
        { val: 5, name: 'Leaf 5' },
        { val: 15, name: 'Leaf 15' },
        { val: 30, name: 'Node 30' },
        { val: 25, name: 'Leaf 25' },
        { val: 35, name: 'Leaf 35' },
      ];
      setStatus('Preorder Traversal: Root → Left Subtree → Right Subtree');
    } else {
      // Postorder: Left -> Right -> Root
      sequence = [
        { val: 5, name: 'Leaf 5' },
        { val: 15, name: 'Leaf 15' },
        { val: 10, name: 'Node 10' },
        { val: 25, name: 'Leaf 25' },
        { val: 35, name: 'Leaf 35' },
        { val: 30, name: 'Node 30' },
        { val: 20, name: 'ROOT 20' },
      ];
      setStatus('Postorder Traversal: Left Subtree → Right Subtree → Root (Used for deleting trees)');
    }

    const visited: number[] = [];
    for (const item of sequence) {
      visited.push(item.val);
      setVisitedNodes([...visited]);
      if (soundEnabled) soundManager.playClick();
      await new Promise((r) => setTimeout(r, 700));
    }

    if (soundEnabled) soundManager.playCorrect();
    setIsTraversing(false);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Binary Search Tree Visualizer
          </h3>
          <p className="text-sm text-slate-400">Hierarchical tree nodes and traversal order</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={traversalType}
            onChange={(e) => setTraversalType(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 text-sm font-semibold focus:outline-none"
          >
            <option value="inorder">Inorder (Left-Root-Right)</option>
            <option value="preorder">Preorder (Root-Left-Right)</option>
            <option value="postorder">Postorder (Left-Right-Root)</option>
          </select>

          <button
            onClick={runTraversal}
            disabled={isTraversing}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition text-sm disabled:opacity-50 shadow-lg shadow-emerald-600/20"
          >
            <Play className="w-3.5 h-3.5" /> Run Traversal
          </button>
        </div>
      </div>

      {/* Visual Tree Diagram */}
      <div className="my-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-6 relative min-h-[220px]">
        {/* Level 1: Root */}
        <div className="flex justify-center">
          <motion.div
            animate={{ scale: visitedNodes.includes(20) ? 1.15 : 1 }}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all shadow-md ${
              visitedNodes.includes(20)
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 ring-4 ring-emerald-400/30'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            20
          </motion.div>
        </div>

        {/* Level 2 */}
        <div className="w-full max-w-sm flex justify-around">
          <motion.div
            animate={{ scale: visitedNodes.includes(10) ? 1.15 : 1 }}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all shadow-md ${
              visitedNodes.includes(10)
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 ring-4 ring-emerald-400/30'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            10
          </motion.div>

          <motion.div
            animate={{ scale: visitedNodes.includes(30) ? 1.15 : 1 }}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all shadow-md ${
              visitedNodes.includes(30)
                ? 'bg-emerald-500 text-slate-950 border-emerald-300 ring-4 ring-emerald-400/30'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            30
          </motion.div>
        </div>

        {/* Level 3 */}
        <div className="w-full max-w-md flex justify-around">
          {[5, 15, 25, 35].map((val) => (
            <motion.div
              key={val}
              animate={{ scale: visitedNodes.includes(val) ? 1.15 : 1 }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all shadow-md ${
                visitedNodes.includes(val)
                  ? 'bg-emerald-500 text-slate-950 border-emerald-300 ring-4 ring-emerald-400/30'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}
            >
              {val}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-3 mb-4 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-sm flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{status}</span>
      </div>

      {/* Traversal Result Array */}
      <div className="flex items-center gap-2 font-mono text-sm bg-slate-950 p-3 rounded-xl border border-slate-800">
        <span className="text-slate-400 font-bold">Traversal Output:</span>
        <div className="flex gap-2">
          {visitedNodes.map((val, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
