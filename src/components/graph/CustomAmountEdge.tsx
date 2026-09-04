import React from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from '@xyflow/react';

export const CustomAmountEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const amount = (data?.amount as string) || '';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: '#3b82f6',
          strokeWidth: 2,
          strokeDasharray: '4 4',
          animation: 'dash 30s linear infinite',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="bg-navy-950/95 border border-blue-500/40 text-blue-300 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold shadow-cyber-sm flex items-center gap-1 z-10"
        >
          <span>{amount}</span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
