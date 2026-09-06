import React, { useState } from 'react';
import { Sidebar, NavigationPage } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { WalletAnalysis } from './components/analysis/WalletAnalysis';
import { ActiveCases } from './components/cases/ActiveCases';
import { InvestigationReport } from './components/reports/InvestigationReport';
import { LiveTransactionConsole } from './components/live/LiveTransactionConsole';
import { OfficerLogin } from './components/auth/OfficerLogin';
import { ConnectMetaMaskModal } from './components/auth/ConnectMetaMaskModal';
import { LiveInvestigationProvider, useLiveInvestigation } from './context/LiveInvestigationContext';

function MainInvestigationApp() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [searchNotification, setSearchNotification] = useState<string | null>(null);
  const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);

  const {
    currentCase,
    setMonitoredAddress,
    cases,
    officer,
    loginOfficer,
    connectedAccount,
  } = useLiveInvestigation();

  const handleSearch = async (query: string) => {
    const q = query.trim();
    if (q.startsWith('0x') && q.length >= 20) {
      await setMonitoredAddress(q);
      setCurrentPage('wallet-analysis');
      showNotification(`Live blockchain scan initiated for: ${q.slice(0, 8)}...${q.slice(-4)}`);
    } else {
      showNotification(`Searched ledger index: "${query}"`);
    }
  };

  const showNotification = (msg: string) => {
    setSearchNotification(msg);
    setTimeout(() => setSearchNotification(null), 3500);
  };

  // 1. Mandatory Officer Authentication Step
  if (!officer) {
    return (
      <OfficerLogin
        onLogin={(profile) => {
          loginOfficer(profile);
          // Show Step 2: MetaMask connection modal immediately after login!
          if (!connectedAccount) {
            setShowMetaMaskModal(true);
          }
        }}
      />
    );
  }

  if (currentPage === 'landing') {
    return (
      <LandingPage
        onStartInvestigation={() => setCurrentPage('wallet-analysis')}
        onViewDemoCase={() => setCurrentPage('wallet-analysis')}
        onSelectCapability={() => setCurrentPage('wallet-analysis')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex">
      {/* Step 2: Post-Login MetaMask Onboarding Prompt */}
      {showMetaMaskModal && (
        <ConnectMetaMaskModal onComplete={() => setShowMetaMaskModal(false)} />
      )}

      {/* Sleek 4-tab Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        currentCaseId={currentCase.caseId}
      />

      <div className="flex-1 ml-60 flex flex-col min-w-0">
        {/* Clean Top Navigation Bar */}
        <TopBar
          onSearch={handleSearch}
          currentCaseId={currentCase.caseId}
        />

        {searchNotification && (
          <div className="bg-blue-900/90 border-b border-blue-500/40 text-blue-200 px-6 py-2 text-xs font-mono flex items-center justify-between animate-in fade-in duration-150">
            <span>{searchNotification}</span>
            <button
              onClick={() => setSearchNotification(null)}
              className="text-blue-300 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Dashboard Overview */}
            {currentPage === 'dashboard' && (
              <DashboardOverview
                onOpenCase={(caseId) => {
                  const targetCase = cases.find((c) => c.caseId === caseId);
                  if (targetCase) {
                    setMonitoredAddress(targetCase.suspectWallet, targetCase.network, targetCase);
                  }
                  setCurrentPage('wallet-analysis');
                }}
                onNewInvestigation={() => setCurrentPage('wallet-analysis')}
              />
            )}

            {/* Unified Wallet Explorer & Analysis */}
            {currentPage === 'wallet-analysis' && (
              <div className="space-y-4">
                <LiveTransactionConsole />
                <WalletAnalysis />
              </div>
            )}

            {/* Active Cases Dossiers */}
            {currentPage === 'active-cases' && (
              <ActiveCases
                onSelectCase={(caseId) => {
                  const targetCase = cases.find((c) => c.caseId === caseId);
                  if (targetCase) {
                    setMonitoredAddress(targetCase.suspectWallet, targetCase.network, targetCase);
                  }
                  setCurrentPage('wallet-analysis');
                }}
                onNewCase={() => setCurrentPage('wallet-analysis')}
              />
            )}

            {/* Official Report Generation */}
            {currentPage === 'reports' && (
              <InvestigationReport caseData={currentCase} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <LiveInvestigationProvider>
      <MainInvestigationApp />
    </LiveInvestigationProvider>
  );
}

export default App;
