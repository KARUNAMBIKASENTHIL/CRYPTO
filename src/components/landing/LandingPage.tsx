import React from 'react';
import {
  Wallet,
  Network,
  Shuffle,
  ShieldAlert,
  Building2,
  ArrowRight,
  Shield,
  Search,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  Database,
} from 'lucide-react';
import { BlockchainCanvas } from './BlockchainCanvas';

interface LandingPageProps {
  onStartInvestigation: () => void;
  onViewDemoCase: () => void;
  onSelectCapability: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartInvestigation,
  onViewDemoCase,
  onSelectCapability,
}) => {
  const capabilities = [
    {
      num: '01',
      title: 'Wallet Analysis',
      description: 'Instant multi-chain forensic audit with balance, transaction count, and risk profiling.',
      icon: Wallet,
      page: 'wallet-analysis',
      accent: 'border-blue-500/30 group-hover:border-blue-500',
    },
    {
      num: '02',
      title: 'Fund Flow Tracing',
      description: 'Interactive visual transaction graphs tracing illicit token paths across wallets.',
      icon: Network,
      page: 'transaction-graph',
      accent: 'border-purple-500/30 group-hover:border-purple-500',
    },
    {
      num: '03',
      title: 'Intermediary Detection',
      description: 'Identify rapid forwarding mules, temporary transit nodes, and peeling chains.',
      icon: Shuffle,
      page: 'intermediaries',
      accent: 'border-amber-500/30 group-hover:border-amber-500',
    },
    {
      num: '04',
      title: 'Risk Intelligence',
      description: 'AI-assisted scoring engine aggregating velocity, topology, and fraud heuristics.',
      icon: ShieldAlert,
      page: 'risk-analysis',
      accent: 'border-red-500/30 group-hover:border-red-500',
    },
    {
      num: '05',
      title: 'Exchange/VASP Identification',
      description: 'Correlate transaction terminal nodes with known exchange deposit clusters.',
      icon: Building2,
      page: 'exchange',
      accent: 'border-indigo-500/30 group-hover:border-indigo-500',
    },
  ];

  return (
    <div className="relative min-h-screen bg-navy-950 text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Top Brand Nav */}
      <nav className="relative z-20 border-b border-navy-800/80 bg-navy-950/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-cyber-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-sans font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
                CRYPTO TRACE AI
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-400 border border-blue-700/50 px-2 py-0.5 rounded uppercase font-semibold">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                AI-Powered Crypto Fraud Investigation Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewDemoCase}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-navy-900 hover:bg-navy-800 border border-navy-750 transition-colors"
            >
              Live Dossier <span className="font-mono text-emerald-400 ml-1">#CASE-2026-001</span>
            </button>
            <button
              onClick={onStartInvestigation}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-cyber-sm flex items-center gap-1.5"
            >
              <span>Investigator Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-6 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        {/* Abstract Blockchain Canvas Network Background */}
        <BlockchainCanvas />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Small Monospace Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-blue-500/30 text-blue-400 mb-6 shadow-cyber-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-widest font-semibold">
              BLOCKCHAIN INTELLIGENCE PLATFORM
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight mb-6">
            Trace the Flow.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Uncover the Fraud.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-4">
            AI-powered blockchain analytics for cryptocurrency fraud investigation.
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Analyze suspicious wallet addresses, trace fund movements, identify intermediary wallets,
            detect suspicious transaction patterns, and discover potential exchange connections.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartInvestigation}
              id="btn-start-investigation"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-cyber-md hover:shadow-cyber-lg flex items-center justify-center gap-2.5 group"
            >
              <span>Start Investigation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewDemoCase}
              id="btn-view-demo-case"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-850 text-slate-200 hover:text-white border border-navy-700 hover:border-slate-500 font-medium text-sm transition-all flex items-center justify-center gap-2.5"
            >
              <span>Live On-Chain Dossier</span>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                CASE-2026-001
              </span>
            </button>
          </div>

          {/* Security & Verification Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Multi-Chain Graph Heuristics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Peeling Chain Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>VASP Deposit Attribution</span>
            </div>
          </div>
        </div>

        {/* 5 Capability Cards */}
        <div className="relative z-10 mt-16 pt-12 border-t border-navy-800/80">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
              CORE INVESTIGATIVE CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.num}
                  onClick={() => onSelectCapability(cap.page)}
                  className={`bg-navy-900/80 hover:bg-navy-850 p-5 rounded-xl border ${cap.accent} transition-all cursor-pointer group flex flex-col justify-between shadow-cyber-sm hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center group-hover:bg-navy-750 transition-colors">
                        <Icon className="w-4 h-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-blue-400 transition-colors">
                        {cap.num}
                      </span>
                    </div>

                    <h2 className="font-sans font-bold text-sm text-slate-200 group-hover:text-white mb-2">
                      {cap.title}
                    </h2>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-blue-400">
                    <span>LAUNCH</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-navy-800/80 bg-navy-950 px-6 py-6 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>Smart India Hackathon Prototype | Law Enforcement & Forensic Architecture</span>
          </div>
          <div>
            <span>Version 2.4.0 (AI Node Cluster Sync)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
