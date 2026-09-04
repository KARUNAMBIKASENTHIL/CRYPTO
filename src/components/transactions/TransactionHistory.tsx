import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

export const TransactionHistory: React.FC = () => {
  const { transactions, latestAlert } = useLiveInvestigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRisk = riskFilter === 'All' || tx.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [transactions, searchTerm, riskFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider uppercase">
            LEDGER AUDIT TRAIL
          </span>
          {latestAlert && (
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
              <Zap className="w-3 h-3" /> LIVE TRANSACTION SYNCED
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
          TRANSACTION HISTORY
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Cryptographically signed ledger entries associated with flagged investigation addresses.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-4 shadow-cyber-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by hash, sender, recipient, or amount..."
            className="w-full bg-navy-850 border border-navy-700 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 font-mono placeholder:font-sans placeholder:text-slate-400"
          />
        </div>

        {/* Filter by Risk */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-navy-850 border border-navy-700 rounded-lg p-1 text-xs">
            {(['All', 'High', 'Medium', 'Low'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                className={`px-3 py-1 rounded font-mono text-[11px] transition-colors ${
                  riskFilter === r
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Toggle time order"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{sortOrder.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl shadow-cyber-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-750 bg-navy-850/60 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Transaction Hash</th>
                <th className="py-3 px-4">From</th>
                <th className="py-3 px-4">To</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80 text-xs font-sans">
              {paginatedTransactions.map((tx) => (
                <tr key={tx.hash} className="hover:bg-navy-850/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-blue-400 font-bold" title={tx.hash}>
                        {tx.shortHash}
                      </span>
                      <button
                        onClick={() => handleCopy(tx.hash)}
                        className="text-slate-400 hover:text-slate-200"
                        title="Copy Hash"
                      >
                        {copiedHash === tx.hash ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <span className="bg-navy-950 px-2 py-0.5 rounded border border-navy-800">
                      {tx.shortFrom}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <span className="bg-navy-950 px-2 py-0.5 rounded border border-navy-800">
                      {tx.shortTo}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                    {tx.amount}
                    <span className="text-[10px] text-slate-400 block font-normal font-sans">
                      ≈ {tx.valueUsd}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300 font-semibold">
                    {tx.token}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {tx.timestamp}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 font-mono text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {tx.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                        tx.risk === 'High'
                          ? 'bg-red-950/90 text-red-400 border border-red-800/40'
                          : tx.risk === 'Medium'
                          ? 'bg-amber-950/90 text-amber-400 border border-amber-800/40'
                          : 'bg-emerald-950/90 text-emerald-400 border border-emerald-800/40'
                      }`}
                    >
                      {tx.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-navy-750 bg-navy-850/40 flex items-center justify-between text-xs font-mono text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
            {filteredTransactions.length} records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-navy-800 hover:bg-navy-750 disabled:opacity-40 text-slate-300 border border-navy-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-bold text-slate-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-navy-800 hover:bg-navy-750 disabled:opacity-40 text-slate-300 border border-navy-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
