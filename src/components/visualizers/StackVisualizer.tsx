import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown, Eye, RefreshCw, Layers } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  soundEnabled?: boolean;
}

export const StackVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState<string>('40');
  const [message, setMessage] = useState<string>('Top of stack is 30. Last In, First Out!');

  const handlePush = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    if (stack.length >= 6) {
      if (soundEnabled) soundManager.playWrong();
      setMessage('⚠️ Stack Overflow! Stack capacity limit reached.');
      return;
    }
    const newStack = [...stack, val];
    setStack(newStack);
    setInputValue(Math.floor(Math.random() * 90 + 10).toString());
    if (soundEnabled) soundManager.playCorrect();
    setMessage(`Pushed ${val} onto top of stack.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      if (soundEnabled) soundManager.playWrong();
      setMessage('⚠️ Stack Underflow! Stack is completely empty.');
      return;
    }
    const poppedVal = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    setStack(newStack);
    if (soundEnabled) soundManager.playWrong();
    setMessage(`Popped ${poppedVal} from top of stack.`);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty. Nothing to peek.');
      return;
    }
    const topVal = stack[stack.length - 1];
    if (soundEnabled) soundManager.playClick();
    setMessage(`Peek top element: ${topVal}`);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Stack Visualizer (LIFO)
          </h3>
          <p className="text-sm text-slate-400">Last In, First Out memory structure</p>
        </div>

        <button
          onClick={() => {
            setStack([10, 20, 30]);
            setMessage('Stack reset.');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-6">
        {/* Stack Vertical Container */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Top of Stack ↑</span>
          
          <div className="w-48 h-64 border-x-4 border-b-4 border-purple-500/60 bg-slate-950/80 rounded-b-2xl p-3 flex flex-col-reverse justify-start gap-2 shadow-inner overflow-hidden relative">
            <AnimatePresence>
              {stack.map((val, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <motion.div
                    key={`${idx}-${val}`}
                    initial={{ y: -50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -50, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className={`w-full h-10 rounded-xl flex items-center justify-between px-4 font-mono font-bold transition-all shadow-md ${
                      isTop
                        ? 'bg-purple-600 text-white border-2 border-purple-300 ring-2 ring-purple-400/50 shadow-purple-500/30'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="text-xs text-purple-200/70">#{idx}</span>
                    <span className="text-base">{val}</span>
                    {isTop && <span className="text-[10px] bg-purple-950/80 text-purple-200 px-1.5 py-0.5 rounded">TOP</span>}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {stack.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm italic">
                Stack is Empty
              </div>
            )}
          </div>

          <span className="text-xs font-mono text-slate-500 mt-2">Bottom of Stack</span>
        </div>

        {/* Controls & Operations */}
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/50 text-purple-200 text-sm">
            {message}
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-24 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-purple-500"
                placeholder="Val"
              />
              <button
                onClick={handlePush}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white transition text-sm shadow-lg shadow-purple-600/20"
              >
                <ArrowDown className="w-4 h-4" /> PUSH (x)
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePop}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white transition text-sm shadow-lg shadow-rose-600/20"
              >
                <ArrowUp className="w-4 h-4" /> POP ()
              </button>

              <button
                onClick={handlePeek}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 transition text-sm border border-slate-700"
              >
                <Eye className="w-4 h-4" /> PEEK ()
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
