import React from 'react';
import { Gauge } from 'lucide-react';
import { ComplexityVisualizer } from '../components/visualizers/ComplexityVisualizer';

export const ComplexityPage: React.FC = () => {
  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      <div>
        <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
          ALGORITHM EFFICIENCY
        </span>
        <h2 className="text-3xl font-black text-white mt-1">Big-O Complexity Visualizer</h2>
        <p className="text-sm text-slate-400">
          Understand time and space complexity scaling across O(1), O(log N), O(N), O(N log N), and O(N²)!
        </p>
      </div>

      <ComplexityVisualizer />
    </div>
  );
};
