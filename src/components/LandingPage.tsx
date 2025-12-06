import { ArrowRight, BookOpen } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background with abstract network visualization */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        {/* Glowing network nodes in background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="nodeGlow1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nodeGlow2">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Network nodes */}
            <circle cx="15%" cy="20%" r="60" fill="url(#nodeGlow1)" />
            <circle cx="85%" cy="30%" r="80" fill="url(#nodeGlow2)" />
            <circle cx="70%" cy="70%" r="50" fill="url(#nodeGlow1)" />
            <circle cx="30%" cy="80%" r="70" fill="url(#nodeGlow2)" />
            
            {/* Connecting lines */}
            <path
              d="M 15% 20% Q 50% 25%, 85% 30%"
              stroke="#2DD4BF"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 85% 30% Q 77% 50%, 70% 70%"
              stroke="#818CF8"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 70% 70% Q 50% 75%, 30% 80%"
              stroke="#2DD4BF"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto px-12 min-h-screen">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-white text-7xl mb-6 tracking-tight">
            ctrlchecks
          </h1>
          <p className="text-slate-300 text-2xl mb-12 leading-relaxed">
            Build AI workflows visually. Or let the AI build it for you.
          </p>
          
          {/* CTAs */}
          <div className="flex gap-4">
            <button
              onClick={onStart}
              className="group px-8 py-4 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/50 hover:scale-105 flex items-center gap-2"
            >
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl transition-all hover:bg-white/10 hover:shadow-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Documentation</span>
            </button>
          </div>
        </div>

        {/* Right side - Floating preview */}
        <div className="flex-1 flex justify-end">
          <div 
            className="relative"
            style={{
              transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glass container with workflow preview */}
            <div className="w-[600px] h-[400px] bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              {/* Mini workflow visualization */}
              <div className="relative w-full h-full">
                {/* Dot grid background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #475569 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Nodes */}
                <div className="relative z-10">
                  {/* Start node */}
                  <div className="absolute top-12 left-12 w-16 h-16 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                    <div className="w-8 h-8 bg-green-500 rounded-full" />
                  </div>
                  
                  {/* LLM node */}
                  <div className="absolute top-8 left-40 w-32 h-20 bg-slate-800/80 backdrop-blur border border-[#2DD4BF]/50 rounded-xl p-3 shadow-lg shadow-[#2DD4BF]/20">
                    <div className="text-[#2DD4BF] text-xs">OpenAI</div>
                    <div className="text-white text-xs mt-1">GPT-4</div>
                  </div>
                  
                  {/* HTTP node */}
                  <div className="absolute top-32 left-52 w-32 h-20 bg-slate-800/80 backdrop-blur border border-purple-500/50 rounded-xl p-3 shadow-lg shadow-purple-500/20">
                    <div className="text-purple-400 text-xs">HTTP</div>
                    <div className="text-white text-xs mt-1">GET API</div>
                  </div>
                  
                  {/* Condition node */}
                  <div className="absolute top-44 left-96 w-20 h-20 bg-slate-800/80 backdrop-blur border border-yellow-500/50 rounded-lg p-2 shadow-lg shadow-yellow-500/20" style={{ transform: 'rotate(45deg)' }}>
                    <div className="text-yellow-400 text-xs" style={{ transform: 'rotate(-45deg)' }}>IF</div>
                  </div>
                  
                  {/* Connecting lines with glow */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M 80 50 Q 120 50, 160 50"
                      stroke="#2DD4BF"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#glow)"
                    />
                    <path
                      d="M 270 50 Q 300 90, 300 140"
                      stroke="#818CF8"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#glow)"
                    />
                    <path
                      d="M 330 180 Q 360 200, 400 210"
                      stroke="#2DD4BF"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#glow)"
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Glow effect behind glass */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/20 to-[#818CF8]/20 blur-3xl -z-10 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}