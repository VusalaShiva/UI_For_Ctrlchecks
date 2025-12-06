import { useState } from 'react';
import { WorkflowBuilder } from './components/WorkflowBuilder';
import { LandingPage } from './components/LandingPage';
import { NodeLibraryAndRun } from './components/NodeLibraryAndRun';
import { EmptyState } from './components/EmptyState';

type Screen = 'landing' | 'builder' | 'library' | 'empty';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  const screens = {
    landing: <LandingPage onStart={() => setCurrentScreen('empty')} />,
    builder: <WorkflowBuilder />,
    library: <NodeLibraryAndRun />,
    empty: <EmptyState onCreate={() => setCurrentScreen('builder')} />
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Screen Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2">
        <button
          onClick={() => setCurrentScreen('landing')}
          className={`px-4 py-2 rounded-xl transition-all ${
            currentScreen === 'landing'
              ? 'bg-[#2DD4BF] text-slate-900'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setCurrentScreen('empty')}
          className={`px-4 py-2 rounded-xl transition-all ${
            currentScreen === 'empty'
              ? 'bg-[#2DD4BF] text-slate-900'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Empty State
        </button>
        <button
          onClick={() => setCurrentScreen('builder')}
          className={`px-4 py-2 rounded-xl transition-all ${
            currentScreen === 'builder'
              ? 'bg-[#2DD4BF] text-slate-900'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Workflow Builder
        </button>
        <button
          onClick={() => setCurrentScreen('library')}
          className={`px-4 py-2 rounded-xl transition-all ${
            currentScreen === 'library'
              ? 'bg-[#2DD4BF] text-slate-900'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Node Library
        </button>
      </div>

      {/* Current Screen */}
      {screens[currentScreen]}
    </div>
  );
}