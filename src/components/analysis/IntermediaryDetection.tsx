import React, { useState } from 'react';
import {
  Shuffle,
  Clock,
  ArrowRight,
  Copy,
  Check,
  ShieldAlert,
  Info,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface IntermediaryDetectionProps {
  onInspectWallet?: (address: string) => void;
}

export const IntermediaryDetection: React.FC<IntermediaryDetectionProps> = ({ onInspectWallet }) => {
  const { intermediaries, latestAlert } = useLiveInvestigation();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider uppercase">
            MULE & TRANSIT FORENSICS
          </span>
          {latestAlert && (
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <Zap className="w-3 h-3" /> LIVE DETECTED
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          INTERMEDIARY WALLET ANALYSIS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Algorithmic detection of hopping nodes, temporary holding proxies, and fund distribution mules.
        </p>
      </div>

      {/* Explanation Banner */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-4 sm:p-5 shadow-cyber-sm flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 mb-1">
            Forensic Identification Methodology
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            "Intermediary wallets are identified based on transaction flow behavior, timing, connectivity, and fund movement patterns."
          </p>
          <div className="mt-2 text-[11px] text-slate-400 font-mono">
            Analyzed using on-chain transaction sequences and velocity deviation indexing.
          </div>
        </div>
      </div>

      {/* Detected Wallets List - Numbered Rows */}
      <div className="space-y-3">
        {intermediaries.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-navy-900 border border-navy-750 hover:border-amber-500/40 rounded-xl p-5 shadow-cyber-sm transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left Column: Number and Address */}
              <div className="flex items-start gap-4">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 bg-navy-850 px-3 py-2 rounded-lg border border-navy-750 flex-shrink-0">
                  {wallet.rank}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-slate-100 tracking-wider">
                      {wallet.shortAddress}
                    </span>
                    <button
                      onClick={() => handleCopy(wallet.id, wallet.address)}
                      className="text-slate-400 hover:text-slate-200 transition-colors"
                      title="Copy full address"
                    >
                      {copiedId === wallet.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 mt-1 truncate max-w-md">
                    {wallet.address}
                  </div>
                </div>
              </div>

              {/* Middle & Right: Reason & Risk */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-navy-800">
                <div className="min-w-[180px]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">
                    Reason
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {wallet.reason}
                  </span>
                </div>

                <div className="min-w-[90px]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">
                    Risk
                  </span>
                  <span
                    className={`inline-block font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase ${
                      wallet.risk === 'High'
                        ? 'bg-red-950/80 text-red-400 border border-red-800/40'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {wallet.risk}
                  </span>
                </div>

                <div className="hidden lg:block min-w-[130px] font-mono text-[11px] text-slate-400">
                  <div>Hold: {wallet.holdDuration}</div>
                  <div>Hop: Level {wallet.hopLevel}</div>
                </div>

                {onInspectWallet && (
                  <button
                    onClick={() => onInspectWallet(wallet.address)}
                    className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 transition-colors ml-auto md:ml-0"
                    title="Inspect in Graph"
                  >
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
