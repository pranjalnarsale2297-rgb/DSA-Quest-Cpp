import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ArrowDown, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface RecursionFrame {
  n: number;
  callText: string;
  returnVal?: number;
  isBaseCase: boolean;
}

interface Props {
  soundEnabled?: boolean;
}

export const RecursionVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [targetN, setTargetN] = useState<number>(5);
  const [frames, setFrames] = useState<RecursionFrame[]>([]);
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const generateFrames = (nVal: number) => {
    const frameList: RecursionFrame[] = [];
    for (let i = nVal; i >= 1; i--) {
      frameList.push({
        n: i,
        callText: i === 1 ? 'factorial(1) -> BASE CASE!' : `factorial(${i}) = ${i} × factorial(${i - 1})`,
        returnVal: i === 1 ? 1 : undefined,
        isBaseCase: i === 1,
      });
    }
    setFrames(frameList);
    setStep(1);
    setIsRunning(true);
    if (soundEnabled) soundManager.playClick();
  };

  const calculateFactorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            Recursion & Call Stack Visualizer
          </h3>
          <p className="text-sm text-slate-400">Function self-invocation and stack unwinding</p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-300">Factorial(N):</label>
          <select
            value={targetN}
            onChange={(e) => setTargetN(parseInt(e.target.value, 10))}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none"
          >
            <option value={3}>N = 3</option>
            <option value={4}>N = 4</option>
            <option value={5}>N = 5</option>
            <option value={6}>N = 6</option>
          </select>
          <button
            onClick={() => generateFrames(targetN)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 font-bold text-white transition text-sm shadow-lg shadow-amber-600/20"
          >
            <Play className="w-3.5 h-3.5" /> Visualize Stack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
        {/* Call Stack Tower */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Call Stack (Push Phase) ↓</span>
          <div className="w-full max-w-xs h-72 border-x-4 border-b-4 border-amber-500/60 bg-slate-950/80 rounded-b-2xl p-3 flex flex-col-reverse gap-2 shadow-inner overflow-y-auto">
            <AnimatePresence>
              {frames.map((frame, idx) => (
                <motion.div
                  key={frame.n}
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-between shadow-md ${
                    frame.isBaseCase
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                      : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span>{frame.callText}</span>
                  {frame.isBaseCase && <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-extrabold">BASE</span>}
                </motion.div>
              ))}
            </AnimatePresence>
            {frames.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                Stack Empty. Click Visualize!
              </div>
            )}
          </div>
        </div>

        {/* Tree / Unwinding Explanation */}
        <div className="space-y-4 flex flex-col justify-center">
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-amber-200 text-sm space-y-2">
            <h4 className="font-bold flex items-center gap-2 text-amber-400">
              <CheckCircle2 className="w-4 h-4" /> Result: {targetN}! = {calculateFactorial(targetN)}
            </h4>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              1. **Push Phase**: Each call pushes a frame onto the system call stack until base case `factorial(1)` is hit.
            </p>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              2. **Pop / Unwind Phase**: Base case returns 1. Stack pops frames backwards multiplying values: 1 × 2 × 3 ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
