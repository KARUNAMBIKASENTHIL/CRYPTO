export type BlockchainNetwork = 'Ethereum' | 'Polygon' | 'BNB Chain' | 'Bitcoin';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type CaseStatus = 'Active' | 'Under Review' | 'Completed' | 'Under Investigation';

export type WalletType = 'Victim Wallet' | 'Suspect Wallet' | 'Intermediary Wallet' | 'Exchange/VASP';

export interface WalletNodeDetail {
  id: string;
  address: string;
  shortAddress: string;
  type: WalletType;
  riskLevel: RiskLevel;
  riskScore: number;
  balance: string;
  totalIncoming: string;
  totalOutgoing: string;
  incomingCount: number;
  outgoingCount: number;
  connectedWalletsCount: number;
  firstSeen: string;
  lastActivity: string;
  tags: string[];
  notes?: string;
}

export interface GraphEdgeDetail {
  id: string;
  source: string;
  target: string;
  amount: string;
  token: string;
  txHash: string;
  timestamp: string;
  hops: number;
}

export interface IntermediaryWallet {
  id: string;
  rank: string;
  address: string;
  shortAddress: string;
  reason: string;
  risk: 'High' | 'Medium' | 'Low';
  holdDuration: string;
  forwardRate: string;
  hopLevel: number;
  flaggedAt: string;
}

export interface SuspiciousPattern {
  id: string;
  name: string;
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  evidence: string;
  detectedAt: string;
}

export interface RiskFactor {
  factor: string;
  score: number;
  maxScore: number;
  weightDescription: string;
  category: string;
}

export interface ExchangeAttribution {
  exchangeName: string;
  associatedWallet: string;
  shortWallet: string;
  confidenceScore: number;
  transactionHops: number;
  depositStatus: string;
  attributionBasis: string[];
  disclaimer: string;
}

export interface TransactionRecord {
  hash: string;
  shortHash: string;
  from: string;
  shortFrom: string;
  to: string;
  shortTo: string;
  amount: string;
  token: string;
  valueUsd: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Flagged';
  risk: 'High' | 'Medium' | 'Low';
  fee: string;
}

export interface InvestigationCase {
  caseId: string;
  title: string;
  suspectWallet: string;
  suspectShortWallet: string;
  victimWallet: string;
  network: BlockchainNetwork;
  riskLevel: RiskLevel;
  riskScore: number;
  status: CaseStatus;
  leadInvestigator: string;
  createdDate: string;
  lastUpdated: string;
  totalTransactions: number;
  connectedWallets: number;
  intermediaryCount: number;
  totalValueTraced: string;
  totalValueUsd: string;
  possibleDestination: string;
  notes: string;
}

export interface DashboardOverviewStats {
  activeCases: number;
  walletsAnalyzed: number;
  highRiskWallets: number;
  exchangeConnections: number;
}
