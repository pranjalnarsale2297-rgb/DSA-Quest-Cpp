import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  soundEnabled?: boolean;
}

export const ArrayVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50]);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [searchTarget, setSearchTarget] = useState<string>('30');
  const [insertVal, setInsertVal] = useState<string>('25');
  const [insertIdx, setInsertIdx] = useState<string>('2');
  const [statusMessage, setStatusMessage] = useState<string>('Click any element to inspect its 0-based index and value!');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleElementClick = (idx: number, val: number) => {
    setHighlightIndex(idx);
    if (soundEnabled) soundManager.playClick();
    setStatusMessage(`Selected arr[${idx}] = ${val}. Stored in memory address 0x100${idx * 4}.`);
  };

  const handleSearch = async () => {
    const target = parseInt(searchTarget, 10);
    if (isNaN(target)) return;

    setIsSearching(true);
    setStatusMessage(`Searching linearly for ${target}...`);

    for (let i = 0; i < array.length; i++) {
      setHighlightIndex(i);
      if (soundEnabled) soundManager.playClick();
      setStatusMessage(`Checking arr[${i}] = ${array[i]}...`);
      await new Promise((r) => setTimeout(r, 600));

      if (array[i] === target) {
        if (soundEnabled) soundManager.playCorrect();
        setStatusMessage(`🔥 Found target ${target} at index ${i}!`);
        setIsSearching(false);
        return;
      }
    }

    if (soundEnabled) soundManager.playWrong();
    setStatusMessage(`❌ Target ${target} not found in array.`);
    setIsSearching(false);
  };

  const handleInsert = () => {
    const val = parseInt(insertVal, 10);
    const idx = parseInt(insertIdx, 10);
    if (isNaN(val) || isNaN(idx) || idx < 0 || idx > array.length) {
      setStatusMessage('⚠️ Invalid index or value for insertion!');
      return;
    }

    const newArr = [...array];
    newArr.splice(idx, 0, val);
    setArray(newArr);
    setHighlightIndex(idx);
    if (soundEnabled) soundManager.playCorrect();
    setStatusMessage(`Inserted value ${val} at index ${idx}. Elements shifted right!`);
  };

  const handleDelete = (idxToDelete: number) => {
    if (array.length <= 1) {
      setStatusMessage('Array must have at least one element!');
      return;
    }
    const val = array[idxToDelete];
    const newArr = array.filter((_, idx) => idx !== idxToDelete);
    setArray(newArr);
    setHighlightIndex(null);
    if (soundEnabled) soundManager.playWrong();
    setStatusMessage(`Deleted element ${val} from index ${idxToDelete}. Leftover elements shifted left.`);
  };

  const handleReset = () => {
    setArray([10, 20, 30, 40, 50]);
    setHighlightIndex(null);
    setStatusMessage('Reset array to default state: [10, 20, 30, 40, 50]');
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Interactive C++ Array Visualizer
          </h3>
          <p className="text-sm text-slate-400">0-indexed contiguous memory blocks</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Array
        </button>
      </div>

      {/* Visual Array Blocks */}
      <div className="my-8 flex flex-wrap items-center justify-center gap-3 min-h-[120px] p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <AnimatePresence>
          {array.map((val, idx) => {
            const isHighlighted = highlightIndex === idx;
            return (
              <motion.div
                key={`${idx}-${val}`}
                initial={{ scale: 0.8, opacity: 0, y: -20 }}
                animate={{ scale: isHighlighted ? 1.08 : 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                onClick={() => handleElementClick(idx, val)}
                className={`relative cursor-pointer group flex flex-col items-center justify-center w-16 h-20 rounded-xl border-2 transition-all ${
                  isHighlighted
                    ? 'bg-indigo-600/30 border-indigo-400 shadow-lg shadow-indigo-500/20 text-white font-extrabold scale-105'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <span className="text-xs font-mono text-indigo-300/80 mb-1">[{idx}]</span>
                <span className="text-lg font-bold font-mono">{val}</span>

                {/* Delete button on hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(idx);
                  }}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition shadow-md"
                  title="Delete element"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Status Banner */}
      <div className="mb-6 p-3 rounded-lg bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 text-sm flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>{statusMessage}</span>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Search Control */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between gap-3">
          <label className="font-semibold text-slate-300 flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-400" />
            Linear Search
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
              placeholder="Target value"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition disabled:opacity-50 shrink-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* Insert Control */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between gap-3">
          <label className="font-semibold text-slate-300 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            Insert Element
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={insertVal}
              onChange={(e) => setInsertVal(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-emerald-500"
              placeholder="Value"
            />
            <input
              type="number"
              value={insertIdx}
              onChange={(e) => setInsertIdx(e.target.value)}
              className="w-1/2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-emerald-500"
              placeholder="Index"
            />
            <button
              onClick={handleInsert}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold text-white transition shrink-0"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
