import React, { useState } from 'react';
import { Settings, Volume2, VolumeX, Moon, Sun, RotateCcw, ShieldAlert } from 'lucide-react';
import { UserSettings } from '../types';
import { soundManager } from '../utils/audio';

interface Props {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onResetProgress: () => void;
}

export const SettingsPage: React.FC<Props> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleToggleSound = () => {
    const newVal = !settings.soundEnabled;
    onUpdateSettings({ soundEnabled: newVal });
    if (newVal) soundManager.playClick();
  };

  const handleToggleDark = () => {
    onUpdateSettings({ darkMode: !settings.darkMode });
    if (settings.soundEnabled) soundManager.playClick();
  };

  const handleToggleAnimations = () => {
    onUpdateSettings({ animationsEnabled: !settings.animationsEnabled });
    if (settings.soundEnabled) soundManager.playClick();
  };

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-4xl mx-auto text-slate-100">
      <div>
        <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
          SYSTEM PREFERENCES
        </span>
        <h2 className="text-3xl font-black text-white mt-1">Quest Settings</h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        {/* Sound Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              Audio Sound Effects
            </h4>
            <p className="text-xs text-slate-400">Synthesize Web Audio FX for clicks, victories, and level-ups</p>
          </div>

          <button
            onClick={handleToggleSound}
            className={`w-12 h-6 rounded-full transition p-1 ${settings.soundEnabled ? 'bg-indigo-600' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" /> Dark Theme Mode
            </h4>
            <p className="text-xs text-slate-400">Comfortable eye-safe navy canvas styling</p>
          </div>

          <button
            onClick={handleToggleDark}
            className={`w-12 h-6 rounded-full transition p-1 ${settings.darkMode ? 'bg-indigo-600' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Animations Toggle */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          <div className="space-y-0.5">
            <h4 className="font-bold text-slate-200 text-sm">Motion & Visual Animations</h4>
            <p className="text-xs text-slate-400">Enable interactive smooth transitions</p>
          </div>

          <button
            onClick={handleToggleAnimations}
            className={`w-12 h-6 rounded-full transition p-1 ${settings.animationsEnabled ? 'bg-indigo-600' : 'bg-slate-800'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settings.animationsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-6 rounded-3xl bg-rose-950/30 border border-rose-800/50 space-y-4">
        <h4 className="font-bold text-rose-300 text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" /> Danger Zone: Reset All Student Progress
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Resetting will clear all earned XP, streaks, level status, unlocked badges, and completed coding challenges saved in your browser localStorage.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white transition"
          >
            Reset Progress
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onResetProgress();
                setShowResetConfirm(false);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 font-bold text-xs text-white"
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 font-bold text-xs text-slate-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
