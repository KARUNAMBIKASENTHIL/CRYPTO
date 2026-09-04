import React from 'react';
import { Sparkles, AlertTriangle, Info, Zap } from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

export const RiskIntelligence: React.FC = () => {
  const { riskScore, riskFactors, currentCase, latestAlert } = useLiveInvestigation();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-purple-400 font-semibold tracking-wider uppercase">
            AI-POWERED THREAT MODEL
          </span>
          {latestAlert && (
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <Zap className="w-3 h-3" /> RECALCULATED LIVE
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          RISK INTELLIGENCE
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Algorithmic multi-factor vulnerability assessment and illicit fund attribution.
        </p>
      </div>

      {/* Prominent Badge & Overall Score Card */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-6 sm:p-8 shadow-cyber-sm">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 font-mono text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>AI-ASSISTED RISK ASSESSMENT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Overall Score */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-navy-750 pb-6 md:pb-0 md:pr-6 text-center md:text-left">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-2">
              OVERALL RISK SCORE
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="font-mono text-5xl sm:text-6xl font-black text-red-400">
                {riskScore}
              </span>
              <span className="font-mono text-xl text-slate-400 font-bold">/ 100</span>
            </div>
            <div className="mt-3 inline-block">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/80 border border-red-800/50 text-red-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                {currentCase.riskLevel} RISK
              </span>
            </div>
          </div>

          {/* Explanation Quote */}
          <div className="md:col-span-2">
            <div className="p-4 rounded-lg bg-navy-850 border border-navy-750">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Methodology Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "The risk score is calculated by analyzing transaction behavior, fund movement speed,
                wallet connectivity, and suspicious activity patterns."
              </p>
              <div className="mt-3 text-[11px] text-slate-400 font-mono">
                Dynamically weighted against active blockchain ledger telemetry and peeling structure.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors Breakdown */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-6 shadow-cyber-sm">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-navy-750">
          <div>
            <h2 className="text-base font-bold text-slate-100">Risk Factor Contributions</h2>
            <p className="text-xs text-slate-400">Live scoring weights calculated from on-chain transactions</p>
          </div>
          <span className="font-mono text-xs text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
            {riskFactors.length} FACTORS
          </span>
        </div>

        <div className="space-y-6">
          {riskFactors.map((factor) => {
            const percentage = (factor.score / factor.maxScore) * 100;

            return (
              <div key={factor.factor} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-semibold text-slate-200">
                      {factor.factor}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 bg-navy-850 px-2 py-0.5 rounded border border-navy-800">
                      {factor.category}
                    </span>
                  </div>

                  <div className="font-mono text-sm font-bold text-red-400">
                    +{factor.score}
                    <span className="text-slate-400 text-xs font-normal ml-1">
                      (max {factor.maxScore})
                    </span>
                  </div>
                </div>

                <div className="w-full bg-navy-850 h-2.5 rounded-full overflow-hidden border border-navy-750">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  {factor.weightDescription}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-navy-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Composite Score Calculation</span>
          <span className="text-slate-200 font-bold">Current Dynamic Rating: {riskScore} Points</span>
        </div>
      </div>
    </div>
  );
};
