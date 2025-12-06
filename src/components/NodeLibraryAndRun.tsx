import { useState } from 'react';
import { Search, Zap, Brain, Database, Code, MessageSquare, Globe, GitBranch, FileCode, Play, Sparkles, CheckCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function NodeLibraryAndRun() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showRunModal, setShowRunModal] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [workflowComplete, setWorkflowComplete] = useState(false);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI Models' },
    { id: 'api', label: 'API & Data' },
    { id: 'logic', label: 'Logic' },
  ];

  const nodes = [
    { id: 1, name: 'OpenAI', description: 'Chat Completion', icon: Zap, color: 'from-[#2DD4BF] to-[#818CF8]', category: 'ai' },
    { id: 2, name: 'Anthropic', description: 'Claude 3 Opus', icon: Brain, color: 'from-orange-500 to-red-500', category: 'ai' },
    { id: 3, name: 'Postgres', description: 'Database Query', icon: Database, color: 'from-blue-500 to-blue-700', category: 'api' },
    { id: 4, name: 'JavaScript', description: 'Custom Function', icon: Code, color: 'from-yellow-500 to-yellow-600', category: 'logic' },
    { id: 5, name: 'Pinecone', description: 'Vector Search', icon: Sparkles, color: 'from-purple-500 to-pink-500', category: 'ai' },
    { id: 6, name: 'HTTP Request', description: 'REST API Call', icon: Globe, color: 'from-purple-600 to-purple-800', category: 'api' },
    { id: 7, name: 'Slack', description: 'Send Message', icon: MessageSquare, color: 'from-[#2DD4BF] to-green-500', category: 'api' },
    { id: 8, name: 'Condition', description: 'IF/ELSE Branch', icon: GitBranch, color: 'from-yellow-500 to-orange-500', category: 'logic' },
  ];

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || node.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const streamingText = [
    '> Initializing AI agent...',
    '> Searching knowledge base...',
    '> Found relevant context.'
  ];

  return (
    <div className="fixed inset-0 flex bg-[#0F172A]">
      {/* Sidebar */}
      <Sidebar activeItem="nodes" />

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Dot grid background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Node Library Drawer (Left) */}
        <div className="absolute left-0 top-0 bottom-0 w-96 bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50 z-20 flex flex-col">
          {/* Search bar */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search nodes (e.g., GPT, Pinecone)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-700/50 focus:border-[#2DD4BF] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 py-4 border-b border-slate-700/50 flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2DD4BF] text-slate-900'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Node grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              {filteredNodes.map(node => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.id}
                    className="group bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700/50 hover:border-[#2DD4BF]/50 hover:bg-slate-800/80 transition-all cursor-pointer"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${node.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white text-sm mb-1">{node.name}</div>
                    <div className="text-slate-400 text-xs">{node.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Run Workflow Modal (Center) */}
        {showRunModal && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-slate-950/50 backdrop-blur-sm">
            <div className="w-[600px] bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-700/50">
                <h2 className="text-white text-2xl">Execute Workflow</h2>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Test Input */}
                <div>
                  <label className="text-slate-400 text-sm mb-3 block">
                    Test Input Data (JSON)
                  </label>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50">
                    <pre className="text-sm text-slate-300 overflow-x-auto">
{`{
  "user_query": "What are the latest trends?",
  "context": "technology",
  "max_results": 5
}`}
                    </pre>
                  </div>
                </div>

                {/* Run button */}
                <button
                  onClick={() => setIsStreaming(true)}
                  disabled={isStreaming}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Run Workflow</span>
                </button>

                {/* Streaming Output */}
                <div>
                  <label className="text-slate-400 text-sm mb-3 block">
                    Streaming Output
                  </label>
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-700/50 min-h-[120px]">
                    {isStreaming && (
                      <div className="space-y-2">
                        {streamingText.map((text, index) => (
                          <div
                            key={index}
                            className="text-[#2DD4BF] text-sm font-mono animate-pulse"
                            style={{
                              animationDelay: `${index * 0.5}s`,
                              animationDuration: '1s'
                            }}
                          >
                            {text}
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono mt-4">
                          <div className="w-2 h-2 bg-[#2DD4BF] rounded-full animate-pulse" />
                          <span>Processing...</span>
                        </div>
                      </div>
                    )}
                    {!isStreaming && (
                      <div className="text-slate-500 text-sm">
                        Output will appear here when you run the workflow...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-slate-800/30 border-t border-slate-700/50 flex justify-end gap-3">
                <button
                  onClick={() => setShowRunModal(false)}
                  className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-600">
                  View Full Logs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Show modal button if closed */}
        {!showRunModal && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => setShowRunModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl hover:shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              Open Run Modal
            </button>
          </div>
        )}

        {/* AI Copilot Response Panel (Right) */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-slate-900/80 backdrop-blur-xl border-l border-slate-700/50 z-20 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#818CF8] rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Sparkles className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-white">AI Copilot</h3>
                <p className="text-slate-400 text-xs">Workflow Response</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Success message */}
            <div className="bg-slate-800/50 border border-[#2DD4BF]/30 rounded-2xl p-4 shadow-lg shadow-[#2DD4BF]/10">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed">
                    Workflow executed successfully!
                  </p>
                </div>
              </div>
              
              {/* Execution stats */}
              <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-700/30">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-[#2DD4BF]">2.4s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nodes executed:</span>
                    <span className="text-[#2DD4BF]">4/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tokens used:</span>
                    <span className="text-[#2DD4BF]">520</span>
                  </div>
                </div>
              </div>

              {/* Streaming effect */}
              <div className="mt-4 space-y-2">
                {['> Workflow completed', '> All nodes executed', '> Results ready'].map((text, idx) => (
                  <div
                    key={idx}
                    className="text-[#2DD4BF] text-xs font-mono animate-pulse"
                    style={{
                      animationDelay: `${idx * 0.3}s`,
                      animationDuration: '1.5s'
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-slate-800/50 border border-slate-700/30 rounded-2xl p-4">
              <div className="text-slate-400 text-sm mb-3">Would you like to optimize this workflow?</div>
              
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition-all border border-slate-600/50 text-sm text-left">
                  Add error handling
                </button>
                <button className="w-full px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition-all border border-slate-600/50 text-sm text-left">
                  Cache API responses
                </button>
                <button className="w-full px-4 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition-all border border-slate-600/50 text-sm text-left">
                  Add retry logic
                </button>
              </div>
            </div>

            {/* Performance insights */}
            <div className="bg-slate-800/50 border border-indigo-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-400 text-sm">Performance Insights</span>
              </div>
              
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>OpenAI node took 1.8s (73% of total time)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>Consider batching HTTP requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>Cache hit rate: 0% (first run)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-4 border-t border-slate-700/50">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              <span>Run Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}