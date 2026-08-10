import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, LogIn, LogOut, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface Props {
  soundEnabled?: boolean;
}

export const QueueVisualizer: React.FC<Props> = ({ soundEnabled = true }) => {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState<string>('50');
  const [message, setMessage] = useState<string>('Front item is 10. First In, First Out!');

  const handleEnqueue = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;
    if (queue.length >= 6) {
      if (soundEnabled) soundManager.playWrong();
      setMessage('⚠️ Queue Full! Capacity limit reached.');
      return;
    }
    const newQueue = [...queue, val];
    setQueue(newQueue);
    setInputValue(Math.floor(Math.random() * 90 + 10).toString());
    if (soundEnabled) soundManager.playCorrect();
    setMessage(`Enqueued ${val} at the REAR of the queue.`);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      if (soundEnabled) soundManager.playWrong();
      setMessage('⚠️ Queue Underflow! Queue is completely empty.');
      return;
    }
    const dequeuedVal = queue[0];
    const newQueue = queue.slice(1);
    setQueue(newQueue);
    if (soundEnabled) soundManager.playWrong();
    setMessage(`Dequeued ${dequeuedVal} from the FRONT of the queue.`);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 flex items-center gap-2">
            Queue Visualizer (FIFO)
          </h3>
          <p className="text-sm text-slate-400">First In, First Out linear structure</p>
        </div>

        <button
          onClick={() => {
            setQueue([10, 20, 30, 40]);
            setMessage('Queue reset.');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 transition border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Queue Horizontal Tunnel */}
      <div className="my-8 p-6 bg-slate-950/80 rounded-2xl border border-slate-800 relative">
        <div className="flex items-center justify-between text-xs font-mono font-bold mb-3 text-slate-400">
          <span className="flex items-center gap-1 text-teal-400">FRONT (Exit) <LogOut className="w-4 h-4" /></span>
          <span className="flex items-center gap-1 text-blue-400"><LogIn className="w-4 h-4" /> REAR (Enter)</span>
        </div>

        <div className="flex items-center justify-center gap-3 min-h-[100px] border-y-2 border-slate-800 py-4 px-2 overflow-x-auto">
          <AnimatePresence>
            {queue.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === queue.length - 1;

              return (
                <motion.div
                  key={`${idx}-${val}`}
                  initial={{ x: 50, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -50, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className={`relative flex flex-col items-center justify-center w-16 h-20 rounded-xl border-2 font-mono transition-all shrink-0 ${
                    isFront
                      ? 'bg-teal-600/30 border-teal-400 text-teal-100 font-extrabold shadow-lg shadow-teal-500/20'
                      : isRear
                      ? 'bg-blue-600/30 border-blue-400 text-blue-100 font-extrabold'
                      : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="text-[10px] text-slate-400">[{idx}]</span>
                  <span className="text-lg font-bold">{val}</span>

                  {isFront && (
                    <span className="absolute -top-3 px-1.5 py-0.5 rounded bg-teal-500 text-slate-950 text-[9px] font-extrabold">
                      FRONT
                    </span>
                  )}
                  {isRear && !isFront && (
                    <span className="absolute -top-3 px-1.5 py-0.5 rounded bg-blue-500 text-slate-950 text-[9px] font-extrabold">
                      REAR
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {queue.length === 0 && (
            <div className="text-slate-500 text-sm italic py-4">Queue is Empty</div>
          )}
        </div>
      </div>

      {/* Banner & Controls */}
      <div className="p-3 mb-6 rounded-lg bg-teal-950/40 border border-teal-800/50 text-teal-200 text-sm">
        {message}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 font-mono text-sm focus:outline-none focus:border-blue-500"
            placeholder="Val"
          />
          <button
            onClick={handleEnqueue}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white transition text-sm shadow-lg shadow-blue-600/20"
          >
            ENQUEUE <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleDequeue}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 font-bold text-white transition text-sm shadow-lg shadow-teal-600/20"
        >
          DEQUEUE <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
