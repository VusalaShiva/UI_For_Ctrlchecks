import { X, Code2 } from 'lucide-react';
import { useState } from 'react';

interface PropertiesPanelProps {
  selectedNode: string;
}

export function PropertiesPanel({ selectedNode }: PropertiesPanelProps) {
  const [temperature, setTemperature] = useState(0.7);
  const [showJson, setShowJson] = useState(false);

  return (
    <div className="w-96 bg-slate-900/40 backdrop-blur-xl border-l border-slate-700/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
        <h3 className="text-white">Node Properties</h3>
        <button className="text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Node Type */}
        <div>
          <label className="text-slate-400 text-sm mb-2 block">Node Type</label>
          <div className="text-white bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-700/50">
            OpenAI LLM
          </div>
        </div>

        {/* Model Selection */}
        <div>
          <label className="text-slate-400 text-sm mb-2 block">Model</label>
          <select className="w-full bg-slate-800/50 text-white px-4 py-3 rounded-xl border border-slate-700/50 focus:border-[#2DD4BF] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all">
            <option>gpt-4-turbo</option>
            <option>gpt-4</option>
            <option>gpt-3.5-turbo</option>
          </select>
        </div>

        {/* System Prompt */}
        <div>
          <label className="text-slate-400 text-sm mb-2 block">System Prompt</label>
          <textarea
            className="w-full h-32 bg-slate-800/50 text-white px-4 py-3 rounded-xl border border-slate-700/50 focus:border-[#2DD4BF] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all resize-none"
            placeholder="You are a helpful AI assistant..."
            defaultValue="You are a helpful AI assistant that processes data and provides structured responses. Always be concise and accurate."
          />
        </div>

        {/* Temperature Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-slate-400 text-sm">Temperature</label>
            <span className="text-[#2DD4BF]">{temperature.toFixed(1)}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2DD4BF] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#2DD4BF]/50 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#2DD4BF] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:shadow-[#2DD4BF]/50"
              style={{
                background: `linear-gradient(to right, #2DD4BF 0%, #2DD4BF ${(temperature / 2) * 100}%, #334155 ${(temperature / 2) * 100}%, #334155 100%)`
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500">Precise</span>
            <span className="text-xs text-slate-500">Creative</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div>
          <label className="text-slate-400 text-sm mb-2 block">Max Tokens</label>
          <input
            type="number"
            className="w-full bg-slate-800/50 text-white px-4 py-3 rounded-xl border border-slate-700/50 focus:border-[#2DD4BF] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all"
            defaultValue="2048"
          />
        </div>

        {/* JSON Preview Toggle */}
        <div className="pt-4 border-t border-slate-700/50">
          <button
            onClick={() => setShowJson(!showJson)}
            className="flex items-center gap-2 text-slate-400 hover:text-[#2DD4BF] transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span className="text-sm">
              {showJson ? 'Hide' : 'Show'} JSON Preview
            </span>
          </button>

          {showJson && (
            <div className="mt-4 bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
              <pre className="text-xs text-slate-300 overflow-x-auto">
{`{
  "model": "gpt-4-turbo",
  "temperature": ${temperature},
  "max_tokens": 2048,
  "system_prompt": "You are..."
}`}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-slate-700/50 flex gap-3">
        <button className="flex-1 px-4 py-3 bg-slate-800/50 text-slate-300 rounded-xl border border-slate-700/50 hover:bg-slate-800 hover:text-white transition-all">
          Reset
        </button>
        <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all">
          Save
        </button>
      </div>
    </div>
  );
}
