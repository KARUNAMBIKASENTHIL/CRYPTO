import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Zap,
  CheckCircle2,
  Wallet,
  Shield,
  RefreshCw,
  X,
  ArrowRight,
  GitFork,
  Building2,
  Layers,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

export const LiveTransactionConsole: React.FC = () => {
  const {
    suspectAddress,
    network,
    isLiveListening,
    connectedAccount,
    walletBalance,
    latestAlert,
    currentCase,
    intermediaries,
    connectMetaMask,
    dispatchHopTransaction,
    dismissAlert,
  } = useLiveInvestigation();

  const [activeHopTab, setActiveHopTab] = useState<'hop1' | 'hop2' | 'hop3'>('hop1');
  const [showConsole, setShowConsole] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Hop 1 state (MetaMask A -> Suspect B)
  const [hop1Suspect, setHop1Suspect] = useState(
    suspectAddress || '0x71c6bf4840b157fdb520a564e69d702202a64ee5'
  );
  const [hop1Amount, setHop1Amount] = useState('0.05');

  // Hop 2 state (Suspect B -> Mule C)
  const [hop2Mule, setHop2Mule] = useState(
    intermediaries[0]?.address || '0x388c818ca8b9251b393131c08a736a67ccb19297'
  );
  const [hop2Amount, setHop2Amount] = useState('0.045');

  // Hop 3 state (Mule C -> Exchange)
  const [hop3Exchange, setHop3Exchange] = useState('0x28c6c06298d514db089934071355e5743bf21d60'); // Binance Hot Wallet
  const [hop3Amount, setHop3Amount] = useState('0.042');

  const currentSuspect = suspectAddress || hop1Suspect;
  const currentMule = intermediaries[0]?.address || hop2Mule;

  // Execute Hop 1: Sender (MetaMask A) -> Suspect Target (B)
  const handleExecuteHop1 = async (viaMetaMask: boolean) => {
    if (!hop1Suspect.trim() || !hop1Amount) return;
    setIsSending(true);
    try {
      const fromAddr = connectedAccount || '0x67aC391290348B284918237491823749182C505e';
      await dispatchHopTransaction({
        from: fromAddr,
        to: hop1Suspect.trim(),
        amount: hop1Amount,
        viaMetaMask: viaMetaMask && !!connectedAccount,
        hopLabel: 'HOP 1: INFLOW TO SUSPECT TARGET',
      });
      setActiveHopTab('hop2');
    } finally {
      setIsSending(false);
    }
  };

  // Execute Hop 2: Suspect (B) -> Intermediary Mule (C)
  const handleExecuteHop2 = async () => {
    if (!currentSuspect || !hop2Mule.trim() || !hop2Amount) return;
    setIsSending(true);
    try {
      await dispatchHopTransaction({
        from: currentSuspect,
        to: hop2Mule.trim(),
        amount: hop2Amount,
        viaMetaMask: false,
        hopLabel: 'HOP 2: SUSPECT OUTFLOW TO MULE',
      });
      setActiveHopTab('hop3');
    } finally {
      setIsSending(false);
    }
  };

  // Execute Hop 3: Mule (C) -> Exchange (Binance)
  const handleExecuteHop3 = async () => {
    if (!currentMule || !hop3Exchange.trim() || !hop3Amount) return;
    setIsSending(true);
    try {
      await dispatchHopTransaction({
        from: currentMule,
        to: hop3Exchange.trim(),
        amount: hop3Amount,
        viaMetaMask: false,
        hopLabel: 'HOP 3: MULE TO EXCHANGE OFF-RAMP',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4 no-print">
      {/* 1. Live Detection Flash Alert Banner */}
      {latestAlert && (
        <div className="bg-gradient-to-r from-red-950 via-navy-900 to-red-950 border-2 border-red-500 rounded-xl p-4 shadow-cyber-danger animate-in slide-in-from-top duration-300 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg animate-bounce flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    {latestAlert.type || 'LIVE TRANSACTION DETECTED ON-CHAIN'}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 bg-navy-950 px-1.5 py-0.5 rounded border border-navy-800">
                    Block #{latestAlert.blockNumber}
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-200 mt-1 flex flex-wrap items-center gap-2">
                  <span className="font-bold text-emerald-400">{latestAlert.amount}</span>
                  <span className="text-slate-400">transferred from</span>
                  <span className="text-blue-400 bg-navy-950 px-1.5 py-0.5 rounded border border-navy-800">
                    {latestAlert.from.slice(0, 6)}...{latestAlert.from.slice(-4)}
                  </span>
                  <span className="text-slate-400">➔</span>
                  <span className="text-amber-400 bg-navy-950 px-1.5 py-0.5 rounded border border-navy-800">
                    {latestAlert.to.slice(0, 6)}...{latestAlert.to.slice(-4)}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-slate-400 mt-1 truncate max-w-xl">
                  Hash: {latestAlert.txHash}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={dismissAlert}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-navy-900 border border-navy-750 text-xs transition-colors"
                title="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Crime Trail Visual Flow & Trigger Bar */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-3.5 shadow-cyber-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Crime Trail Pathway Visualizer */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto text-xs font-mono">
          {/* Node A: Investigator / MetaMask */}
          <div className="flex items-center gap-1.5 bg-navy-950 px-3 py-1.5 rounded-lg border border-blue-900/50">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="text-slate-400">Wallet A (MetaMask):</span>
            <span className="text-blue-400 font-bold">
              {connectedAccount
                ? `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`
                : 'Not Linked'}
            </span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />

          {/* Node B: Suspect Target */}
          <div className="flex items-center gap-1.5 bg-navy-950 px-3 py-1.5 rounded-lg border border-red-900/50">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="text-slate-400">Wallet B (Suspect):</span>
            <span className="text-red-400 font-bold">
              {suspectAddress
                ? `${suspectAddress.slice(0, 6)}...${suspectAddress.slice(-4)}`
                : 'Pending Target'}
            </span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />

          {/* Node C: Intermediary Mule */}
          <div className="flex items-center gap-1.5 bg-navy-950 px-3 py-1.5 rounded-lg border border-amber-900/50">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-slate-400">Wallet C (Mule):</span>
            <span className="text-amber-400 font-bold">
              {intermediaries.length > 0
                ? `${intermediaries[0].address.slice(0, 6)}...${intermediaries[0].address.slice(-4)}`
                : 'Awaiting Hop'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          {!connectedAccount && (
            <button
              type="button"
              onClick={connectMetaMask}
              className="px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors flex items-center gap-1.5 bg-navy-850 hover:bg-navy-800 border-navy-700 text-slate-300 hover:text-white"
            >
              <Wallet className="w-3.5 h-3.5 text-blue-400" />
              <span>Connect MetaMask</span>
            </button>
          )}

          {/* Toggle Multi-Hop Dispatcher */}
          <button
            type="button"
            onClick={() => setShowConsole(!showConsole)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-cyber-sm transition-all flex items-center gap-1.5"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>{showConsole ? 'Close Multi-Hop Dispatcher' : 'Test Multi-Hop Trail (A ➔ B ➔ C)'}</span>
          </button>
        </div>
      </div>

      {/* 3. Multi-Hop Crime Dispatcher Panel */}
      {showConsole && (
        <div className="bg-navy-900 border border-blue-500/40 rounded-xl p-5 shadow-cyber-md animate-in slide-in-from-top-2 duration-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-navy-750">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                  MULTI-HOP CRIME TRAIL SIMULATOR & BROADCASTER
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  REAL-TIME ON-CHAIN SYNC
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Execute or simulate multi-hop fund transfers to observe real-time graph links from Wallet A ➔ Wallet B ➔ Wallet C.
              </p>
            </div>
            <button
              onClick={() => setShowConsole(false)}
              className="text-slate-400 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          </div>

          {/* Hop Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveHopTab('hop1')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeHopTab === 'hop1'
                  ? 'bg-blue-950/80 border-blue-500/60 shadow-cyber-sm'
                  : 'bg-navy-850/60 border-navy-750 hover:bg-navy-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-blue-400 font-bold uppercase">STEP 1: INFLOW</span>
                {suspectAddress && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-bold text-slate-100 mt-1">Wallet A ➔ Suspect B</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Fund suspect target</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveHopTab('hop2')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeHopTab === 'hop2'
                  ? 'bg-amber-950/80 border-amber-500/60 shadow-cyber-sm'
                  : 'bg-navy-850/60 border-navy-750 hover:bg-navy-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase">STEP 2: OUTFLOW HOP</span>
                {intermediaries.length > 0 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-bold text-slate-100 mt-1">Suspect B ➔ Mule C</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Laundering dispersion</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveHopTab('hop3')}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeHopTab === 'hop3'
                  ? 'bg-purple-950/80 border-purple-500/60 shadow-cyber-sm'
                  : 'bg-navy-850/60 border-navy-750 hover:bg-navy-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-purple-400 font-bold uppercase">STEP 3: OFF-RAMP</span>
                <Building2 className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-xs font-bold text-slate-100 mt-1">Mule C ➔ Exchange</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Cash-out to Binance</div>
            </button>
          </div>

          {/* TAB 1: Hop 1 Form */}
          {activeHopTab === 'hop1' && (
            <div className="space-y-4 pt-1">
              <div className="bg-navy-850 p-3.5 rounded-lg border border-navy-750 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Sender (Wallet A):</span>
                <span className="text-blue-400 font-mono font-bold">
                  {connectedAccount || '0x67aC391290348B284918237491823749182C505e (Default Sender)'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Suspect Target Address (Wallet B)
                  </label>
                  <input
                    type="text"
                    value={hop1Suspect}
                    onChange={(e) => setHop1Suspect(e.target.value)}
                    placeholder="Paste Suspect Address (0x...)"
                    className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={hop1Amount}
                    onChange={(e) => setHop1Amount(e.target.value)}
                    placeholder="0.05"
                    className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-slate-400 font-mono">
                  {connectedAccount
                    ? '⚡ Click "Free Simulation" to test without paying gas fees!'
                    : '⚡ Connect MetaMask above to sign with real wallet'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={() => handleExecuteHop1(false)}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold font-mono shadow-cyber-sm transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>Free Simulation (No Gas)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSending || !connectedAccount}
                    onClick={() => handleExecuteHop1(true)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold font-mono uppercase shadow-cyber-sm transition-all flex items-center gap-1.5"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Broadcasting...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>MetaMask Send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hop 2 Form */}
          {activeHopTab === 'hop2' && (
            <div className="space-y-4 pt-1">
              <div className="bg-navy-850 p-3.5 rounded-lg border border-navy-750 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Sender (Suspect Target B):</span>
                <span className="text-red-400 font-mono font-bold">
                  {currentSuspect}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Mule / Intermediary Counterparty (Wallet C)
                  </label>
                  <input
                    type="text"
                    value={hop2Mule}
                    onChange={(e) => setHop2Mule(e.target.value)}
                    placeholder="0x388c818ca8b9251b393131c08a736a67ccb19297"
                    className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={hop2Amount}
                    onChange={(e) => setHop2Amount(e.target.value)}
                    placeholder="0.045"
                    className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-amber-400 font-mono">
                  🚨 This creates the outflow link: Wallet B ➔ Wallet C!
                </span>

                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleExecuteHop2}
                  className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold font-mono shadow-cyber-sm transition-all flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Dispatch Outflow Hop to Wallet C</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Hop 3 Form */}
          {activeHopTab === 'hop3' && (
            <div className="space-y-4 pt-1">
              <div className="bg-navy-850 p-3.5 rounded-lg border border-navy-750 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Sender (Mule C):</span>
                <span className="text-amber-400 font-mono font-bold">
                  {currentMule}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Terminal Exchange / VASP Destination
                  </label>
                  <input
                    type="text"
                    value={hop3Exchange}
                    onChange={(e) => setHop3Exchange(e.target.value)}
                    placeholder="0x28c6c06298d514db089934071355e5743bf21d60 (Binance)"
                    className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={hop3Amount}
                    onChange={(e) => setHop3Amount(e.target.value)}
                    placeholder="0.042"
                    className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-purple-400 font-mono">
                  🏦 Connects terminal hop into Binance Hot Wallet for law enforcement freezing!
                </span>

                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleExecuteHop3}
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold font-mono shadow-cyber-sm transition-all flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Dispatch Off-Ramp to Binance</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
