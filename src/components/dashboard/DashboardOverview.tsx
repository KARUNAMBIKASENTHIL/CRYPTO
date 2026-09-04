import React, { useMemo } from 'react';
import {
  FolderLock,
  Wallet,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Clock,
  ChevronRight,
  PlusCircle,
  Zap,
  Flame,
  Search,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface DashboardOverviewProps {
  onOpenCase: (caseId: string) => void;
  onNewInvestigation: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onOpenCase,
  onNewInvestigation,
}) => {
  const { cases, liveNetworkStats, recentAlerts, network, connectMetaMask, connectedAccount } = useLiveInvestigation();

  const riskDistribution = useMemo(() => {
    const counts: Record<string, number> = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
    cases.forEach((c) => {
      const level = c.riskLevel?.toUpperCase() || 'LOW';
      if (counts[level] !== undefined) {
        counts[level] += 1;
      } else {
        counts.LOW += 1;
      }
    });

    return [
      { name: 'Critical Risk', count: counts.CRITICAL, fill: '#ef4444' },
      { name: 'High Risk', count: counts.HIGH, fill: '#f97316' },
      { name: 'Medium Risk', count: counts.MEDIUM, fill: '#eab308' },
      { name: 'Low Risk', count: counts.LOW, fill: '#10b981' },
    ];
  }, [cases]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider uppercase">
              CYBER CELL ANALYTICS
            </span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <Zap className="w-3 h-3" /> LIVE NETWORK SYNCED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Investigation Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-chain forensic monitoring and fresh ledger threat intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!connectedAccount && (
            <button
              onClick={connectMetaMask}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 text-xs font-mono font-medium transition-colors"
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Connect MetaMask</span>
            </button>
          )}
          <button
            onClick={onNewInvestigation}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-cyber-sm transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Investigation</span>
          </button>
        </div>
      </div>

      {/* 4 Clean Summary Cards Connected to Live On-Chain Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Cases */}
        <div className="bg-navy-900 border border-navy-750 p-5 rounded-xl shadow-cyber-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-medium">
              ACTIVE CASES
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/40 flex items-center justify-center text-blue-400">
              <FolderLock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-100">
            {cases.length}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="text-emerald-400 font-semibold">{cases.length} active</span> in dossier index
          </div>
        </div>

        {/* 24h Transactions Today */}
        <div className="bg-navy-900 border border-navy-750 p-5 rounded-xl shadow-cyber-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-medium">
              24H TXS TODAY
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-100">
            {liveNetworkStats.transactionsToday}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="text-blue-400 font-semibold">{network}</span> confirmed today
          </div>
        </div>

        {/* Live Token Price */}
        <div className="bg-navy-900 border border-navy-750 p-5 rounded-xl shadow-cyber-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-medium">
              LIVE ETH PRICE
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400">
            {liveNetworkStats.coinPrice}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className={liveNetworkStats.coinPriceChangePercentage >= 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
              {liveNetworkStats.coinPriceChangePercentage >= 0 ? '+' : ''}{liveNetworkStats.coinPriceChangePercentage}%
            </span>{' '}
            24h market move
          </div>
        </div>

        {/* Live Block Height */}
        <div className="bg-navy-900 border border-navy-750 p-5 rounded-xl shadow-cyber-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-medium">
              BLOCK HEIGHT & GAS
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-100 truncate">
            #{liveNetworkStats.totalBlocks}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="text-amber-400 font-semibold">{liveNetworkStats.gasPriceGwei} Gwei</span> avg base fee
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Investigations & Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Recent Investigations */}
        <div className="lg:col-span-2 bg-navy-900 border border-navy-750 rounded-xl p-5 shadow-cyber-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-navy-750">
            <div>
              <h2 className="text-base font-bold text-slate-100">Active Investigations</h2>
              <p className="text-xs text-slate-400">
                Suspect wallet cases under active cyber cell analysis
              </p>
            </div>
            <span className="font-mono text-xs text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
              {cases.length} TRACKED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-navy-800 text-[11px] font-mono text-slate-400 uppercase">
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Suspect Wallet</th>
                  <th className="py-2.5 px-3">Network</th>
                  <th className="py-2.5 px-3">Traced Value</th>
                  <th className="py-2.5 px-3">Risk</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/60 text-xs">
                {cases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 font-mono">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Search className="w-6 h-6 text-slate-500 mb-1" />
                        <p className="text-sm font-semibold text-slate-300">No Active Investigations Yet</p>
                        <p className="text-xs text-slate-500 max-w-sm">
                          Start 100% fresh: connect your MetaMask wallet or click below to enter any live blockchain address.
                        </p>
                        <button
                          onClick={onNewInvestigation}
                          className="mt-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-sans font-medium transition-colors"
                        >
                          + Launch New Investigation
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  cases.map((item) => (
                    <tr
                      key={item.caseId}
                      onClick={() => onOpenCase(item.caseId)}
                      className="hover:bg-navy-850/80 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-blue-400">
                        {item.caseId}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-300">
                        {item.suspectShortWallet || `${item.suspectWallet.slice(0, 8)}...${item.suspectWallet.slice(-4)}`}
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                          {item.network}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-200 font-medium">
                        {item.totalValueTraced}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            item.riskLevel === 'CRITICAL' || item.riskLevel === 'HIGH'
                              ? 'bg-red-950/80 text-red-400 border border-red-800/40'
                              : 'bg-amber-950/80 text-amber-400 border border-amber-800/40'
                          }`}
                        >
                          {item.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center text-xs text-blue-400 group-hover:text-blue-300 font-medium gap-0.5">
                          Inspect <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Risk Distribution */}
        <div className="bg-navy-900 border border-navy-750 rounded-xl p-5 shadow-cyber-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-navy-750">
              <div>
                <h2 className="text-base font-bold text-slate-100">Risk Distribution</h2>
                <p className="text-xs text-slate-400">Flagged wallet threat severity</p>
              </div>
              <span className="font-mono text-[10px] text-slate-400 bg-navy-800 px-2 py-0.5 rounded">
                {cases.length} DOSSIERS
              </span>
            </div>

            {cases.length === 0 ? (
              <div className="h-56 flex flex-col items-center justify-center text-center p-4">
                <ShieldCheck className="w-10 h-10 text-emerald-400/80 mb-2" />
                <p className="text-xs font-mono font-bold text-slate-200">No Flagged Wallets</p>
                <p className="text-[11px] text-slate-400 mt-1">Platform is fresh. Enter or connect a wallet to analyze risk heuristics.</p>
              </div>
            ) : (
              <>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="count"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="#0d1322" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0d1322',
                          borderColor: '#1c2b4a',
                          borderRadius: '8px',
                          color: '#f8fafc',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend Breakdown */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-navy-800">
                  {riskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs p-1.5 rounded bg-navy-850">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-slate-300 text-[11px] truncate max-w-[80px]">{item.name}</span>
                      </div>
                      <span className="font-mono text-slate-200 font-bold text-xs">{item.count}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Live Suspicious Alerts Stream */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-5 shadow-cyber-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-navy-750">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-slate-100">Live Blockchain Activity & Alerts</h2>
          </div>
          <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Real-time heuristic monitor
          </span>
        </div>

        {recentAlerts.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-slate-400 bg-navy-850/50 rounded-lg border border-navy-750">
            Scanning blocks for suspicious on-chain transfers...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="bg-navy-850 p-4 rounded-lg border border-navy-750 hover:border-navy-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 uppercase font-semibold">
                    {alert.type || 'LIVE ON-CHAIN EVENT'}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{alert.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {alert.description || `Transfer of ${alert.amount} detected on block #${alert.blockNumber || liveNetworkStats.totalBlocks}`}
                </p>
                <div className="font-mono text-[11px] text-blue-400 bg-navy-900 p-1.5 rounded border border-navy-750 truncate">
                  Tx: {alert.txHash}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
