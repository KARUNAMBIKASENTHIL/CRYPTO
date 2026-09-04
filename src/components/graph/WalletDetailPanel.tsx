import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
  Network,
  Clock,
  Tag,
  AlertTriangle,
  Building2,
  FileCheck2,
} from 'lucide-react';
import { WalletNodeDetail } from '../../types/crypto';

interface WalletDetailPanelProps {
  wallet: WalletNodeDetail | null;
  onClose: () => void;
}

export const WalletDetailPanel: React.FC<WalletDetailPanelProps> = ({ wallet, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!wallet) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRiskBadge = () => {
    if (wallet.riskLevel === 'CRITICAL' || wallet.riskLevel === 'HIGH') {
      return 'bg-red-950/90 text-red-400 border-red-800/50';
    }
    if (wallet.riskLevel === 'MEDIUM') {
      return 'bg-amber-950/90 text-amber-400 border-amber-800/50';
    }
    return 'bg-emerald-950/90 text-emerald-400 border-emerald-800/50';
  };

  return (
    <div className="w-80 sm:w-96 bg-navy-900 border-l border-navy-750 h-full flex flex-col shadow-2xl z-30 overflow-y-auto animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-navy-750 flex items-center justify-between sticky top-0 bg-navy-900/95 backdrop-blur-sm z-10">
        <div>
          <span className="font-mono text-[10px] text-blue-400 uppercase tracking-wider font-semibold">
            NODE INSPECTOR
          </span>
          <h2 className="text-base font-bold text-slate-100">WALLET DETAILS</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          aria-label="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1">
        {/* Type & Risk Banner */}
        <div className="bg-navy-850 p-3.5 rounded-xl border border-navy-750 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">
              Wallet Classification
            </span>
            <div className="text-sm font-bold text-slate-100 mt-0.5">
              {wallet.type}
            </div>
          </div>
          <span className={`font-mono text-xs px-2.5 py-1 rounded border uppercase font-bold ${getRiskBadge()}`}>
            {wallet.riskLevel} ({wallet.riskScore}/100)
          </span>
        </div>

        {/* Address in Monospace */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Cryptographic Address
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-750 font-mono text-xs text-slate-200 break-all select-all">
            {wallet.address}
          </div>
        </div>

        {/* Financial Flow Metrics */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Incoming Transactions */}
          <div className="bg-navy-850 p-3 rounded-lg border border-navy-750">
            <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-1">
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Incoming Tx</span>
            </div>
            <div className="font-mono text-lg font-bold text-emerald-400">
              {wallet.incomingCount}
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              Total: {wallet.totalIncoming}
            </div>
          </div>

          {/* Outgoing Transactions */}
          <div className="bg-navy-850 p-3 rounded-lg border border-navy-750">
            <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
              <span>Outgoing Tx</span>
            </div>
            <div className="font-mono text-lg font-bold text-blue-400">
              {wallet.outgoingCount}
            </div>
            <div className="font-mono text-[10px] text-slate-400">
              Total: {wallet.totalOutgoing}
            </div>
          </div>
        </div>

        {/* Connected Wallets & Balance */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-navy-850 p-3 rounded-lg border border-navy-750">
            <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-1">
              <Network className="w-3.5 h-3.5 text-purple-400" />
              <span>Connected Wallets</span>
            </div>
            <div className="font-mono text-lg font-bold text-slate-100">
              {wallet.connectedWalletsCount}
            </div>
            <div className="font-mono text-[10px] text-slate-400">Cluster degree</div>
          </div>

          <div className="bg-navy-850 p-3 rounded-lg border border-navy-750">
            <div className="text-slate-400 text-[11px] mb-1">Current Balance</div>
            <div className="font-mono text-lg font-bold text-slate-100">
              {wallet.balance}
            </div>
            <div className="font-mono text-[10px] text-emerald-400">Unspent funds</div>
          </div>
        </div>

        {/* Timeline: First Seen & Last Activity */}
        <div className="bg-navy-850 p-3 rounded-lg border border-navy-750 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              First Seen:
            </span>
            <span className="font-mono text-slate-200">{wallet.firstSeen}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-400" />
              Last Activity:
            </span>
            <span className="font-mono text-blue-400 font-semibold">{wallet.lastActivity}</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-2">
            Forensic Entity Tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {wallet.tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-navy-950 border border-navy-750 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Forensic Case Notes */}
        {wallet.notes && (
          <div className="bg-navy-950 p-3 rounded-lg border border-navy-750">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              Case Investigator Notes
            </span>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{wallet.notes}"
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-navy-750 bg-navy-950/60 sticky bottom-0">
        <a
          href={`https://etherscan.io/address/${wallet.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>View on Explorer (Mock)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
