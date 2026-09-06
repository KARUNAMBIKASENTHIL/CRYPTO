import React, { useState } from 'react';
import {
  Shield,
  Lock,
  UserCheck,
  Building2,
  Zap,
  CheckCircle2,
  Sparkles,
  Fingerprint,
} from 'lucide-react';
import { OfficerProfile } from '../../context/LiveInvestigationContext';

interface OfficerLoginProps {
  onLogin: (officer: OfficerProfile) => void;
}

export const OfficerLogin: React.FC<OfficerLoginProps> = ({ onLogin }) => {
  const [badgeId, setBadgeId] = useState('CID-TN-9421');
  const [name, setName] = useState('Inspector Karthik Ramanathan');
  const [email, setEmail] = useState('karthik.cyber@police.gov.in');
  const [agency, setAgency] = useState('Cyber Crime Investigation Wing (CCIC)');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: name || 'Investigating Officer',
        badgeId: badgeId || 'CID-8842',
        email: email || 'officer@police.gov.in',
        agency: agency,
        department: 'Digital Forensic & Blockchain Counter-Terror Unit',
      });
      setIsLoading(false);
    }, 400);
  };

  const handleQuickLogin = () => {
    onLogin({
      name: 'Inspector Karthik Ramanathan',
      badgeId: 'CID-TN-9421',
      email: 'karthik.cyber@police.gov.in',
      agency: 'Cyber Crime Investigation Wing (CCIC)',
      department: 'Digital Forensic & Blockchain Intelligence',
    });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Cyber Grid Lines & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center mx-auto shadow-cyber-md border border-blue-400/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-mono text-[11px] text-blue-400 font-bold uppercase tracking-widest">
                CYBER CELL FORENSIC PORTAL
              </span>
              <span className="font-mono text-[9px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                RESTRICTED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
              Officer Authentication
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in with your law enforcement badge to begin cryptographic asset tracing
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-navy-900/90 backdrop-blur-md border border-navy-750 rounded-2xl p-6 sm:p-8 shadow-cyber-lg space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Agency Selector */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                <span>Agency / Jurisdiction</span>
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
              </label>
              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full bg-navy-850 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="Cyber Crime Investigation Wing (CCIC)">
                  Cyber Crime Investigation Wing (CCIC)
                </option>
                <option value="Financial Intelligence Unit (FIU-IND)">
                  Financial Intelligence Unit (FIU-IND)
                </option>
                <option value="Economic Offences Wing (EOW)">
                  Economic Offences Wing (EOW)
                </option>
                <option value="Central Forensic Science Laboratory (CFSL)">
                  Central Forensic Science Laboratory (CFSL)
                </option>
              </select>
            </div>

            {/* Officer Name */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                Officer Name & Rank
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-navy-850 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Badge ID */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                <span>Badge / Warrant ID</span>
                <Fingerprint className="w-3.5 h-3.5 text-slate-500" />
              </label>
              <input
                type="text"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                required
                className="w-full bg-navy-850 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5">
                Official Police Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-navy-850 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1.5 flex items-center justify-between">
                <span>Security Token / Password</span>
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-navy-850 border border-navy-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-cyber-sm transition-all flex items-center justify-center gap-2 uppercase font-mono tracking-wider disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Authorize Officer Session</span>
                  </>
                )}
              </button>

              {/* 1-Click Quick Demo Login */}
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full py-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 font-mono text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>1-Click Demo Login (Inspector Mode)</span>
              </button>
            </div>
          </form>

          {/* Compliance & Audit Footer */}
          <div className="pt-3 border-t border-navy-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>IT Act 2000 Sec 65B Compliant</span>
            <span className="flex items-center gap-1 text-emerald-500">
              <CheckCircle2 className="w-3 h-3" /> 256-bit Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
