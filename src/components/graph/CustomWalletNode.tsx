import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Shield, AlertTriangle, Building2, Shuffle, CheckCircle2 } from 'lucide-react';
import { WalletNodeDetail } from '../../types/crypto';

interface CustomWalletNodeProps {
  data: {
    wallet: WalletNodeDetail;
    isSelected?: boolean;
  };
}

export const CustomWalletNode = memo(({ data }: CustomWalletNodeProps) => {
  const { wallet, isSelected } = data;

  // Determine styling according to exact specifications:
  // Victim (Green), Suspect (Red), Intermediary (Orange), Exchange/VASP (Purple)
  let indicatorColor = 'bg-emerald-500';
  let borderColor = 'border-emerald-500/50';
  let badgeBg = 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40';
  let glowStyle = isSelected ? 'ring-2 ring-emerald-400 shadow-cyber-md' : '';
  let Icon = CheckCircle2;

  if (wallet.type === 'Suspect Wallet') {
    indicatorColor = 'bg-red-500';
    borderColor = 'border-red-500/60';
    badgeBg = 'bg-red-950/90 text-red-400 border-red-800/50';
    glowStyle = isSelected ? 'ring-2 ring-red-400 shadow-cyber-danger' : 'shadow-cyber-danger/30';
    Icon = AlertTriangle;
  } else if (wallet.type === 'Intermediary Wallet') {
    indicatorColor = 'bg-amber-500';
    borderColor = 'border-amber-500/60';
    badgeBg = 'bg-amber-950/90 text-amber-400 border-amber-800/50';
    glowStyle = isSelected ? 'ring-2 ring-amber-400 shadow-cyber-md' : '';
    Icon = Shuffle;
  } else if (wallet.type === 'Exchange/VASP') {
    indicatorColor = 'bg-purple-500';
    borderColor = 'border-purple-500/60';
    badgeBg = 'bg-purple-950/90 text-purple-400 border-purple-800/50';
    glowStyle = isSelected ? 'ring-2 ring-purple-400 shadow-cyber-glow' : '';
    Icon = Building2;
  }

  return (
    <div
      className={`relative bg-navy-900 border ${borderColor} rounded-xl p-3.5 min-w-[210px] max-w-[240px] transition-all hover:scale-105 cursor-pointer select-none ${glowStyle}`}
    >
      {/* Handles for flow connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2.5 h-2.5 bg-slate-400 border-2 border-navy-950 -top-1.5"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2.5 h-2.5 bg-blue-400 border-2 border-navy-950 -bottom-1.5"
      />

      {/* Header: Icon & Type */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${indicatorColor} animate-pulse flex-shrink-0`} />
          <span className="text-[11px] font-semibold text-slate-200 truncate">
            {wallet.type}
          </span>
        </div>

        {/* Risk Badge */}
        <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold ${badgeBg}`}>
          {wallet.riskLevel}
        </span>
      </div>

      {/* Short Wallet Address in Monospace */}
      <div className="font-mono text-xs font-bold text-slate-100 bg-navy-950/90 px-2 py-1.5 rounded border border-navy-800 mb-2 truncate">
        {wallet.shortAddress}
      </div>

      {/* Subtext: Balance & Score */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Bal: {wallet.balance}</span>
        <span className={wallet.riskScore > 75 ? 'text-red-400 font-bold' : wallet.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}>
          Risk: {wallet.riskScore}/100
        </span>
      </div>
    </div>
  );
});

CustomWalletNode.displayName = 'CustomWalletNode';
