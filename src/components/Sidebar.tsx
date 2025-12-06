import { Workflow, FileText, Box, Database, Settings, CheckCircle } from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'workflows' }: SidebarProps) {
  const menuItems = [
    { id: 'workflows', icon: Workflow, label: 'Workflows' },
    { id: 'templates', icon: FileText, label: 'Templates' },
    { id: 'nodes', icon: Box, label: 'Nodes Library' },
    { id: 'memory', icon: Database, label: 'Memory' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 bg-slate-900/40 backdrop-blur-xl border-r border-slate-700/50 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-12 relative group cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-[#2DD4BF] to-[#818CF8] rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow">
          <CheckCircle className="w-7 h-7 text-slate-900" strokeWidth={2.5} />
        </div>
      </div>

      {/* Menu items */}
      <nav className="flex-1 flex flex-col gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-2 cursor-pointer group transition-all ${
                isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#2DD4BF]/20 text-[#2DD4BF] shadow-lg shadow-[#2DD4BF]/20'
                    : 'text-slate-400 group-hover:bg-slate-800/50 group-hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs ${isActive ? 'text-[#2DD4BF]' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
