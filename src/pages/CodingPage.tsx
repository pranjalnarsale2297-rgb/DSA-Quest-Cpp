import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Lightbulb, RotateCcw, Terminal, Code2, Trophy } from 'lucide-react';
import { CODING_CHALLENGES } from '../data/challengesData';
import { executeCppCode, ExecutionResult } from '../utils/cppExecutor';
import { UserProgress, UserSettings } from '../types';
import { soundManager } from '../utils/audio';

interface Props {
  initialChallengeId?: string;
  progress: UserProgress;
  settings: UserSettings;
  onSolveChallenge: (challengeId: string, xpReward: number) => void;
}

export const CodingPage: React.FC<Props> = ({
  initialChallengeId,
  progress,
  settings,
  onSolveChallenge,
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(
    initialChallengeId || CODING_CHALLENGES[0].id
  );

  const challenge = CODING_CHALLENGES.find((c) => c.id === selectedChallengeId) || CODING_CHALLENGES[0];

  const [userCode, setUserCode] = useState<string>(challenge.starterCppCode);
  const [activeHintLevel, setActiveHintLevel] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);

  const handleSelectChallenge = (id: string) => {
    setSelectedChallengeId(id);
    const target = CODING_CHALLENGES.find((c) => c.id === id) || CODING_CHALLENGES[0];
    setUserCode(target.starterCppCode);
    setActiveHintLevel(0);
    setExecutionResult(null);
  };

  const handleResetCode = () => {
    setUserCode(challenge.starterCppCode);
    setExecutionResult(null);
    if (settings.soundEnabled) soundManager.playClick();
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setExecutionResult(null);
    if (settings.soundEnabled) soundManager.playClick();

    await new Promise((r) => setTimeout(r, 600));

    const res = executeCppCode(userCode, challenge.testCases, challenge.solutionCppCode);
    setExecutionResult(res);
    setIsExecuting(false);

    if (res.success) {
      if (settings.soundEnabled) soundManager.playLevelUp();
      onSolveChallenge(challenge.id, challenge.xpReward);
    } else {
      if (settings.soundEnabled) soundManager.playWrong();
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      {/* Title & Challenge Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
            C++ CODING ENVIRONMENT
          </span>
          <h2 className="text-3xl font-black text-white mt-1">C++ Challenge Engine</h2>
        </div>

        <select
          value={selectedChallengeId}
          onChange={(e) => handleSelectChallenge(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-100 focus:outline-none"
        >
          {CODING_CHALLENGES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.difficulty.toUpperCase()}: {c.title} ({c.xpReward} XP)
            </option>
          ))}
        </select>
      </div>

      {/* Main IDE Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Problem Details */}
        <div className="space-y-6 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
              {challenge.difficulty} Difficulty
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">
              +{challenge.xpReward} XP REWARD
            </span>
          </div>

          <h3 className="text-2xl font-black text-white">{challenge.title}</h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {challenge.problemStatement}
          </p>

          {/* Input / Output Examples */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold font-mono text-slate-400 uppercase">Example Input & Output</h4>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <p><span className="text-indigo-400 font-bold">Input:</span> {challenge.exampleInput}</p>
              <p><span className="text-emerald-400 font-bold">Output:</span> {challenge.exampleOutput}</p>
            </div>
          </div>

          {/* 3-Tier Hint Unlocker */}
          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <Lightbulb className="w-4 h-4" />
              <span>3-Tier Guided Hints</span>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveHintLevel(activeHintLevel === level ? 0 : level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                    activeHintLevel === level
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 text-amber-300 border-amber-800/60 hover:bg-slate-900'
                  }`}
                >
                  Hint {level}
                </button>
              ))}
            </div>

            {activeHintLevel > 0 && (
              <div className="p-3 bg-slate-950 rounded-xl border border-amber-800/50 text-xs text-amber-200 leading-relaxed font-mono">
                {challenge.hints[activeHintLevel - 1]}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Console Output */}
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-indigo-300 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> C++ Solution Editor
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  title="Reset Code"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  {isExecuting ? 'Compiling C++...' : 'Run & Test'}
                </button>
              </div>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-80 p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none"
              spellCheck={false}
            />
          </div>

          {/* Test Results Terminal Display */}
          {executionResult && (
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold flex items-center gap-2 text-slate-200">
                  <Terminal className="w-4 h-4 text-indigo-400" /> Test Execution Results
                </span>
                {executionResult.success ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> ALL TESTS PASSED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <XCircle className="w-4 h-4" /> TESTS FAILED
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {executionResult.testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      tr.passed
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                    }`}
                  >
                    <span>Test Case #{idx + 1} (Input: {tr.input})</span>
                    <span className="font-bold">{tr.passed ? 'PASSED' : `Expected ${tr.expected}, Got ${tr.actual}`}</span>
                  </div>
                ))}
              </div>

              {executionResult.error && (
                <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-xs">
                  {executionResult.error}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
