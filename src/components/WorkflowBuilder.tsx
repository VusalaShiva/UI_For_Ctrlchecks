import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { ExecutionPanel } from './ExecutionPanel';
import { WorkflowCanvas } from './WorkflowCanvas';
import { AICopilotPanel } from './AICopilotPanel';

export function WorkflowBuilder() {
  const [selectedNode, setSelectedNode] = useState('llm-node');
  const [showCopilot, setShowCopilot] = useState(true);

  return (
    <div className="fixed inset-0 flex bg-[#0F172A]">
      {/* Left Sidebar */}
      <Sidebar activeItem="workflows" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Canvas and Right Panel */}
        <div className="flex-1 flex overflow-hidden">
          <WorkflowCanvas onNodeSelect={setSelectedNode} selectedNode={selectedNode} />
          
          {/* Right side - Copilot or Properties */}
          {showCopilot ? (
            <AICopilotPanel />
          ) : (
            <PropertiesPanel selectedNode={selectedNode} />
          )}
        </div>

        {/* Bottom Execution Panel */}
        <ExecutionPanel />
      </div>

      {/* Toggle button for Copilot/Properties */}
      <button
        onClick={() => setShowCopilot(!showCopilot)}
        className="fixed bottom-[22rem] right-[26rem] px-4 py-2 bg-gradient-to-r from-[#2DD4BF] to-[#818CF8] text-slate-900 rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all z-50 text-sm"
      >
        {showCopilot ? 'Show Properties' : 'Show AI Copilot'}
      </button>
    </div>
  );
}