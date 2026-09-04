import React, { useEffect, useRef } from 'react';

export const BlockchainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node particles representing blockchain ledger entities
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: 'normal' | 'hub' | 'alert';
    }

    const nodes: Node[] = [];
    const nodeCount = Math.min(Math.floor(width / 24), 45);

    for (let i = 0; i < nodeCount; i++) {
      const isHub = i % 8 === 0;
      const isAlert = i % 12 === 0;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isHub ? 3.5 : isAlert ? 3 : 2,
        type: isAlert ? 'alert' : isHub ? 'hub' : 'normal',
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.type === 'alert') {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
        } else if (node.type === 'hub') {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        } else {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-45"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
