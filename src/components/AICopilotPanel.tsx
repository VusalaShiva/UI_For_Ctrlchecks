import { Send, Mic, Sparkles, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  workflow?: {
    nodes: string[];
  };
  actions?: string[];
}

export function AICopilotPanel() {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'What do you want to automate today?',
    },
    {
      id: '2',
      type: 'user',
      content: 'Create a workflow that reads my Google Sheet, analyzes sentiment, and alerts me if negative.',
    },
    {
      id: '3',
      type: 'assistant',
      content: 'Great! I\'m generating a workflow with 4 nodes for you...',
      workflow: {
        nodes: ['Google Sheets', 'OpenAI Sentiment', 'IF Condition', 'Slack Alert']
      },
      actions: ['Apply Workflow', 'Edit Nodes', 'Run Now']
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="w-96 bg-slate-900/40 backdrop-blur-xl border-l border-slate-700/50 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#818CF8] rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h3 className="text-white">AI Copilot</h3>
            <p className="text-slate-400 text-xs">Workflow Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Message bubble */}
              <div
                className={`rounded-2xl p-4 ${
                  message.type === 'assistant'
                    ? 'bg-slate-800/50 border border-[#2DD4BF]/30 shadow-lg shadow-[#2DD4BF]/10'
                    : 'bg-slate-700/50 border border-slate-600/30'
                }`}
              >
                <p className="text-white text-sm leading-relaxed">{message.content}</p>
                
                {/* Workflow preview */}
                {message.workflow && (
                  <div className="mt-4 p-3 bg-slate-950/50 rounded-xl border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-2">Generated Workflow</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {message.workflow.nodes.map((node, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <div className="px-3 py-1.5 bg-[#2DD4BF]/20 text-[#2DD4BF] text-xs rounded-lg border border-[#2DD4BF]/30">
                            {node}
                          </div>
                          {idx < message.workflow.nodes.length - 1 && (
                            <div className="text-slate-600">→</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                {message.actions && (
                  <div className="mt-4 flex gap-2">
                    {message.actions.map((action, idx) => (
                      <button
                        key={idx}
                        className={`px-4 py-2 rounded-lg text-xs transition-all ${
                          idx === 0
                            ? 'bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 hover:shadow-lg hover:shadow-teal-500/30'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <div className={`text-xs text-slate-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                Just now
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="bg-slate-800/50 border border-[#2DD4BF]/30 rounded-2xl p-4 shadow-lg shadow-[#2DD4BF]/10">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#2DD4BF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#2DD4BF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-[#2DD4BF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-slate-700/50">
        {/* Quick suggestions */}
        <div className="mb-3 flex flex-wrap gap-2">
          {['Add delay node', 'Fetch API', 'Connect to Slack'].map((suggestion) => (
            <button
              key={suggestion}
              className="px-3 py-1.5 bg-slate-800/50 text-slate-400 text-xs rounded-lg border border-slate-700/50 hover:border-[#2DD4BF]/50 hover:text-[#2DD4BF] transition-all"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe what you want to automate..."
            className="w-full bg-slate-800/50 text-white pl-4 pr-20 py-3 rounded-xl border border-slate-700/50 focus:border-[#2DD4BF] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/20 transition-all resize-none"
            rows={2}
          />
          
          {/* Action buttons */}
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-lg transition-all ${
                isListening
                  ? 'bg-red-500/20 text-red-400 animate-pulse'
                  : 'text-slate-400 hover:text-[#2DD4BF] hover:bg-slate-700/50'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
