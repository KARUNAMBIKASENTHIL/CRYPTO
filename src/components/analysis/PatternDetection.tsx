import React from 'react';
import { AlertTriangle, Zap } from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

export const PatternDetection: React.FC = () => {
  const { patterns, latestAlert } = useLiveInvestigation();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-red-400 font-semibold tracking-wider uppercase">
            HEURISTIC ENGINE
          </span>
          {latestAlert && (
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <Zap className="w-3 h-3" /> REAL-TIME ANALYZED
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          DETECTED SUSPICIOUS PATTERNS
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Machine-learned behavioral rules and on-chain anomaly signatures evaluated from active ledger data.
        </p>
      </div>

      {/* 4 Clean Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {patterns.map((pattern) => {
          const isHigh = pattern.severity === 'HIGH';

          return (
            <div
              key={pattern.id}
              className={`bg-navy-900 border ${
                isHigh ? 'border-red-500/40 hover:border-red-500/70' : 'border-amber-500/40 hover:border-amber-500/70'
              } rounded-xl p-6 shadow-cyber-sm transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg ${
                        isHigh
                          ? 'bg-red-950/80 text-red-400 border border-red-800/40'
                          : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                      } flex items-center justify-center flex-shrink-0`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h2 className="font-sans font-bold text-base text-slate-100 tracking-tight">
                      ⚠ {pattern.name}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {pattern.description}
                </p>

                <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 text-xs font-mono text-slate-400 mb-4">
                  <span className="text-slate-400 uppercase text-[10px] block mb-0.5">Evidence:</span>
                  <span className="text-slate-200">{pattern.evidence}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-navy-800 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Severity
                  </span>
                  <span
                    className={`inline-block font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase ${
                      isHigh
                        ? 'bg-red-950 text-red-400 border border-red-800/50'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                    }`}
                  >
                    {pattern.severity}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      Confidence
                    </span>
                    <span className="font-mono text-xs font-bold text-blue-400">
                      {pattern.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isHigh ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${pattern.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
