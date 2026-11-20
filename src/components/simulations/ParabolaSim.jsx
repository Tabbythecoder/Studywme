import React, { useState } from 'react';
import MathView from '../MathView';

export default function ParabolaSim() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);

  // Parabola calculations: y = ax^2 + bx + c
  const safeA = a === 0 ? 0.01 : a;
  const vertexX = -b / (2 * safeA);
  const delta = b * b - 4 * safeA * c;
  const vertexY = -delta / (4 * safeA);

  // Roots
  let rootsText = '';
  let roots = [];
  if (delta > 0) {
    const x1 = (-b - Math.sqrt(delta)) / (2 * safeA);
    const x2 = (-b + Math.sqrt(delta)) / (2 * safeA);
    roots = [x1, x2];
    rootsText = `x_1 = ${x1.toFixed(2)}, x_2 = ${x2.toFixed(2)}`;
  } else if (delta === 0) {
    const x0 = -b / (2 * safeA);
    roots = [x0];
    rootsText = `Nghiệm kép x_0 = ${x0.toFixed(2)}`;
  } else {
    rootsText = 'Vô nghiệm thực (không cắt trục Ox)';
  }

  // SVG coordinate transformation
  const width = 380;
  const height = 240;
  const scale = 16; // 1 unit = 16px
  const originX = width / 2;
  const originY = height / 2;

  const toSvgX = (x) => originX + x * scale;
  const toSvgY = (y) => originY - y * scale;

  // Generate path data for curve
  const points = [];
  for (let x = -10; x <= 10; x += 0.2) {
    const y = safeA * x * x + b * x + c;
    if (Math.abs(y) <= 15) {
      points.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
    }
  }
  const pathData = points.length > 1 ? `M ${points.join(' L ')}` : '';

  return (
    <div className="rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            Thí nghiệm tương tác
          </span>
          <h4 className="text-xs font-semibold text-[var(--text-primary)]">
            Đồ thị Hàm số bậc hai $y = ax^2 + bx + c$
          </h4>
        </div>
        <div className="font-mono text-[11px] px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)]">
          y = {a}x² {b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`} {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}
        </div>
      </div>

      {/* SVG Coordinate Grid & Curve */}
      <div className="relative border border-[var(--border-subtle)] rounded-[4px] bg-[var(--bg-secondary)] overflow-hidden flex justify-center py-2">
        <svg width={width} height={height} className="overflow-visible select-none">
          {/* Grid lines */}
          {[-8, -6, -4, -2, 2, 4, 6, 8].map((val) => (
            <React.Fragment key={val}>
              <line
                x1={toSvgX(val)}
                y1={0}
                x2={toSvgX(val)}
                y2={height}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1={0}
                y1={toSvgY(val)}
                x2={width}
                y2={toSvgY(val)}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </React.Fragment>
          ))}

          {/* Axes */}
          <line x1={0} y1={originY} x2={width} y2={originY} stroke="var(--text-muted)" strokeWidth="1.2" />
          <line x1={originX} y1={0} x2={originX} y2={height} stroke="var(--text-muted)" strokeWidth="1.2" />
          <text x={width - 14} y={originY - 5} fill="var(--text-muted)" fontSize="10" fontFamily="monospace">x</text>
          <text x={originX + 5} y={12} fill="var(--text-muted)" fontSize="10" fontFamily="monospace">y</text>

          {/* Axis of Symmetry (Dashed line) */}
          {Math.abs(vertexX) <= 10 && (
            <line
              x1={toSvgX(vertexX)}
              y1={0}
              x2={toSvgX(vertexX)}
              y2={height}
              stroke="var(--accent)"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
          )}

          {/* Parabola Curve */}
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Vertex Point */}
          {Math.abs(vertexX) <= 10 && Math.abs(vertexY) <= 10 && (
            <g>
              <circle
                cx={toSvgX(vertexX)}
                cy={toSvgY(vertexY)}
                r="4.5"
                fill="var(--accent)"
                stroke="var(--bg-primary)"
                strokeWidth="1.5"
              />
              <text
                x={toSvgX(vertexX) + 6}
                y={toSvgY(vertexY) - 6}
                fill="var(--text-primary)"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="600"
              >
                I({vertexX.toFixed(1)}; {vertexY.toFixed(1)})
              </text>
            </g>
          )}

          {/* Root points on Ox */}
          {roots.map((r, idx) => (
            Math.abs(r) <= 10 && (
              <circle
                key={idx}
                cx={toSvgX(r)}
                cy={originY}
                r="3"
                fill="var(--text-primary)"
              />
            )
          ))}
        </svg>
      </div>

      {/* Sliders for a, b, c */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span>Hệ số a:</span>
            <span className="font-semibold text-[var(--text-primary)]">{a}</span>
          </div>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.5"
            value={a}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setA(val === 0 ? 0.5 : val);
            }}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span>Hệ số b:</span>
            <span className="font-semibold text-[var(--text-primary)]">{b}</span>
          </div>
          <input
            type="range"
            min="-6"
            max="6"
            step="1"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span>Hệ số c:</span>
            <span className="font-semibold text-[var(--text-primary)]">{c}</span>
          </div>
          <input
            type="range"
            min="-6"
            max="6"
            step="1"
            value={c}
            onChange={(e) => setC(parseFloat(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>
      </div>

      {/* Analytic characteristics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div>
          <span className="text-[var(--text-muted)] block">Tọa độ đỉnh I:</span>
          <span className="font-semibold text-[var(--text-primary)]">({vertexX.toFixed(2)}; {vertexY.toFixed(2)})</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Trục đối xứng:</span>
          <span className="font-semibold text-[var(--text-primary)]">x = {vertexX.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Bề lõm:</span>
          <span className="font-semibold text-[var(--accent)]">{a > 0 ? 'Quay lên (a > 0)' : 'Quay xuống (a < 0)'}</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Giao điểm Ox:</span>
          <span className="font-semibold text-[var(--text-primary)] truncate block" title={rootsText}>{rootsText}</span>
        </div>
      </div>
    </div>
  );
}
