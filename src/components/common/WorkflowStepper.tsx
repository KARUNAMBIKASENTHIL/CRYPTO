import React from 'react';
import {
  Search,
  Activity,
  GitFork,
  Shuffle,
  AlertTriangle,
  ShieldAlert,
  Building2,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';

interface WorkflowStepperProps {
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
}

export const WORKFLOW_STEPS = [
  { id: 1, label: 'Enter Suspect Wallet', page: 'new-investigation', icon: Search },
  { id: 2, label: 'Analyze Transactions', page: 'wallet-analysis', icon: Activity },
  { id: 3, label: 'Trace Fund Movement', page: 'transaction-graph', icon: GitFork },
  { id: 4, label: 'Detect Intermediaries', page: 'intermediaries', icon: Shuffle },
  { id: 5, label: 'Analyze Patterns', page: 'patterns', icon: AlertTriangle },
  { id: 6, label: 'Calculate Risk Score', page: 'risk-analysis', icon: ShieldAlert },
  { id: 7, label: 'Identify Exchange/VASP', page: 'exchange', icon: Building2 },
  { id: 8, label: 'Generate Report', page: 'reports', icon: FileCheck2 },
];

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStep, onSelectStep }) => {
  return (
    <div className="bg-navy-900 border-b border-navy-750 px-4 py-2.5 overflow-x-auto no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[860px]">
        <div className="flex items-center gap-2 mr-4 flex-shrink-0">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Investigation Workflow
          </span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-1 justify-between">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => onSelectStep(step.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs transition-all flex-shrink-0 group ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-medium'
                      : isCompleted
                      ? 'text-slate-300 hover:bg-navy-800 hover:text-slate-100'
                      : 'text-slate-400 hover:bg-navy-800/60 hover:text-slate-300'
                  }`}
                  title={`Step ${step.id}: ${step.label}`}
                >
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-blue-500 text-white font-bold'
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                        : 'bg-navy-800 text-slate-400 border border-navy-700'
                    }`}
                  >
                    0{step.id}
                  </span>
                  <span className="hidden xl:inline text-xs font-medium truncate max-w-[110px]">
                    {step.label}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 hidden md:inline" />
                  )}
                </button>

                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div
                    className={`h-[1px] flex-1 min-w-[10px] max-w-[20px] transition-colors ${
                      isCompleted ? 'bg-emerald-600/40' : 'bg-navy-750'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
