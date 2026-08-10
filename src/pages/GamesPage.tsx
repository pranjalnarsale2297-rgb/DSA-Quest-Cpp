import React, { useState } from 'react';
import { Gamepad2, Trophy, Sparkles } from 'lucide-react';
import { UserProgress, UserSettings } from '../types';
import { ArraySortGame } from '../components/games/ArraySortGame';
import { BinarySearchGame } from '../components/games/BinarySearchGame';
import { StackGame } from '../components/games/StackGame';
import { QueueGame } from '../components/games/QueueGame';
import { LinkedListGame } from '../components/games/LinkedListGame';
import { RecursionGame } from '../components/games/RecursionGame';
import { TreeGame } from '../components/games/TreeGame';
import { GraphGame } from '../components/games/GraphGame';
import { CodeDebuggerGame } from '../components/games/CodeDebuggerGame';

interface Props {
  progress: UserProgress;
  settings: UserSettings;
  onCompleteGame: (xpEarned: number) => void;
}

export const GamesPage: React.FC<Props> = ({ progress, settings, onCompleteGame }) => {
  const [activeGameId, setActiveGameId] = useState<string>('array_sort');

  const gamesList = [
    { id: 'array_sort', title: 'Array Sort Puzzle', category: 'Arrays', xp: 50 },
    { id: 'binary_search', title: 'Binary Search Halving', category: 'Searching', xp: 50 },
    { id: 'stack', title: 'Stack LIFO Sequence', category: 'Stack', xp: 50 },
    { id: 'queue', title: 'Queue FIFO Line Manager', category: 'Queue', xp: 50 },
    { id: 'linked_list', title: 'Reverse Pointer Quest', category: 'Linked List', xp: 50 },
    { id: 'recursion', title: 'Base Case Defender', category: 'Recursion', xp: 50 },
    { id: 'tree', title: 'Inorder Traversal Challenge', category: 'Trees', xp: 50 },
    { id: 'graph', title: 'Pathfinder Quest', category: 'Graphs', xp: 50 },
    { id: 'debugger', title: 'C++ Bug Hunter', category: 'C++ Debugging', xp: 50 },
  ];

  const renderActiveGame = () => {
    switch (activeGameId) {
      case 'array_sort':
        return <ArraySortGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'binary_search':
        return <BinarySearchGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'stack':
        return <StackGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'queue':
        return <QueueGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'linked_list':
        return <LinkedListGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'recursion':
        return <RecursionGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'tree':
        return <TreeGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'graph':
        return <GraphGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      case 'debugger':
        return <CodeDebuggerGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
      default:
        return <ArraySortGame soundEnabled={settings.soundEnabled} onComplete={onCompleteGame} />;
    }
  };

  return (
    <div className="space-y-8 p-4 lg:p-8 max-w-7xl mx-auto text-slate-100">
      {/* Header */}
      <div>
        <span className="text-xs font-bold font-mono text-purple-400 uppercase tracking-widest">
          INTERACTIVE GAMIFIED HUBS
        </span>
        <h2 className="text-3xl font-black text-white mt-1">DSA Quest Mini-Games</h2>
        <p className="text-sm text-slate-400">
          Reinforce algorithmic thinking by solving visual interactive puzzles. Each win grants +50 XP!
        </p>
      </div>

      {/* Game selector pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {gamesList.map((g) => {
          const isActive = activeGameId === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGameId(g.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-100'
              }`}
            >
              {g.title}
            </button>
          );
        })}
      </div>

      {/* Embedded Active Game Component */}
      <div className="max-w-4xl mx-auto">
        {renderActiveGame()}
      </div>
    </div>
  );
};
