import React from 'react';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Gamepad2,
  Code2,
  BrainCircuit,
  Gauge,
  Award,
  BarChart3,
  Settings,
  X,
} from 'lucide-react';

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<Props> = ({
  activePage,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'coding', label: 'Coding', icon: Code2 },
    { id: 'quizzes', label: 'Quizzes', icon: BrainCircuit },
    { id: 'complexity', label: 'Complexity', icon: Gauge },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-[#0a0f1e] border-r border-slate-800 p-6 flex flex-col justify-between transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-800">
            <span className="font-bold font-mono text-sm text-indigo-400">NAVIGATION MENU</span>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Level Badge */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
          <p className="font-semibold text-slate-300">C++ DSA Quest v1.0</p>
          <p className="text-[11px] text-slate-500">Gamified Interactive Platform</p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex items-center justify-around lg:hidden">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition ${
                isActive ? 'text-indigo-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-mono">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
