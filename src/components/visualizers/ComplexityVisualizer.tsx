import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Gauge, TrendingUp } from 'lucide-react';

export const ComplexityVisualizer: React.FC = () => {
  const [n, setN] = useState<number>(100);

  const o1 = 1;
  const oLogN = Math.round(Math.log2(n));
  const oN = n;
  const oNLogN = Math.round(n * Math.log2(n));
  const oN2 = n * n;

  const complexities = [
    { label: 'O(1) Constant', val: o1, color: 'bg-emerald-500', textColor: 'text-emerald-400', speed: 'Blazing Fast' },
    { label: 'O(log N) Logarithmic', val: oLogN, color: 'bg-teal-500', textColor: 'text-teal-400', speed: 'Very Fast' },
    { label: 'O(N) Linear', val: oN, color: 'bg-blue-500', textColor: 'text-blue-400', speed: 'Fair / Good' },
    { label: 'O(N log N) Linearithmic', val: oNLogN, color: 'bg-amber-500', textColor: 'text-amber-400', speed: 'Moderate' },
    { label: 'O(N²) Quadratic', val: oN2, color: 'bg-rose-500', textColor: 'text-rose-400', speed: 'Slow for large N' },
  ];

  const maxVal = Math.max(...complexities.map((c) => c.val));

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-indigo-400" />
            Big-O Complexity Growth Engine
          </h3>
          <p className="text-sm text-slate-400">See how operation counts scale as input size N grows</p>
        </div>

        {/* Input Size Slider */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-xs font-bold font-mono text-indigo-300">Input Size N = {n}</span>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className="accent-indigo-500 cursor-pointer w-32"
          />
        </div>
      </div>

      {/* Bars Chart */}
      <div className="space-y-4 my-6">
        {complexities.map((item, idx) => {
          const percent = Math.max(2, Math.min(100, Math.round((Math.log10(item.val + 1) / Math.log10(maxVal + 1)) * 100)));

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={`font-bold ${item.textColor}`}>{item.label}</span>
                <span className="text-slate-400">
                  <strong className="text-slate-100">{item.val.toLocaleString()}</strong> ops ({item.speed})
                </span>
              </div>

              <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.4 }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-indigo-200 text-xs space-y-1 leading-relaxed">
        <p className="font-bold text-indigo-300 text-sm">💡 C++ Optimization Insight:</p>
        <p>• At N = {n}, Binary Search (O(log N)) takes only ~{oLogN} operations!</p>
        <p>• Bubble Sort (O(N²)) takes {oN2.toLocaleString()} operations. This is why O(N log N) sorting algorithms (Merge Sort, Quick Sort) are critical for competitive coding.</p>
      </div>
    </div>
  );
};
