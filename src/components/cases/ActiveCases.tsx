import React, { useState } from 'react';
import {
  FolderLock,
  Search,
  ChevronRight,
  PlusCircle,
  Shield,
  Trash2,
} from 'lucide-react';
import { CaseStatus } from '../../types/crypto';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface ActiveCasesProps {
  onSelectCase: (caseId: string) => void;
  onNewCase: () => void;
}

export const ActiveCases: React.FC<ActiveCasesProps> = ({ onSelectCase, onNewCase }) => {
  const { cases, deleteCase } = useLiveInvestigation();
  const [statusFilter, setStatusFilter] = useState<'All' | CaseStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter((c) => {
    const matchesFilter =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Active'
        ? c.status === 'Active' || c.status === 'Under Investigation'
        : c.status === statusFilter;

    const matchesSearch =
      c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.suspectWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.network.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider uppercase">
              CASE MANAGEMENT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            ACTIVE CASES
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Central repository of ongoing cryptocurrency fraud, theft, and extortion dockets.
          </p>
        </div>

        <button
          onClick={onNewCase}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-cyber-sm transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Investigation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-4 shadow-cyber-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Case ID, suspect address, title..."
            className="w-full bg-navy-850 border border-navy-700 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 font-mono placeholder:font-sans placeholder:text-slate-400"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-navy-850 border border-navy-700 rounded-lg p-1 text-xs">
          {(['All', 'Active', 'Under Review', 'Completed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded font-mono text-[11px] transition-colors ${
                statusFilter === filter
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl shadow-cyber-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-navy-750 bg-navy-850/60 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Suspect Wallet</th>
                <th className="py-3 px-4">Blockchain</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80 text-xs">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                    No matching cases found. Start a new investigation to add a live dossier.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => (
                  <tr
                    key={c.caseId}
                    onClick={() => onSelectCase(c.caseId)}
                    className="hover:bg-navy-850/70 cursor-pointer transition-colors group"
                  >
                    {/* Case ID */}
                    <td className="py-4 px-4 font-mono font-bold text-blue-400">
                      <div className="flex items-center gap-2">
                        <FolderLock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{c.caseId}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans block mt-0.5 font-normal">
                        {c.title}
                      </span>
                    </td>

                    {/* Suspect Wallet */}
                    <td className="py-4 px-4 font-mono text-slate-300">
                      <span className="bg-navy-950 px-2 py-1 rounded border border-navy-800">
                        {c.suspectShortWallet || `${c.suspectWallet.slice(0, 8)}...${c.suspectWallet.slice(-4)}`}
                      </span>
                    </td>

                    {/* Blockchain */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        {c.network}
                      </span>
                    </td>

                    {/* Risk Level */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded font-mono text-[10px] font-bold ${
                          c.riskLevel === 'CRITICAL'
                            ? 'bg-red-950/90 text-red-400 border border-red-800/50'
                            : c.riskLevel === 'HIGH'
                            ? 'bg-orange-950/90 text-orange-400 border border-orange-800/50'
                            : 'bg-amber-950/90 text-amber-400 border border-amber-800/50'
                        }`}
                      >
                        {c.riskLevel} ({c.riskScore}/100)
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {c.status}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-400">
                      {c.lastUpdated}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCase(c.caseId);
                          }}
                          className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                          title="Delete Case"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <span className="inline-flex items-center text-xs text-blue-400 group-hover:text-blue-300 font-medium gap-1">
                          Open Dossier <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
