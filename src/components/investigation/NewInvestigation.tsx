import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  Sparkles,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { BlockchainNetwork, InvestigationCase } from '../../types/crypto';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface NewInvestigationProps {
  onStartAnalysis: (caseId: string, suspectWallet: string, network: BlockchainNetwork) => void;
}

export const NewInvestigation: React.FC<NewInvestigationProps> = ({ onStartAnalysis }) => {
  const { setMonitoredAddress, addCase, liveNetworkStats, connectedAccount } = useLiveInvestigation();
  const [caseId, setCaseId] = useState(() => `CASE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [suspectWallet, setSuspectWallet] = useState('');
  const [network, setNetwork] = useState<BlockchainNetwork>('Ethereum');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [validationError, setValidationError] = useState('');

  const analysisSteps = [
    `Connecting to live ${network} RPC node...`,
    'Querying live on-chain balance & nonce counter...',
    'Fetching confirmed transaction ledger from Blockscout API...',
    'Running real-time counterparty graph traversal & clustering...',
    'Evaluating dynamic risk heuristics (Velocity, Peeling, Volumes)...',
    'Registering dossier in active surveillance radar...',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAddr = suspectWallet.trim();
    if (!cleanAddr) {
      setValidationError('Please provide a valid cryptocurrency wallet address.');
      return;
    }

    if (!cleanAddr.startsWith('0x') || cleanAddr.length < 26) {
      setValidationError('Please enter a valid 0x EVM hexadecimal address.');
      return;
    }

    setValidationError('');
    setIsAnalyzing(true);
    setCurrentStepIndex(0);

    // Register a fresh case record in persistent storage
    const newCaseRecord: InvestigationCase = {
      caseId: caseId.trim() || `CASE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: `Live Audit: ${cleanAddr.slice(0, 8)}...${cleanAddr.slice(-4)}`,
      suspectWallet: cleanAddr,
      suspectShortWallet: `${cleanAddr.slice(0, 8)}...${cleanAddr.slice(-4)}`,
      victimWallet: 'Detecting live ledger counterparties...',
      network,
      riskLevel: 'HIGH',
      riskScore: 85,
      status: 'Under Investigation',
      leadInvestigator: 'Inspector Rajesh K. (Cyber Forensic Cell)',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUpdated: 'Just now (Live On-Chain Radar)',
      totalTransactions: 0,
      connectedWallets: 0,
      intermediaryCount: 0,
      totalValueTraced: '0.00 ETH',
      totalValueUsd: '$0',
      possibleDestination: 'Identifying...',
      notes: `Active investigation initialized via live blockchain scan on ${network}.`,
    };

    addCase(newCaseRecord);

    // Trigger live background fetch for the entered address
    setMonitoredAddress(cleanAddr, network, newCaseRecord);

    // Progress step animation
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            onStartAnalysis(caseId, cleanAddr, network);
          }, 300);
          return prev;
        }
      });
    }, 280);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider uppercase">
            FORENSIC INITIATION
          </span>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
            <Zap className="w-3 h-3" /> LIVE ON-CHAIN RADAR
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          NEW INVESTIGATION
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Initiate 100% fresh blockchain analysis and real-time transaction detection using any target wallet address.
        </p>
      </div>

      {/* Main Initiation Card */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-6 sm:p-8 shadow-cyber-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case ID */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Case ID / Docket Number
            </label>
            <input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="e.g. CASE-2026-003"
              className="w-full bg-navy-850 border border-navy-700 text-slate-100 px-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          {/* Suspect Wallet Address */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Target / Suspect Wallet Address
              </label>
              <span className="text-[11px] font-mono text-emerald-400">
                Connected to {network} RPC
              </span>
            </div>
            <input
              type="text"
              value={suspectWallet}
              onChange={(e) => {
                setSuspectWallet(e.target.value);
                setValidationError('');
              }}
              placeholder="0x... Enter any live EVM wallet address to trace fresh transactions"
              className={`w-full bg-navy-850 border ${
                validationError ? 'border-red-500' : 'border-navy-700'
              } text-slate-100 px-4 py-3 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />

            {/* Quick Live Address Presets */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[10px] uppercase">Quick Select:</span>
              {connectedAccount && (
                <button
                  type="button"
                  onClick={() => {
                    setSuspectWallet(connectedAccount);
                    setValidationError('');
                  }}
                  className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 hover:bg-emerald-900 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  My Wallet ({connectedAccount.slice(0, 6)}...{connectedAccount.slice(-4)})
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setSuspectWallet('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
                  setValidationError('');
                }}
                className="font-mono text-[11px] px-2.5 py-1 rounded bg-navy-850 border border-navy-750 text-blue-300 hover:bg-navy-800 transition-colors"
              >
                vitalik.eth (0xd8dA...045)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSuspectWallet('0x28C6c06298d514Db089934071355E5743bf21d60');
                  setValidationError('');
                }}
                className="font-mono text-[11px] px-2.5 py-1 rounded bg-navy-850 border border-navy-750 text-purple-300 hover:bg-navy-800 transition-colors"
              >
                Binance Hot Wallet (0x28C6...1d60)
              </button>
            </div>

            {validationError && (
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5 font-sans">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationError}
              </p>
            )}
          </div>

          {/* Blockchain Network Dropdown */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Target Blockchain Network
            </label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value as BlockchainNetwork)}
              className="w-full bg-navy-850 border border-navy-700 text-slate-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="Ethereum">Ethereum Mainnet (Live Blockscout + Cloudflare RPC)</option>
              <option value="Polygon">Polygon PoS Mainnet (Polygon Bor RPC)</option>
              <option value="BNB Chain">BNB Smart Chain (Dataseed RPC)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-navy-750 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-cyber-sm flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Scanning Live On-Chain Ledger...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Query Blockchain & Launch Forensic Trace</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Analysis Progress Overlay */}
        {isAnalyzing && (
          <div className="mt-6 pt-6 border-t border-navy-750">
            <div className="bg-navy-950 p-4 rounded-lg border border-navy-750 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-blue-400 uppercase font-semibold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span>On-Chain Live Indexing</span>
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {Math.round(((currentStepIndex + 1) / analysisSteps.length) * 100)}%
                </span>
              </div>

              <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentStepIndex + 1) / analysisSteps.length) * 100}%`,
                  }}
                />
              </div>

              <div className="font-mono text-xs text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                <span>{analysisSteps[currentStepIndex]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Forensic Pipeline Checklist */}
      <div className="bg-navy-900/60 border border-navy-750 rounded-xl p-5 text-xs text-slate-400 space-y-3">
        <div className="font-mono text-[11px] text-slate-400 uppercase font-semibold">
          Fresh On-Chain Capabilities:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Zero mock data: live transactions queried from public explorer</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Real-time balance, nonce, and gas fees from RPC</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Dynamic counterparty graph generation from confirmed blocks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Real-time risk scoring and peeling chain detection</span>
          </div>
        </div>
      </div>
    </div>
  );
};
