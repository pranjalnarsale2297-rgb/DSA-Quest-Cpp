import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Step {
  low: number;
  high: number;
  mid: number;
  status: string;
  found: boolean;
  eliminated: number[]; // indices
}

interface Props {
  soundEnabled?: boolean;
}

export const BinarySearchVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const sortedArray = [10, 18, 25, 32, 42, 55, 68, 77, 89, 95];
  const [target, setTarget] = useState<string>('42');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(-1);

  const calculateSteps = (targetVal: number) => {
    const newSteps: Step[] = [];
    let low = 0;
    let high = sortedArray.length - 1;
    let found = false;
    const eliminated: number[] = [];

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);
      const midVal = sortedArray[mid];

      if (midVal === targetVal) {
        found = true;
        newSteps.push({
          low,
          high,
          mid,
          status: `🔥 Target ${targetVal} matches arr[${mid}] = ${midVal}! Found!`,
          found: true,
          eliminated: [...eliminated],
        });
        break;
      } else if (midVal < targetVal) {
        // eliminate left side
        for (let i = low; i <= mid; i++) {
          if (!eliminated.includes(i)) eliminated.push(i);
        }
        newSteps.push({
          low,
          high,
          mid,
          status: `arr[${mid}] (${midVal}) < Target (${targetVal}). Discarding left half [${low}..${mid}]. Move LOW to ${mid + 1}.`,
          found: false,
          eliminated: [...eliminated],
        });
        low = mid + 1;
      } else {
        // eliminate right side
        for (let i = mid; i <= high; i++) {
          if (!eliminated.includes(i)) eliminated.push(i);
        }
        newSteps.push({
          low,
          high,
          mid,
          status: `arr[${mid}] (${midVal}) > Target (${targetVal}). Discarding right half [${mid}..${high}]. Move HIGH to ${mid - 1}.`,
          found: false,
          eliminated: [...eliminated],
        });
        high = mid - 1;
      }
    }

    if (!found) {
      newSteps.push({
        low,
        high,
        mid: -1,
        status: `❌ Target ${targetVal} is not in the array. Search terminated with low > high.`,
        found: false,
        eliminated: sortedArray.map((_, i) => i),
      });
    }

    setSteps(newSteps);
    setCurrentStepIdx(0);
    if (soundEnabled) soundManager.playClick();
  };

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (soundEnabled) {
        if (steps[nextIdx].found) soundManager.playCorrect();
        else soundManager.playClick();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
      if (soundEnabled) soundManager.playClick();
    }
  };

  const currentStep = currentStepIdx >= 0 && currentStepIdx < steps.length ? steps[currentStepIdx] : null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Binary Search O(log N) Visualizer
          </h3>
          <p className="text-sm text-slate-400">Step-by-step halving of sorted memory space</p>
        </div>

        {/* Target Input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500"
            placeholder="Target"
          />
          <button
            onClick={() => calculateSteps(parseInt(target, 10))}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-white transition text-sm"
          >
            <Play className="w-3.5 h-3.5" /> Start Search
          </button>
        </div>
      </div>

      {/* Array Display */}
      <div className="my-8 flex flex-wrap items-center justify-center gap-3 min-h-[140px] p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
        {sortedArray.map((val, idx) => {
          const isLow = currentStep?.low === idx;
          const isHigh = currentStep?.high === idx;
          const isMid = currentStep?.mid === idx;
          const isEliminated = currentStep?.eliminated.includes(idx);
          const isFound = currentStep?.found && isMid;

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Top pointer badges */}
              <div className="h-6 flex items-center gap-1 text-[10px] font-bold font-mono">
                {isLow && <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950">LOW</span>}
                {isMid && <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">MID</span>}
                {isHigh && <span className="px-1.5 py-0.5 rounded bg-rose-500 text-slate-950">HIGH</span>}
              </div>

              {/* Element Box */}
              <motion.div
                animate={{
                  scale: isMid ? 1.1 : 1,
                  opacity: isEliminated ? 0.3 : 1,
                }}
                className={`w-14 h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                  isFound
                    ? 'bg-emerald-600/40 border-emerald-400 text-emerald-200 font-extrabold shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                    : isMid
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                    : isEliminated
                    ? 'bg-slate-900 border-slate-800 text-slate-600 line-through'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400">[{idx}]</span>
                <span className="text-base font-mono font-bold">{val}</span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Status / Step Navigation */}
      {currentStep ? (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-200 text-sm flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{currentStep.status}</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 shrink-0">
              Step {currentStepIdx + 1} of {steps.length}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIdx <= 0}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Step
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIdx >= steps.length - 1}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition disabled:opacity-40"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-slate-400 italic">Enter a target number and click Start Search!</p>
      )}
    </div>
  );
};
