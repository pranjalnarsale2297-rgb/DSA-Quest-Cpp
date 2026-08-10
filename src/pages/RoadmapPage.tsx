import React, { useState } from 'react';
import { CheckCircle2, Lock, Sparkles, MapPin, Search } from 'lucide-react';
import { ROADMAP_LEVELS } from '../data/roadmapData';
import { UserProgress } from '../types';

interface Props {
  progress: UserProgress;
  onSelectTopic: (topicId: string) => void;
}

export const RoadmapPage: React.FC<Props> = ({ progress, onSelectTopic }) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isTopicCompleted = (topicId: string) => progress.completedTopics.includes(topicId);

  const filteredLevels = ROADMAP_LEVELS.filter((lvl) => {
    if (selectedLevelFilter !== 'all' && lvl.levelNum !== selectedLevelFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest">
            VISUAL LEARNING PATH
          </span>
          <h2 className="text-3xl font-black text-white mt-1">
            C++ DSA Quest Roadmap
          </h2>
          <p className="text-sm text-slate-400">
            55 curated topics spanning 10 progressive difficulty levels
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-indigo-500 w-48"
            />
          </div>

          <select
            value={selectedLevelFilter}
            onChange={(e) => setSelectedLevelFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-slate-200 focus:outline-none"
          >
            <option value="all">All 10 Levels</option>
            {ROADMAP_LEVELS.map((lvl) => (
              <option key={lvl.levelNum} value={lvl.levelNum}>
                Level {lvl.levelNum}: {lvl.title.split('—')[1]?.trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Roadmap Path Map View */}
      <div className="space-y-12 relative">
        {filteredLevels.map((lvl) => {
          const filteredTopics = lvl.topics.filter((t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredTopics.length === 0) return null;

          return (
            <div key={lvl.levelNum} className="space-y-6">
              {/* Level Category Banner */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                    {lvl.title}
                  </h3>
                  <p className="text-xs text-slate-400">{lvl.description}</p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {lvl.topics.filter((t) => isTopicCompleted(t.id)).length} / {lvl.topics.length} Done
                </span>
              </div>

              {/* Topics Grid Path */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTopics.map((topic) => {
                  const completed = isTopicCompleted(topic.id);
                  const isCurrent = progress.currentTopicId === topic.id;

                  return (
                    <div
                      key={topic.id}
                      onClick={() => onSelectTopic(topic.id)}
                      className={`cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 group relative overflow-hidden ${
                        completed
                          ? 'bg-slate-900/90 border-emerald-500/50 hover:border-emerald-400 shadow-lg shadow-emerald-500/5'
                          : isCurrent
                          ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl shadow-indigo-500/20 scale-102'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-90'
                      }`}
                    >
                      {/* Top Status Icon Badge */}
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                          Topic #{topic.topicNum}
                        </span>

                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                        ) : isCurrent ? (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500 text-white font-mono text-[10px] font-extrabold animate-pulse">
                            <Sparkles className="w-3 h-3" /> CURRENT
                          </span>
                        ) : (
                          <Lock className="w-4 h-4 text-slate-600" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-slate-100 group-hover:text-indigo-300 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
                        <span>{topic.estimatedTime}</span>
                        {topic.hasGame && (
                          <span className="text-purple-400 font-bold">🎮 Mini Game</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
