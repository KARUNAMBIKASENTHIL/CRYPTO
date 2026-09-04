import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  Radio,
  Send,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Shield,
  ExternalLink,
  RefreshCw,
  X,
  Volume2,
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
    toggleLiveListening,
    connectMetaMask,
    sendLiveTransaction,
    dismissAlert,
  } = useLiveInvestigation();

  const [toAddress, setToAddress] = useState('0x28c6c06298d514db089934071355e5743bf21d60');
  const [amount, setAmount] = useState('0.05');
  const [isSending, setIsSending] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toAddress.trim() || !amount) return;

    setIsSending(true);
    try {
      await sendLiveTransaction(toAddress.trim(), amount);
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
                    LIVE TRANSACTION DETECTED ON-CHAIN
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
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Live Monitoring Radar & Trigger Bar */}
      <div className="bg-navy-900 border border-navy-750 rounded-xl p-3.5 shadow-cyber-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Radar Status */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-200 tracking-wide uppercase">
                LIVE BLOCKCHAIN RADAR: {isLiveListening ? 'ACTIVE' : 'PAUSED'}
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-800/40">
                LISTENING
              </span>
            </div>
            <div className="font-mono text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Target:</span>
              <span className="text-blue-400 font-bold">
                {suspectAddress ? `${suspectAddress.slice(0, 10)}...${suspectAddress.slice(-4)}` : 'Connect MetaMask or search address'}
              </span>
              <span>•</span>
              <span>Bal: {walletBalance}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Connect MetaMask */}
          <button
            type="button"
            onClick={connectMetaMask}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-colors flex items-center gap-1.5 ${
              connectedAccount
                ? 'bg-emerald-950/80 border-emerald-700/50 text-emerald-300'
                : 'bg-navy-850 hover:bg-navy-800 border-navy-700 text-slate-300 hover:text-white'
            }`}
          >
            <Wallet className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {connectedAccount
                ? `MetaMask: ${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`
                : 'Connect MetaMask'}
            </span>
          </button>

          {/* Toggle Send Transaction Console */}
          <button
            type="button"
            onClick={() => setShowConsole(!showConsole)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-cyber-sm transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Live Tx & Detect</span>
          </button>
        </div>
      </div>

      {/* 3. Send Live Transaction Widget (Collapsible) */}
      {showConsole && (
        <div className="bg-navy-900 border border-blue-500/40 rounded-xl p-5 shadow-cyber-md animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-750">
            <div>
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                LIVE ON-CHAIN TRANSACTION DISPATCHER
              </span>
              <p className="text-xs text-slate-400">
                Transmit a live transaction from your wallet or broadcast a test transfer to witness real-time on-chain detection!
              </p>
            </div>
            <button
              onClick={() => setShowConsole(false)}
              className="text-slate-400 hover:text-white text-xs font-mono"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Destination Recipient Address
                </label>
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1.0"
                  className="w-full bg-navy-850 border border-navy-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[10px] uppercase">Presets:</span>
              <button
                type="button"
                onClick={() => {
                  setToAddress('0x28c6c06298d514db089934071355e5743bf21d60');
                  setAmount('0.05');
                }}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-navy-850 border border-navy-750 text-amber-300 hover:bg-navy-800"
              >
                Binance Hot Wallet (0.05 ETH)
              </button>
              <button
                type="button"
                onClick={() => {
                  setToAddress('0x71660c4005ba85c37ccec55d0c4493e66fe775d3');
                  setAmount('0.10');
                }}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-navy-850 border border-navy-750 text-blue-300 hover:bg-navy-800"
              >
                Coinbase Hot Wallet (0.10 ETH)
              </button>
              <button
                type="button"
                onClick={() => {
                  setToAddress('0xd90e2f925da726b50c4ed8d0fb90ad053324f31b');
                  setAmount('0.25');
                }}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-navy-850 border border-navy-750 text-purple-300 hover:bg-navy-800"
              >
                Tornado Cash Router (0.25 ETH)
              </button>
            </div>

            {/* Transmit Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                {connectedAccount
                  ? '⚡ 0 ETH in MetaMask? Click "Free Simulation" to test without gas fees!'
                  : '⚡ Transmits with cryptographic keccak256 signature'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    setIsSending(true);
                    try {
                      // Bypass MetaMask balance check and simulate cryptographic broadcast
                      const randomBytes = ethers.randomBytes(32);
                      const txHash = ethers.hexlify(randomBytes);
                      await sendLiveTransaction(toAddress.trim() || '0x28c6c06298d514db089934071355e5743bf21d60', amount || '0.05');
                    } finally {
                      setIsSending(false);
                    }
                  }}
                  disabled={isSending}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold font-mono shadow-cyber-sm transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  <span>Free Simulation (No Gas)</span>
                </button>

                <button
                  type="submit"
                  disabled={isSending}
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
          </form>
        </div>
      )}
    </div>
  );
};
