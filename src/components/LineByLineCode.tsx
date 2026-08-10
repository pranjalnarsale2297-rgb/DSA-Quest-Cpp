import React, { useState } from 'react';
import { Play, HelpCircle, Terminal, CheckCircle2 } from 'lucide-react';
import { CodeLineExplanation } from '../types';
import { soundManager } from '../utils/audio';

interface Props {
  codeLines: CodeLineExplanation[];
  rawCode: string;
  expectedOutput: string;
  soundEnabled?: boolean;
}

export const LineByLineCode: React.FC<Props> = ({
  codeLines,
  rawCode,
  expectedOutput,
  soundEnabled = true,
}) => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const handleLineClick = (lineNum: number) => {
    setSelectedLine(selectedLine === lineNum ? null : lineNum);
    if (soundEnabled) soundManager.playClick();
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setShowOutput(false);
    if (soundEnabled) soundManager.playClick();
    await new Promise((r) => setTimeout(r, 600));
    setShowOutput(true);
    setIsExecuting(false);
    if (soundEnabled) soundManager.playCorrect();
  };

  const activeLineObj = codeLines.find((l) => l.lineNum === selectedLine);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100 font-mono text-sm my-6">
      {/* Bar Header */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-bold text-indigo-300 ml-2">main.cpp</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedLine(selectedLine ? null : codeLines[0]?.lineNum || 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            {selectedLine ? 'Hide Line Explanation' : 'Explain Code'}
          </button>

          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            {isExecuting ? 'Compiling...' : 'Run Code'}
          </button>
        </div>
      </div>

      {/* Code Viewer with Line numbers */}
      <div className="p-4 overflow-x-auto text-xs leading-relaxed space-y-1">
        {codeLines.map((item) => {
          const isSelected = selectedLine === item.lineNum;
          return (
            <div
              key={item.lineNum}
              onClick={() => handleLineClick(item.lineNum)}
              className={`flex items-start gap-4 p-1 rounded cursor-pointer transition ${
                isSelected
                  ? 'bg-indigo-900/40 border-l-4 border-indigo-400 text-indigo-100 font-bold'
                  : 'hover:bg-slate-900/80 text-slate-300'
              }`}
            >
              <span className="text-slate-600 select-none w-6 text-right shrink-0">{item.lineNum}</span>
              <span className="flex-1 whitespace-pre">{item.code}</span>
            </div>
          );
        })}
      </div>

      {/* Line Explanation Drawer */}
      {activeLineObj && (
        <div className="p-4 bg-indigo-950/60 border-t border-indigo-800/80 text-indigo-200 text-xs flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Line {activeLineObj.lineNum} Explanation:</strong>
            <p className="leading-relaxed">{activeLineObj.explanation}</p>
          </div>
        </div>
      )}

      {/* Execution Console Output */}
      {showOutput && (
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
            <Terminal className="w-4 h-4" />
            <span>Output (C++ Console):</span>
          </div>
          <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap">
            {expectedOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
