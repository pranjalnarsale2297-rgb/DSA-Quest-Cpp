import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus, RefreshCw, Repeat } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface NodeItem {
  id: string;
  data: number;
}

interface Props {
  soundEnabled?: boolean;
}

export const LinkedListVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: 'n1', data: 10 },
    { id: 'n2', data: 20 },
    { id: 'n3', data: 30 },
  ]);
  const [newValue, setNewValue] = useState<string>('25');
  const [message, setMessage] = useState<string>('Head points to node 10. Each node holds data and a pointer (next) to the next node.');

  const handleInsertHead = () => {
    const val = parseInt(newValue, 10);
    if (isNaN(val)) return;
    const newNode: NodeItem = { id: `n_${Date.now()}`, data: val };
    setNodes([newNode, ...nodes]);
    setNewValue(Math.floor(Math.random() * 90 + 10).toString());
    if (soundEnabled) soundManager.playCorrect();
    setMessage(`Inserted ${val} at HEAD. Updated Head pointer to point to new node!`);
  };

  const handleInsertTail = () => {
    const val = parseInt(newValue, 10);
    if (isNaN(val)) return;
    const newNode: NodeItem = { id: `n_${Date.now()}`, data: val };
    setNodes([...nodes, newNode]);
    setNewValue(Math.floor(Math.random() * 90 + 10).toString());
    if (soundEnabled) soundManager.playCorrect();
    setMessage(`Inserted ${val} at TAIL. Updated previous tail's next pointer to point to new node!`);
  };

  const handleReverse = () => {
    if (nodes.length <= 1) return;
    setNodes([...nodes].reverse());
    if (soundEnabled) soundManager.playLevelUp();
    setMessage('🔥 Reversed Linked List! All next pointers inverted.');
  };

  const handleReset = () => {
    setNodes([
      { id: 'n1', data: 10 },
      { id: 'n2', data: 20 },
      { id: 'n3', data: 30 },
    ]);
    setMessage('Reset Linked List.');
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Singly Linked List Visualizer
          </h3>
          <p className="text-sm text-slate-400">Nodes connected dynamically in memory via pointers</p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Nodes visual row */}
      <div className="my-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center gap-2 overflow-x-auto min-h-[140px]">
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800/80">
          HEAD →
        </span>

        <AnimatePresence>
          {nodes.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="flex rounded-xl overflow-hidden border-2 border-emerald-500/80 bg-slate-900 shadow-lg shadow-emerald-500/10 shrink-0"
                >
                  {/* Data Box */}
                  <div className="w-14 h-16 bg-slate-800 flex flex-col items-center justify-center border-r border-slate-700">
                    <span className="text-[10px] text-slate-400 font-mono">data</span>
                    <span className="text-lg font-bold font-mono text-emerald-200">{node.data}</span>
                  </div>

                  {/* Next Pointer Box */}
                  <div className="w-12 h-16 bg-emerald-950/50 flex flex-col items-center justify-center text-emerald-400">
                    <span className="text-[9px] font-mono text-emerald-300/80">next</span>
                    <ArrowRight className="w-4 h-4 mt-1" />
                  </div>
                </motion.div>

                {/* Arrow connector */}
                {!isTail && (
                  <ArrowRight className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
                )}
              </React.Fragment>
            );
          })}
        </AnimatePresence>

        <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-1 rounded border border-rose-800/80 shrink-0">
          NULL
        </span>
      </div>

      <div className="p-3 mb-6 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-sm">
        {message}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="w-24 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-emerald-500"
          placeholder="Value"
        />

        <button
          onClick={handleInsertHead}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition text-sm shadow-lg shadow-emerald-600/20"
        >
          <Plus className="w-4 h-4" /> Insert Head
        </button>

        <button
          onClick={handleInsertTail}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-white transition text-sm shadow-lg shadow-teal-600/20"
        >
          <Plus className="w-4 h-4" /> Insert Tail
        </button>

        <button
          onClick={handleReverse}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition text-sm shadow-lg shadow-indigo-600/20"
        >
          <Repeat className="w-4 h-4" /> Reverse List
        </button>
      </div>
    </div>
  );
};
