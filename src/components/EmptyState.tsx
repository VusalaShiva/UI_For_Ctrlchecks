import { Plus } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { MessageSquare } from 'lucide-react';

interface EmptyStateProps {
  onCreate: () => void;
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <div className="fixed inset-0 flex bg-[#0F172A]">
      {/* Sidebar */}
      <Sidebar activeItem="workflows" />

      {/* Main canvas area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Dot grid background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Empty state content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            {/* Illustration */}
            <div className="mb-8 flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Robot arm */}
                <path
                  d="M 60 120 L 60 80 L 80 60 L 100 60"
                  stroke="#475569"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="60" cy="120" r="12" fill="#475569" />
                <circle cx="60" cy="80" r="8" fill="#64748B" />
                <circle cx="100" cy="60" r="10" fill="#2DD4BF" opacity="0.5" />
                
                {/* Floating puzzle piece */}
                <g transform="translate(130, 70)">
                  <path
                    d="M 0 0 L 30 0 L 30 10 C 30 15 35 15 35 20 C 35 25 30 25 30 30 L 30 40 L 0 40 L 0 30 L -5 30 C -10 30 -10 25 -10 20 C -10 15 -10 10 -5 10 L 0 10 Z"
                    fill="#818CF8"
                    opacity="0.6"
                  />
                  <circle cx="15" cy="20" r="4" fill="#2DD4BF" opacity="0.8" />
                </g>
                
                {/* Dotted connection lines */}
                <line x1="110" y1="60" x2="125" y2="85" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1="110" y1="65" x2="120" y2="100" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                
                {/* Additional floating elements */}
                <circle cx="50" cy="140" r="3" fill="#2DD4BF" opacity="0.4" />
                <circle cx="150" cy="120" r="4" fill="#818CF8" opacity="0.3" />
                <circle cx="100" cy="150" r="2" fill="#2DD4BF" opacity="0.5" />
              </svg>
            </div>

            {/* Text content */}
            <h2 className="text-white text-3xl mb-3">
              No workflows yet
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Tell the AI what you want to automate.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={onCreate}
                className="group px-8 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/50 hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Workflow</span>
              </button>
              
              <button
                onClick={onCreate}
                className="group px-8 py-4 bg-slate-800/50 text-white border border-slate-700/50 rounded-xl transition-all hover:border-[#2DD4BF]/50 hover:bg-slate-800 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Describe to AI Copilot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}