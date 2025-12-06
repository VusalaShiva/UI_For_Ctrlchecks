import { Play, Pause, RotateCcw, ChevronDown, CheckCircle, Info, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ExecutionPanel() {
  const [isExpanded, setIsExpanded] = useState(true);

  const logs = [
    { time: '10:01:05', type: 'success', message: 'Start Node initialized', icon: CheckCircle },
    { time: '10:01:07', type: 'success', message: 'LLM Output received (520 tokens)', icon: CheckCircle },
    { time: '10:01:08', type: 'info', message: 'HTTP Requesting data...', icon: Loader2 },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border-t border-slate-700/50">
      {/* Header */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white">Execution: #RUN-8821</span>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
              Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
            <Pause className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all flex items-center gap-2">
            <Play className="w-4 h-4" />
            <span className="text-sm">Run</span>
          </button>
        </div>
      </div>

      {/* Logs */}
      {isExpanded && (
        <div className="p-6 space-y-2 max-h-64 overflow-y-auto">
          {logs.map((log, index) => {
            const Icon = log.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-colors"
              >
                <span className="text-slate-500 text-xs mt-0.5 font-mono">[{log.time}]</span>
                <Icon
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    log.type === 'success'
                      ? 'text-green-400'
                      : log.type === 'info'
                      ? 'text-blue-400 animate-spin'
                      : 'text-slate-400'
                  }`}
                />
                <span className="text-slate-300 text-sm flex-1">{log.message}</span>
              </div>
            );
          })}

          {/* Active execution indicator */}
          <div className="flex items-start gap-3 p-3 bg-[#2DD4BF]/10 rounded-lg border border-[#2DD4BF]/30">
            <span className="text-slate-500 text-xs mt-0.5 font-mono">[10:01:09]</span>
            <Loader2 className="w-4 h-4 mt-0.5 text-[#2DD4BF] animate-spin flex-shrink-0" />
            <span className="text-[#2DD4BF] text-sm flex-1">Processing condition branch...</span>
          </div>
        </div>
      )}
    </div>
  );
}
