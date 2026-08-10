import React from 'react';
import { motion } from 'motion/react';
import { Play, Map, Flame, Trophy, Sparkles, ArrowRight, Code2, Layers, GitBranch } from 'lucide-react';
import { UserProgress } from '../types';

interface Props {
  progress: UserProgress;
  onStartLearning: () => void;
  onExploreRoadmap: () => void;
}

export const LandingPage: React.FC<Props> = ({
  progress,
  onStartLearning,
  onExploreRoadmap,
}) => {
  const dsPipeline = [
    { name: 'Array', icon: '[]', color: 'from-blue-500 to-indigo-500' },
    { name: 'Linked List', icon: '->', color: 'from-emerald-500 to-teal-500' },
    { name: 'Stack', icon: '≡', color: 'from-purple-500 to-pink-500' },
    { name: 'Queue', icon: '||', color: 'from-teal-500 to-cyan-500' },
    { name: 'Tree', icon: 'Y', color: 'from-amber-500 to-orange-500' },
    { name: 'Graph', icon: '*', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header Banner */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-700/80 text-indigo-300 text-xs font-mono font-bold shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>GAMIFIED C++ DSA LEARNING PLATFORM FOR BEGINNERS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-300 leading-tight"
        >
          Learn DSA. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Play. Code. Master.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-normal leading-relaxed"
        >
          Master Data Structures & Algorithms in C++ through interactive games, visualizations, and coding challenges. Zero prior experience needed!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onStartLearning}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-extrabold text-white text-base shadow-2xl shadow-indigo-600/40 transition-all hover:scale-105"
          >
            <Play className="w-5 h-5 fill-white" />
            Start Learning
          </button>

          <button
            onClick={onExploreRoadmap}
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-base transition-all hover:scale-105"
          >
            <Map className="w-5 h-5 text-indigo-400" />
            Explore Roadmap
          </button>
        </motion.div>

        {/* Interactive DS Pipeline Animation */}
        <div className="pt-12 pb-8">
          <p className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest mb-6">
            INTERACTIVE DATA STRUCTURE QUEST PIPELINE
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {dsPipeline.map((ds, idx) => (
              <React.Fragment key={idx}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  className={`px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2.5 shadow-xl font-mono text-sm font-bold text-slate-200 cursor-pointer`}
                >
                  <span className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${ds.color} flex items-center justify-center text-white text-xs`}>
                    {ds.icon}
                  </span>
                  <span>{ds.name}</span>
                </motion.div>

                {idx < dsPipeline.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Quick Stats Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Your Total XP</span>
            <span className="text-2xl font-black font-mono text-indigo-400">{progress.xp} XP</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Current Level</span>
            <span className="text-xl font-bold text-slate-100">Level {progress.level} ({progress.levelName})</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Streak</span>
            <span className="text-2xl font-black text-amber-400 flex items-center gap-1 font-mono">
              <Flame className="w-5 h-5 fill-amber-400" /> {progress.streakDays} Days
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Completed Topics</span>
            <span className="text-2xl font-black font-mono text-emerald-400">{progress.completedTopics.length} / 55</span>
          </div>
        </div>
      </div>
    </div>
  );
};
