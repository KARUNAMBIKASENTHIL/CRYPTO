import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomWalletNode } from './CustomWalletNode';
import { CustomAmountEdge } from './CustomAmountEdge';
import { WalletDetailPanel } from './WalletDetailPanel';
import { WalletNodeDetail } from '../../types/crypto';
import { useLiveInvestigation } from '../../context/LiveInvestigationContext';
import { RefreshCw, ShieldCheck, Zap } from 'lucide-react';

const nodeTypes = {
  customWallet: CustomWalletNode,
};

const edgeTypes = {
  customAmount: CustomAmountEdge,
};

export const TransactionGraph: React.FC = () => {
  const {
    suspectAddress,
    walletBalance,
    txCount,
    transactions,
    currentCase,
    intermediaries,
    exchangeAttribution,
    riskScore,
    latestAlert,
  } = useLiveInvestigation();

  const [selectedWallet, setSelectedWallet] = useState<WalletNodeDetail | null>(null);

  // Derive dynamic nodes from live on-chain state
  const initialNodes: Node[] = useMemo(() => {
    if (!suspectAddress) return [];

    // Target Node (Monitored target)
    const targetNode: Node = {
      id: 'target',
      type: 'customWallet',
      position: { x: 300, y: transactions.length > 0 ? 180 : 120 },
      data: {
        wallet: {
          id: 'target',
          address: suspectAddress,
          shortAddress: `${suspectAddress.slice(0, 8)}...${suspectAddress.slice(-4)}`,
          type: 'Suspect Wallet',
          riskLevel: riskScore >= 75 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW',
          riskScore: riskScore,
          balance: walletBalance,
          totalIncoming: currentCase.totalValueTraced,
          totalOutgoing: currentCase.totalValueTraced,
          incomingCount: transactions.filter((t) => t.to.toLowerCase() === suspectAddress.toLowerCase()).length,
          outgoingCount: transactions.filter((t) => t.from.toLowerCase() === suspectAddress.toLowerCase()).length,
          connectedWalletsCount: transactions.length > 0 ? currentCase.connectedWallets : 0,
          firstSeen: transactions.length > 0 ? 'Confirmed on Ledger' : 'Fresh Wallet',
          lastActivity: latestAlert ? 'Just now (LIVE TX)' : transactions.length > 0 ? 'On-Chain' : 'No Activity',
          tags: ['Monitored Address', transactions.length > 0 ? `${currentCase.riskLevel} RISK` : 'Clean / Zero Txs'],
          notes: 'Monitored address under real-time blockchain surveillance.',
        },
        isSelected: selectedWallet?.id === 'target',
      },
    };

    // If zero transactions on-chain, display only the clean target node
    if (transactions.length === 0) {
      return [targetNode];
    }

    const nodesList: Node[] = [targetNode];

    // Add Origin/Counterparty node if primary counterparty exists
    if (currentCase.victimWallet && currentCase.victimWallet !== '0x0000000000000000000000000000000000000000') {
      nodesList.unshift({
        id: 'origin',
        type: 'customWallet',
        position: { x: 300, y: 30 },
        data: {
          wallet: {
            id: 'origin',
            address: currentCase.victimWallet,
            shortAddress: `${currentCase.victimWallet.slice(0, 8)}...${currentCase.victimWallet.slice(-4)}`,
            type: 'Victim Wallet',
            riskLevel: 'LOW',
            riskScore: 10,
            balance: '0.00 ETH',
            totalIncoming: currentCase.totalValueTraced,
            totalOutgoing: currentCase.totalValueTraced,
            incomingCount: 1,
            outgoingCount: 1,
            connectedWalletsCount: 1,
            firstSeen: 'On-Chain Record',
            lastActivity: 'Active',
            tags: ['Counterparty Origin', 'Fund Inflow'],
          },
          isSelected: selectedWallet?.id === 'origin',
        },
      });
    }

    // Add Intermediary nodes from genuine transactions
    intermediaries.forEach((inter, idx) => {
      const xPositions = [150, 450, 300];
      const yPositions = [330, 330, 460];
      nodesList.push({
        id: `inter${idx + 1}`,
        type: 'customWallet',
        position: { x: xPositions[idx] || 300, y: yPositions[idx] || 330 },
        data: {
          wallet: {
            id: `inter${idx + 1}`,
            address: inter.address,
            shortAddress: inter.shortAddress,
            type: 'Intermediary Wallet',
            riskLevel: inter.risk.toUpperCase() as any,
            riskScore: inter.risk === 'High' ? 80 : 50,
            balance: '0.00 ETH',
            totalIncoming: currentCase.totalValueTraced,
            totalOutgoing: currentCase.totalValueTraced,
            incomingCount: 1,
            outgoingCount: 1,
            connectedWalletsCount: 2,
            firstSeen: 'Confirmed Block',
            lastActivity: 'Live Hop',
            tags: [`Hop ${idx + 1}`, inter.reason],
          },
          isSelected: selectedWallet?.id === `inter${idx + 1}`,
        },
      });
    });

    // Add Exchange/Endpoint Node if detected
    if (exchangeAttribution && exchangeAttribution.confidenceScore > 80) {
      nodesList.push({
        id: 'exchange',
        type: 'customWallet',
        position: { x: 450, y: 560 },
        data: {
          wallet: {
            id: 'exchange',
            address: exchangeAttribution.associatedWallet,
            shortAddress: exchangeAttribution.shortWallet,
            type: 'Exchange/VASP',
            riskLevel: 'MEDIUM',
            riskScore: 40,
            balance: '1,200 ETH',
            totalIncoming: '50,000 ETH',
            totalOutgoing: '49,000 ETH',
            incomingCount: 12000,
            outgoingCount: 11000,
            connectedWalletsCount: 4000,
            firstSeen: 'Tagged Cluster',
            lastActivity: 'Active',
            tags: ['Exchange Endpoint', exchangeAttribution.exchangeName],
          },
          isSelected: selectedWallet?.id === 'exchange',
        },
      });
    }

    return nodesList;
  }, [
    suspectAddress,
    walletBalance,
    txCount,
    transactions,
    currentCase,
    intermediaries,
    exchangeAttribution,
    riskScore,
    latestAlert,
    selectedWallet,
  ]);

  // Edges matching only genuine live transactions
  const initialEdges: Edge[] = useMemo(() => {
    if (transactions.length === 0) return [];

    const edgeList: Edge[] = [];

    // Edge from origin to target
    if (currentCase.victimWallet && currentCase.victimWallet !== '0x0000000000000000000000000000000000000000') {
      edgeList.push({
        id: 'e-origin-target',
        source: 'origin',
        target: 'target',
        type: 'customAmount',
        animated: true,
        data: { amount: transactions[0]?.amount || currentCase.totalValueTraced },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
      });
    }

    // Edges to intermediaries
    intermediaries.forEach((_inter, idx) => {
      edgeList.push({
        id: `e-target-inter${idx + 1}`,
        source: 'target',
        target: `inter${idx + 1}`,
        type: 'customAmount',
        animated: true,
        data: { amount: transactions[idx + 1]?.amount || '0.05 ETH' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
      });
    });

    // Edge to exchange
    if (exchangeAttribution && exchangeAttribution.confidenceScore > 80 && intermediaries.length > 0) {
      edgeList.push({
        id: 'e-inter-exchange',
        source: `inter${intermediaries.length}`,
        target: 'exchange',
        type: 'customAmount',
        animated: true,
        data: { amount: 'Off-Ramp' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#a855f7' },
      });
    }

    return edgeList;
  }, [transactions, currentCase, intermediaries, exchangeAttribution]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Keep nodes & edges synchronized with live updates
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const walletDetail = (node.data as any)?.wallet as WalletNodeDetail;
      if (walletDetail) {
        setSelectedWallet(walletDetail);
      }
    },
    []
  );

  return (
    <div className="relative h-[calc(100vh-14rem)] w-full bg-navy-950 rounded-xl border border-navy-750 overflow-hidden flex shadow-cyber-sm">
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.2}
          maxZoom={1.5}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e293b" />
          <Controls className="bg-navy-900 border border-navy-750 rounded-lg p-1 fill-slate-300" />
          <MiniMap
            nodeColor={(n) => {
              if (n.id === 'target') return '#3b82f6';
              if (n.id === 'origin') return '#10b981';
              if (n.id === 'exchange') return '#a855f7';
              return '#f59e0b';
            }}
            maskColor="rgba(6, 10, 18, 0.8)"
            className="bg-navy-900 border border-navy-750 rounded-lg overflow-hidden m-4"
          />

          {/* Topology HUD overlay */}
          <Panel position="top-left" className="m-4">
            <div className="bg-navy-900/90 backdrop-blur-md border border-navy-750 rounded-xl p-3 shadow-cyber-sm space-y-2 text-xs">
              <div className="flex items-center gap-2 pb-1.5 border-b border-navy-800">
                <span className="font-mono font-bold text-slate-200 text-[11px] uppercase tracking-wider">
                  LIVE TOPOLOGY MAP
                </span>
                {latestAlert && (
                  <span className="font-mono text-[9px] bg-red-950 text-red-400 px-1.5 py-0.2 rounded border border-red-800 flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" /> LIVE
                  </span>
                )}
              </div>

              {transactions.length === 0 ? (
                <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>0 Confirmed Transactions</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Click "Send Live Tx" above to test real-time detection without gas.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Origin Source</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Target Wallet</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Intermediary Hop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>Terminal / VASP</span>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Side Detail Panel on Click */}
      {selectedWallet && (
        <WalletDetailPanel
          wallet={selectedWallet}
          onClose={() => setSelectedWallet(null)}
        />
      )}
    </div>
  );
};
