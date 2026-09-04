import React, { useState } from 'react';
import {
  Building2,
  AlertCircle,
  Copy,
  Check,
  Database,
  Zap,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

export const ExchangeIdentification: React.FC = () => {
  const { exchangeAttribution, latestAlert } = useLiveInvestigation();
  const [copied, setCopied] = useState(false);
  const data = exchangeAttribution;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.associatedWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-indigo-400 font-semibold tracking-wider uppercase">
            OFF-RAMP RECONNAISSANCE
          </span>
          {latestAlert && (
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <Zap className="w-3 h-3" /> LIVE ATTRIBUTED
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          POTENTIAL DESTINATION
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Identification of Centralized Exchanges (CEX), Virtual Asset Service Providers (VASPs), and off-ramp liquidity pools.
        </p>
      </div>

      {/* Large Information Card */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-6 sm:p-8 shadow-cyber-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy-750">
          <div>
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
              POTENTIAL EXCHANGE / VASP
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400 shadow-cyber-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                {data.exchangeName}
              </h2>
            </div>
          </div>

          <div className="self-start sm:self-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/90 border border-purple-700/60 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider shadow-cyber-glow">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
              <span>{data.depositStatus}</span>
            </span>
          </div>
        </div>

        {/* Associated Wallet, Confidence, Hops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-navy-850 p-4 rounded-xl border border-navy-750">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Associated Wallet
              </span>
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-slate-200 transition-colors"
                title="Copy Full Wallet"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <div className="font-mono text-base font-bold text-purple-400">
              {data.shortWallet}
            </div>
            <div className="font-mono text-[10px] text-slate-400 truncate mt-1">
              {data.associatedWallet}
            </div>
          </div>

          <div className="bg-navy-850 p-4 rounded-xl border border-navy-750">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
              Confidence Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-extrabold text-slate-100">
                {data.confidenceScore}%
              </span>
              <span className="font-mono text-xs text-emerald-400 font-semibold">High Certainty</span>
            </div>
            <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${data.confidenceScore}%` }}
              />
            </div>
          </div>

          <div className="bg-navy-850 p-4 rounded-xl border border-navy-750">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1.5">
              Transaction Hops
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-extrabold text-slate-100">
                {data.transactionHops}
              </span>
              <span className="font-mono text-xs text-slate-400">inter-wallet layers</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              Suspect ➔ Mule Hops ➔ VASP Gateway
            </div>
          </div>
        </div>

        {/* Attribution Basis */}
        <div className="pt-4 border-t border-navy-750">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-3">
            ATTRIBUTION BASIS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.attributionBasis.map((basis, idx) => (
              <div
                key={idx}
                className="bg-navy-850 p-3.5 rounded-lg border border-navy-750 flex items-start gap-2.5"
              >
                <Database className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 font-medium leading-snug">
                  {basis}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legal notice */}
        <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-800/40 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300 block mb-0.5">LEGAL / COMPLIANCE NOTICE:</span>
            "{data.disclaimer}"
            <div className="text-[11px] text-amber-400/80 mt-1 font-mono">
              Formal mutual legal assistance treaty (MLAT) or LEA subpoena required for account holder identity extraction.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
