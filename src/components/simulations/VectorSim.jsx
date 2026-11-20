import React, { useState } from 'react';

export default function VectorSim() {
  const [uX, setUX] = useState(4);
  const [uY, setUY] = useState(2);
  const [vX, setVX] = useState(1);
  const [vY, setVY] = useState(4);

  // Vector additions
  const sumX = uX + vX;
  const sumY = uY + vY;

  const lenU = Math.sqrt(uX * uX + uY * uY);
  const lenV = Math.sqrt(vX * vX + vY * vY);
  const lenSum = Math.sqrt(sumX * sumX + sumY * sumY);
  const dotProduct = uX * vX + uY * vY;

  // SVG coordinate transformation
  const width = 380;
  const height = 240;
  const scale = 18;
  const originX = 60;
  const originY = height - 40;

  const toSvgX = (x) => originX + x * scale;
  const toSvgY = (y) => originY - y * scale;

  return (
    <div className="rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            Thí nghiệm tương tác
          </span>
          <h4 className="text-xs font-semibold text-[var(--text-primary)]">
            Phép cộng Vectơ & Quy tắc Hình bình hành
          </h4>
        </div>
        <div className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)]">
          u⃗ + v⃗ = ({sumX}; {sumY})
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative border border-[var(--border-subtle)] rounded-[4px] bg-[var(--bg-secondary)] overflow-hidden flex justify-center py-2">
        <svg width={width} height={height} className="overflow-visible select-none">
          <defs>
            <marker id="arrow-u" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" />
            </marker>
            <marker id="arrow-v" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#38BDF8" />
            </marker>
            <marker id="arrow-sum" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#F59E0B" />
            </marker>
          </defs>

          {/* Grid lines */}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((val) => (
            <React.Fragment key={val}>
              <line
                x1={toSvgX(val)}
                y1={20}
                x2={toSvgX(val)}
                y2={originY}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1={originX}
                y1={toSvgY(val)}
                x2={width - 20}
                y2={toSvgY(val)}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </React.Fragment>
          ))}

          {/* Axes */}
          <line x1={originX - 10} y1={originY} x2={width - 10} y2={originY} stroke="var(--text-muted)" strokeWidth="1.2" />
          <line x1={originX} y1={originY + 10} x2={originX} y2={15} stroke="var(--text-muted)" strokeWidth="1.2" />
          <text x={width - 8} y={originY - 5} fill="var(--text-muted)" fontSize="10" fontFamily="monospace">x</text>
          <text x={originX + 5} y={15} fill="var(--text-muted)" fontSize="10" fontFamily="monospace">y</text>
          <text x={originX - 12} y={originY + 14} fill="var(--text-muted)" fontSize="10" fontFamily="monospace">O</text>

          {/* Parallelogram dashed helpers */}
          <line
            x1={toSvgX(uX)}
            y1={toSvgY(uY)}
            x2={toSvgX(sumX)}
            y2={toSvgY(sumY)}
            stroke="#38BDF8"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.6"
          />
          <line
            x1={toSvgX(vX)}
            y1={toSvgY(vY)}
            x2={toSvgX(sumX)}
            y2={toSvgY(sumY)}
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.6"
          />

          {/* Vector u */}
          <line
            x1={originX}
            y1={originY}
            x2={toSvgX(uX)}
            y2={toSvgY(uY)}
            stroke="var(--accent)"
            strokeWidth="2.2"
            markerEnd="url(#arrow-u)"
          />
          <text
            x={toSvgX(uX / 2) + 5}
            y={toSvgY(uY / 2) + 12}
            fill="var(--accent)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            u⃗({uX}; {uY})
          </text>

          {/* Vector v */}
          <line
            x1={originX}
            y1={originY}
            x2={toSvgX(vX)}
            y2={toSvgY(vY)}
            stroke="#38BDF8"
            strokeWidth="2.2"
            markerEnd="url(#arrow-v)"
          />
          <text
            x={toSvgX(vX / 2) - 15}
            y={toSvgY(vY / 2) - 6}
            fill="#38BDF8"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            v⃗({vX}; {vY})
          </text>

          {/* Vector Sum: u + v */}
          <line
            x1={originX}
            y1={originY}
            x2={toSvgX(sumX)}
            y2={toSvgY(sumY)}
            stroke="#F59E0B"
            strokeWidth="2.5"
            markerEnd="url(#arrow-sum)"
          />
          <text
            x={toSvgX(sumX) + 5}
            y={toSvgY(sumY) - 5}
            fill="#F59E0B"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
          >
            (u⃗+v⃗)
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--accent)] font-medium">
            <span>u_x:</span>
            <span>{uX}</span>
          </div>
          <input
            type="range"
            min="1"
            max="7"
            step="1"
            value={uX}
            onChange={(e) => setUX(parseInt(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--accent)] font-medium">
            <span>u_y:</span>
            <span>{uY}</span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            value={uY}
            onChange={(e) => setUY(parseInt(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[#38BDF8] font-medium">
            <span>v_x:</span>
            <span>{vX}</span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            value={vX}
            onChange={(e) => setVX(parseInt(e.target.value))}
            className="w-full accent-[#38BDF8] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[#38BDF8] font-medium">
            <span>v_y:</span>
            <span>{vY}</span>
          </div>
          <input
            type="range"
            min="1"
            max="7"
            step="1"
            value={vY}
            onChange={(e) => setVY(parseInt(e.target.value))}
            className="w-full accent-[#38BDF8] cursor-pointer"
          />
        </div>
      </div>

      {/* Numerical Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div>
          <span className="text-[var(--text-muted)] block">Độ dài |u⃗|:</span>
          <span className="font-semibold text-[var(--accent)]">{lenU.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Độ dài |v⃗|:</span>
          <span className="font-semibold text-[#38BDF8]">{lenV.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Độ dài |u⃗ + v⃗|:</span>
          <span className="font-semibold text-[#F59E0B]">{lenSum.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Tích vô hướng u⃗·v⃗:</span>
          <span className="font-semibold text-[var(--text-primary)]">{dotProduct}</span>
        </div>
      </div>
    </div>
  );
}
