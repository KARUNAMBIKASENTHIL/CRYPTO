import React, { useState } from 'react';
import {
  Wallet,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';

interface ConnectMetaMaskModalProps {
  onComplete: () => void;
}

export const ConnectMetaMaskModal: React.FC<ConnectMetaMaskModalProps> = ({ onComplete }) => {
  const { connectMetaMask, connectedAccount, officer } = useLiveInvestigation();
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setErrorMsg(null);
    try {
      const account = await connectMetaMask();
      if (account) {
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        setErrorMsg('MetaMask connection was not completed or rejected.');
      }
    } catch (err: any) {
      setErrorMsg('Could not establish Web3 connection with MetaMask.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-cyber-lg space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header Icon */}
        <div className="flex items-center gap-4 pb-4 border-b border-navy-750">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-cyber-sm">
            <Wallet className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
                STEP 2 OF 2 • ON-BOARDING
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-0.5">
              Connect Investigator Wallet
            </h2>
            <p className="text-xs text-slate-400">
              Link your MetaMask account for real-time ledger signing & threat dispatch
            </p>
          </div>
        </div>

        {/* Officer Welcome Card */}
        <div className="bg-navy-850 p-4 rounded-xl border border-navy-750 flex items-center justify-between text-xs">
          <div>
            <div className="text-slate-400 font-mono text-[10px]">AUTHENTICATED OFFICER</div>
            <div className="font-bold text-slate-100 font-sans mt-0.5">
              {officer?.name || 'Authorized Investigator'}
            </div>
            <div className="text-blue-400 font-mono text-[11px] mt-0.5">
              {officer?.badgeId} • {officer?.agency}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800/50 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Status / Message */}
        {connectedAccount ? (
          <div className="bg-emerald-950/80 border border-emerald-800/60 rounded-xl p-4 flex items-center gap-3 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold">MetaMask Successfully Linked!</div>
              <div className="text-[11px] text-emerald-400/90 mt-0.5">
                Address: {connectedAccount.slice(0, 10)}...{connectedAccount.slice(-6)}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
            <p>
              To broadcast on-chain test transactions and trace fund pathways from your wallet to suspect accounts, please connect your <strong>MetaMask browser extension</strong>.
            </p>
            <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Your address will act as the Investigator / Victim source node.</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-800/60 rounded-xl p-3 flex items-center gap-2 text-xs text-red-300 font-mono">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {connectedAccount ? (
            <button
              onClick={onComplete}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-cyber-sm transition-all flex items-center justify-center gap-2 uppercase font-mono tracking-wider"
            >
              <span>Enter Investigation Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-cyber-sm transition-all flex items-center justify-center gap-2 uppercase font-mono tracking-wider disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting to MetaMask...' : 'Connect MetaMask Now'}</span>
              </button>

              <button
                onClick={onComplete}
                className="w-full py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-400 hover:text-slate-200 border border-navy-750 font-mono text-xs transition-colors"
              >
                Proceed without MetaMask (Read-Only Audit Mode)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
