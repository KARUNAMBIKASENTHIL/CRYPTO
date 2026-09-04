import React, { useState } from 'react';
import {
  Wallet,
  Network,
  GitFork,
  FileSpreadsheet,
  ShieldAlert,
  Shuffle,
  Copy,
  Check,
  ExternalLink,
  Search,
  Zap,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';
import { TransactionGraph } from '../graph/TransactionGraph';
import { TransactionHistory } from '../transactions/TransactionHistory';
import { RiskIntelligence } from './RiskIntelligence';
import { PatternDetection } from './PatternDetection';
import { IntermediaryDetection } from './IntermediaryDetection';
import { ExchangeIdentification } from './ExchangeIdentification';

export const WalletAnalysis: React.FC = () => {
  const {
    suspectAddress,
    network,
    walletBalance,
    txCount,
    transactions,
    riskScore,
    currentCase,
    latestAlert,
    setMonitoredAddress,
    connectedAccount,
    connectMetaMask,
  } = useLiveInvestigation();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'graph' | 'transactions' | 'risk' | 'intermediaries'>('graph');
  const [manualInput, setManualInput] = useState('');

  const handleCopy = () => {
    if (!suspectAddress) return;
    navigator.clipboard.writeText(suspectAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setMonitoredAddress(manualInput.trim(), network);
      setManualInput('');
    }
  };

  // If no wallet is currently selected or entered
  if (!suspectAddress) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-6">
        <div className="bg-navy-900 border border-navy-750 rounded-2xl p-8 text-center space-y-6 shadow-cyber-md">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Investigate Any Blockchain Wallet
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Enter any Ethereum or EVM wallet address to trace fund flows, inspect transactions, and evaluate risk.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Paste EVM Address (0x...)"
                className="w-full bg-navy-850 border border-navy-700 text-slate-100 px-4 py-3 rounded-xl font-mono text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-cyber-sm"
              >
                Inspect Address
              </button>
              <button
                type="button"
                onClick={connectMetaMask}
                className="px-4 py-2.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-mono font-medium transition-colors flex items-center gap-2"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span>{connectedAccount ? 'Use My Connected Wallet' : 'Connect MetaMask'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Sleek Monitored Wallet Header Card */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-5 shadow-cyber-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
                INVESTIGATED LEDGER TARGET
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {latestAlert && (
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Live Tx Event
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-sm sm:text-base font-bold text-slate-100 break-all">
                {suspectAddress}
              </span>
              <button
                onClick={handleCopy}
                className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={`https://eth.blockscout.com/address/${suspectAddress}`}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded text-slate-400 hover:text-blue-400 transition-colors"
                title="View on Blockscout Explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-3 font-mono">
            <div className="bg-navy-850 px-3.5 py-2 rounded-lg border border-navy-750 text-right">
              <span className="text-[10px] text-slate-400 uppercase block">On-Chain Balance</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400">{walletBalance}</span>
            </div>

            <div className="bg-navy-850 px-3.5 py-2 rounded-lg border border-navy-750 text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Confirmed Txs</span>
              <span className="text-xs sm:text-sm font-bold text-slate-200">{transactions.length || txCount}</span>
            </div>

            <div className="bg-navy-850 px-3.5 py-2 rounded-lg border border-navy-750 text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Risk Score</span>
              <span
                className={`text-xs sm:text-sm font-bold ${
                  riskScore >= 75 ? 'text-red-400' : riskScore >= 40 ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {riskScore}/100 ({currentCase.riskLevel})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Neat Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-navy-750 pb-2">
        <button
          onClick={() => setActiveTab('graph')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-colors ${
            activeTab === 'graph'
              ? 'bg-blue-600 text-white shadow-cyber-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
          }`}
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>Interactive Flow Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-colors ${
            activeTab === 'transactions'
              ? 'bg-blue-600 text-white shadow-cyber-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Ledger History ({transactions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-colors ${
            activeTab === 'risk'
              ? 'bg-blue-600 text-white shadow-cyber-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Risk & Patterns</span>
        </button>

        <button
          onClick={() => setActiveTab('intermediaries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-colors ${
            activeTab === 'intermediaries'
              ? 'bg-blue-600 text-white shadow-cyber-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Intermediaries & VASP</span>
        </button>
      </div>

      {/* 3. Tab Content View */}
      <div>
        {activeTab === 'graph' && <TransactionGraph />}

        {activeTab === 'transactions' && <TransactionHistory />}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            <RiskIntelligence />
            <PatternDetection />
          </div>
        )}

        {activeTab === 'intermediaries' && (
          <div className="space-y-6">
            <IntermediaryDetection />
            <ExchangeIdentification />
          </div>
        )}
      </div>
    </div>
  );
};
