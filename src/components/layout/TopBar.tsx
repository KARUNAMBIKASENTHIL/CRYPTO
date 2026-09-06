import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  Shield,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface TopBarProps {
  onSearch: (query: string) => void;
  onOpenAlert?: (alertId: string) => void;
  currentCaseId: string;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch, currentCaseId }) => {
  const { liveNetworkStats, recentAlerts, network, connectedAccount, officer, logoutOfficer } = useLiveInvestigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="h-16 bg-navy-900 border-b border-navy-750 flex items-center justify-between px-6 sticky top-0 z-30 no-print">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-xl mr-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suspect wallet (0x...), tx hash, or case ID..."
            className="w-full bg-navy-850 border border-navy-700 text-xs text-slate-200 pl-9 pr-14 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono placeholder:font-sans placeholder:text-slate-400 transition-colors"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <span className="text-[10px] font-mono text-slate-400 bg-navy-750 px-1.5 py-0.5 rounded border border-navy-700">
              ESC
            </span>
          </div>
        </div>
      </form>

      {/* Right Tools & Profile */}
      <div className="flex items-center space-x-4">
        {/* Node status chip with live block height */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-navy-850 border border-navy-750 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-[11px] text-slate-300">
            {network} #{liveNetworkStats.totalBlocks}
          </span>
          <span className="text-[10px] font-mono text-blue-400 bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-800/40">
            {liveNetworkStats.coinPrice}
          </span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-750 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {recentAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                {Math.min(9, recentAlerts.length)}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-navy-850 border border-navy-700 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-navy-750 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">On-Chain Activity Alerts</span>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
                  LIVE RADAR
                </span>
              </div>
              <div className="divide-y divide-navy-750/60 max-h-72 overflow-y-auto">
                {recentAlerts.length === 0 ? (
                  <div className="p-4 text-center text-xs font-mono text-slate-400">
                    No active block alerts. Monitoring on-chain ledger...
                  </div>
                ) : (
                  recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 hover:bg-navy-800/60 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          {alert.type || 'ON-CHAIN RADAR'}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">{alert.timestamp}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">{alert.description}</div>
                      <div className="mt-1.5 font-mono text-[10px] text-blue-400 truncate">
                        {alert.txHash}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-3 py-2 border-t border-navy-750 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 font-medium"
                >
                  Close notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Investigator Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-navy-850 border border-transparent hover:border-navy-750 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
              {officer ? officer.name.slice(0, 2).toUpperCase() : (connectedAccount ? connectedAccount.slice(2, 4).toUpperCase() : 'CC')}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-medium text-slate-200 flex items-center gap-1.5 leading-none">
                {officer ? officer.name.split(' ')[0] : (connectedAccount ? `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}` : 'Investigator')}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 leading-none mt-1">
                {officer?.badgeId || (connectedAccount ? 'MetaMask Verified' : 'Cyber Cell')}
              </div>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-72 bg-navy-850 border border-navy-700 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-navy-750">
                <p className="text-xs font-semibold text-slate-200">
                  {officer?.name || 'On-Chain Investigator'}
                </p>
                <p className="text-[10px] font-mono text-blue-400 mt-0.5">
                  {officer?.badgeId} • {officer?.agency}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{connectedAccount ? `MetaMask: ${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}` : 'Read-Only Ledger Mode'}</span>
                </div>
              </div>

              <div className="p-2 text-xs text-slate-300 space-y-1">
                <div className="px-2 py-1.5 text-[11px] text-slate-400 font-mono">
                  Active Case: <span className="text-blue-400 font-bold">{currentCaseId}</span>
                </div>
                <button
                  onClick={logoutOfficer}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors flex items-center gap-2"
                >
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
