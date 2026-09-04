import React from 'react';
import {
  LayoutDashboard,
  Search,
  FolderLock,
  FileText,
  Shield,
  ExternalLink,
  Wallet,
} from 'lucide-react';

export type NavigationPage =
  | 'landing'
  | 'dashboard'
  | 'wallet-analysis'
  | 'active-cases'
  | 'reports';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  currentCaseId: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const navItems = [
    { id: 'dashboard' as NavigationPage, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet-analysis' as NavigationPage, label: 'Investigate Wallet', icon: Search, badge: 'Live' },
    { id: 'active-cases' as NavigationPage, label: 'Active Cases', icon: FolderLock },
    { id: 'reports' as NavigationPage, label: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-60 bg-navy-900 border-r border-navy-750 flex flex-col h-screen fixed top-0 left-0 z-40 select-none no-print">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-750">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 w-full text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-cyber-sm group-hover:scale-105 transition-transform flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-sans font-bold text-sm text-slate-100 tracking-wide">
              CRYPTO TRACE AI
            </div>
            <div className="font-mono text-[10px] text-blue-400 font-medium">
              Forensic Intelligence
            </div>
          </div>
        </button>
      </div>

      {/* Neat Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <div className="px-3 mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-cyber-sm'
                    : 'text-slate-300 hover:bg-navy-850 hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 border border-blue-800/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="p-3 border-t border-navy-750 space-y-2">
        <button
          onClick={() => onNavigate('landing')}
          className="w-full px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-navy-850 transition-colors flex items-center justify-between font-mono"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
