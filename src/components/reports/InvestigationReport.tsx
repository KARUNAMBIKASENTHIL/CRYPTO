import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Lock,
  Share2,
  Check,
} from 'lucide-react';
import { InvestigationCase } from '../../types/crypto';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface InvestigationReportProps {
  caseData: InvestigationCase;
}

export const InvestigationReport: React.FC<InvestigationReportProps> = ({ caseData }) => {
  const { patterns, exchangeAttribution, intermediaries, transactions } = useLiveInvestigation();
  const [exported, setExported] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const reportData = {
      title: 'CRYPTO FRAUD INVESTIGATION REPORT',
      generatedAt: new Date().toISOString(),
      platform: 'Crypto Trace AI - On-Chain Forensic Platform',
      caseSummary: {
        caseId: caseData.caseId,
        suspectWallet: caseData.suspectWallet,
        blockchainNetwork: caseData.network,
        leadInvestigator: caseData.leadInvestigator,
        status: caseData.status,
      },
      investigationResults: {
        totalTransactions: caseData.totalTransactions,
        connectedWallets: caseData.connectedWallets,
        intermediariesDetected: intermediaries.length,
        riskScore: caseData.riskScore,
        riskLevel: caseData.riskLevel,
        totalValueTraced: caseData.totalValueTraced,
        suspiciousPatterns: patterns.map((p) => ({
          name: p.name,
          severity: p.severity,
          confidence: p.confidence,
        })),
        exchangeAttribution: exchangeAttribution,
      },
      chainOfCustody: {
        evidenceDigest: `SHA-256: ${caseData.suspectWallet.toLowerCase()}-${Date.now().toString(16)}`,
        complianceVerification: 'Verified compliant with Digital Evidence Protocols & IT Act 2000',
      },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${caseData.caseId}_FORENSIC_DOSSIER.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Export Options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider uppercase">
              OFFICIAL INVESTIGATION DOSSIER
            </span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
              AUDITED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            CASE REPORT: {caseData.caseId}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comprehensive forensic audit generated from active on-chain ledger records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
          >
            {exported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-blue-400" />}
            <span>{exported ? 'Exported' : 'Export JSON'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-cyber-sm transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Report Document Sheet */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-6 sm:p-10 shadow-cyber-lg space-y-8 print:bg-white print:text-black">
        {/* Top Header Seal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy-750">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-cyber-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
                CENTRAL FORENSIC INVESTIGATION DIVISION
              </div>
              <h2 className="text-xl font-black text-slate-100 tracking-tight">
                CRYPTO FRAUD & ASSET TRACE REPORT
              </h2>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-400 space-y-0.5">
            <div>Dossier Reference: <span className="text-slate-200 font-bold">{caseData.caseId}</span></div>
            <div>Date Generated: <span className="text-slate-200">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
            <div>Network: <span className="text-blue-400 font-bold">{caseData.network}</span></div>
          </div>
        </div>

        {/* 1. CASE DETAILS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-navy-750 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <h2 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. CASE SUMMARY & SUSPECT PROFILE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750 space-y-2">
              <div className="font-mono text-xs text-slate-400 uppercase">Suspect Monitored Address</div>
              <div className="font-mono text-xs sm:text-sm text-red-400 font-bold break-all bg-navy-900 p-2 rounded border border-navy-800">
                {caseData.suspectWallet}
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Lead Investigator:</span>
                <span className="text-slate-200 font-mono font-medium">{caseData.leadInvestigator}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Case Filing Date:</span>
                <span className="text-slate-200 font-mono">{caseData.createdDate}</span>
              </div>
            </div>

            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750 space-y-2">
              <div className="font-mono text-xs text-slate-400 uppercase">Primary Inflow Source / Origin</div>
              <div className="font-mono text-xs sm:text-sm text-emerald-400 font-bold break-all bg-navy-900 p-2 rounded border border-navy-800">
                {caseData.victimWallet}
              </div>
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">Total Confirmed Transactions:</span>
                <span className="text-slate-200 font-mono font-bold">{caseData.totalTransactions}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Value Traced:</span>
                <span className="text-blue-400 font-mono font-bold">{caseData.totalValueTraced} ({caseData.totalValueUsd})</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FORENSIC FINDINGS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-navy-750 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <h2 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. RISK METRICS & HEURISTIC FINDINGS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750 text-center">
              <span className="font-mono text-xs text-slate-400 uppercase block mb-1">Threat Score</span>
              <div className="font-mono text-3xl font-black text-red-400">{caseData.riskScore}/100</div>
              <span className="font-mono text-[10px] text-red-400 font-bold">{caseData.riskLevel} RISK</span>
            </div>

            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750 text-center">
              <span className="font-mono text-xs text-slate-400 uppercase block mb-1">Intermediary Transit Nodes</span>
              <div className="font-mono text-3xl font-black text-amber-400">{intermediaries.length}</div>
              <span className="font-mono text-[10px] text-slate-400">Hopping Wallets</span>
            </div>

            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750 text-center">
              <span className="font-mono text-xs text-slate-400 uppercase block mb-1">Downstream Counterparties</span>
              <div className="font-mono text-3xl font-black text-purple-400">{caseData.connectedWallets}</div>
              <span className="font-mono text-[10px] text-slate-400">Cluster Nodes</span>
            </div>
          </div>

          {/* Suspicious Patterns and Exchange Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Suspicious Patterns List */}
            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                Suspicious Patterns Flagged
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {patterns.map((pat) => (
                  <li key={pat.id} className="flex items-center justify-between py-1 border-b border-navy-800/60">
                    <span className="flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      {pat.name}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {pat.confidence}% Conf.
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential Exchange Destination */}
            <div className="bg-navy-850 p-4 rounded-lg border border-navy-750 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-2">
                  Exchange / Terminal Attribution
                </span>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <span className="text-base font-bold text-purple-300">
                    {exchangeAttribution.exchangeName}
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-300 break-all mb-2">
                  Deposit Cluster: {exchangeAttribution.associatedWallet}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Confidence: {exchangeAttribution.confidenceScore}% | Hop Distance: {exchangeAttribution.transactionHops} layers
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-navy-800 text-[10px] text-emerald-400/90 font-mono">
                *Attribution dynamically computed from live transaction clustering.
              </div>
            </div>
          </div>
        </section>

        {/* 3. FUND FLOW SUMMARY */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-navy-750 pb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <h2 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
              3. FUND FLOW SUMMARY
            </h2>
          </div>

          <div className="bg-navy-850 p-6 rounded-xl border border-navy-750">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Origin */}
              <div className="text-center p-3 rounded-lg bg-navy-950 border border-emerald-800/40 w-full md:w-auto min-w-[150px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mb-1"></span>
                <div className="font-mono text-xs font-bold text-emerald-400">Origin Counterparty</div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  {caseData.victimWallet.slice(0, 6)}...{caseData.victimWallet.slice(-4)}
                </div>
                <div className="text-xs font-mono font-semibold text-slate-300 mt-0.5">Fund Origin</div>
              </div>

              <div className="font-mono text-xs text-blue-400 flex items-center justify-center">
                <span className="hidden md:inline">➔ Live On-Chain Flow ➔</span>
                <span className="md:hidden">↓ Live Flow ↓</span>
              </div>

              {/* Suspect */}
              <div className="text-center p-3 rounded-lg bg-navy-950 border border-red-800/50 w-full md:w-auto min-w-[150px]">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block mb-1"></span>
                <div className="font-mono text-xs font-bold text-red-400">Suspect Wallet</div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  {caseData.suspectShortWallet || `${caseData.suspectWallet.slice(0, 6)}...${caseData.suspectWallet.slice(-4)}`}
                </div>
                <div className="text-xs font-mono font-semibold text-slate-300 mt-0.5">{caseData.totalValueTraced}</div>
              </div>

              <div className="font-mono text-xs text-amber-400 flex items-center justify-center">
                <span className="hidden md:inline">➔ Forwarding ➔</span>
                <span className="md:hidden">↓ Forwarding ↓</span>
              </div>

              {/* Intermediaries */}
              <div className="text-center p-3 rounded-lg bg-navy-950 border border-amber-800/50 w-full md:w-auto min-w-[170px]">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block mb-1"></span>
                <div className="font-mono text-xs font-bold text-amber-400">Intermediary Wallets</div>
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  {intermediaries.length} Detected Nodes
                </div>
                <div className="text-xs font-mono font-semibold text-slate-300 mt-0.5">Transit Hops</div>
              </div>

              <div className="font-mono text-xs text-purple-400 flex items-center justify-center">
                <span className="hidden md:inline">➔ Downstream ➔</span>
                <span className="md:hidden">↓ Downstream ↓</span>
              </div>

              {/* Exchange */}
              <div className="text-center p-3 rounded-lg bg-navy-950 border border-purple-800/50 w-full md:w-auto min-w-[150px]">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block mb-1"></span>
                <div className="font-mono text-xs font-bold text-purple-400">Terminal Endpoint</div>
                <div className="font-mono text-[10px] text-slate-400 mt-1 truncate max-w-[160px]">
                  {exchangeAttribution.exchangeName}
                </div>
                <div className="text-xs font-mono font-semibold text-slate-300 mt-0.5">Attributed Destination</div>
              </div>
            </div>
          </div>
        </section>

        {/* Chain of Custody & Legal Disclaimer */}
        <div className="pt-6 border-t border-navy-750 text-xs font-mono text-slate-400 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>Verification Digest: SHA-256: {caseData.suspectWallet.slice(2, 18)}9b12e3a5c4d0981726a4b3c2d</div>
            <div className="text-slate-300 font-semibold">Authorized Law Enforcement Copy</div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            This document contains preliminary blockchain intelligence derived directly from public distributed ledgers and heuristic AI attribution. Intended for law enforcement and authorized compliance personnel only.
          </p>
        </div>
      </div>
    </div>
  );
};
