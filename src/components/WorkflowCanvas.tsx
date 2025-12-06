import { Play, Zap, Globe, GitBranch, MessageSquare } from 'lucide-react';

interface WorkflowCanvasProps {
  onNodeSelect: (nodeId: string) => void;
  selectedNode: string;
}

export function WorkflowCanvas({ onNodeSelect, selectedNode }: WorkflowCanvasProps) {
  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Dot grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Canvas content */}
      <div className="relative z-10 w-full h-full p-12">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="lineGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
          
          {/* Curved connecting lines with glow */}
          <path
            d="M 140 180 Q 200 180, 260 180"
            stroke="url(#lineGradient1)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M 420 180 Q 480 180, 540 210"
            stroke="url(#lineGradient2)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M 700 240 Q 750 280, 800 320"
            stroke="url(#lineGradient3)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
          />
          <path
            d="M 880 360 Q 900 390, 920 420"
            stroke="url(#lineGradient4)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Nodes */}
        <div className="relative" style={{ zIndex: 2 }}>
          {/* Start Node */}
          <div
            className="absolute cursor-pointer group"
            style={{ left: '60px', top: '150px' }}
            onClick={() => onNodeSelect('start-node')}
          >
            <div className="relative">
              <div className="w-20 h-20 bg-green-500/10 border-2 border-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 transition-all group-hover:shadow-green-500/70 group-hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-slate-400">
                Start
              </div>
            </div>
          </div>

          {/* OpenAI LLM Node */}
          <div
            className="absolute cursor-pointer group"
            style={{ left: '260px', top: '140px' }}
            onClick={() => onNodeSelect('llm-node')}
          >
            <div className="relative">
              <div className={`w-40 h-24 bg-slate-800/80 backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all group-hover:scale-105 ${
                selectedNode === 'llm-node' 
                  ? 'border-[#2DD4BF] shadow-[#2DD4BF]/30 ring-2 ring-[#2DD4BF]/50' 
                  : 'border-slate-600/50 shadow-slate-900/50 group-hover:border-[#2DD4BF]/50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#818CF8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#2DD4BF] text-sm">OpenAI LLM</div>
                    <div className="text-slate-400 text-xs mt-1">GPT-4 Turbo</div>
                  </div>
                </div>
                {selectedNode === 'llm-node' && (
                  <div className="absolute -inset-1 bg-[#2DD4BF]/20 rounded-2xl -z-10 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* HTTP Request Node */}
          <div
            className="absolute cursor-pointer group"
            style={{ left: '540px', top: '170px' }}
            onClick={() => onNodeSelect('http-node')}
          >
            <div className="relative">
              <div className={`w-40 h-24 bg-slate-800/80 backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all group-hover:scale-105 ${
                selectedNode === 'http-node'
                  ? 'border-purple-500 shadow-purple-500/30 ring-2 ring-purple-500/50'
                  : 'border-slate-600/50 shadow-slate-900/50 group-hover:border-purple-500/50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-purple-400">HTTP Request</div>
                    <div className="text-slate-400 text-xs mt-1">GET API data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* IF/ELSE Condition Node */}
          <div
            className="absolute cursor-pointer group"
            style={{ left: '800px', top: '280px' }}
            onClick={() => onNodeSelect('condition-node')}
          >
            <div className="relative">
              <div className={`w-28 h-28 bg-slate-800/80 backdrop-blur-xl border rounded-xl p-4 shadow-xl transition-all group-hover:scale-105 ${
                selectedNode === 'condition-node'
                  ? 'border-yellow-500 shadow-yellow-500/30 ring-2 ring-yellow-500/50'
                  : 'border-slate-600/50 shadow-slate-900/50 group-hover:border-yellow-500/50'
              }`} style={{ transform: 'rotate(45deg)' }}>
                <div className="flex items-center justify-center h-full" style={{ transform: 'rotate(-45deg)' }}>
                  <div className="text-center">
                    <GitBranch className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-yellow-400 text-xs">IF/ELSE</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-green-400">
                True ↓
              </div>
            </div>
          </div>

          {/* Slack Message Output Node */}
          <div
            className="absolute cursor-pointer group"
            style={{ left: '820px', top: '420px' }}
            onClick={() => onNodeSelect('slack-node')}
          >
            <div className="relative">
              <div className={`w-40 h-24 bg-slate-800/80 backdrop-blur-xl border rounded-2xl p-4 shadow-xl transition-all group-hover:scale-105 ${
                selectedNode === 'slack-node'
                  ? 'border-[#2DD4BF] shadow-[#2DD4BF]/30 ring-2 ring-[#2DD4BF]/50'
                  : 'border-slate-600/50 shadow-slate-900/50 group-hover:border-[#2DD4BF]/50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#2DD4BF]">Slack Message</div>
                    <div className="text-slate-400 text-xs mt-1">Send to #alerts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
