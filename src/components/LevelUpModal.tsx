import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, Sparkles, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  xpEarned?: number;
}

export const LevelUpModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  message,
  xpEarned,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback if canvas-confetti fails
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-indigo-500/50 rounded-3xl p-8 shadow-2xl text-center text-slate-100 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 animate-bounce">
          <Trophy className="w-10 h-10 text-amber-300" />
        </div>

        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-200 to-purple-300 mb-2">
          {title}
        </h3>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">{message}</p>

        {xpEarned && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 text-indigo-300 font-mono font-bold text-sm mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>+{xpEarned} XP GAINED</span>
          </div>
        )}

        <div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-extrabold text-white text-sm shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105"
          >
            CLAIM REWARD 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
