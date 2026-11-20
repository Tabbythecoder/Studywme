import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export default function ProjectileSim() {
  const [v0, setV0] = useState(20); // m/s
  const [angleDeg, setAngleDeg] = useState(0); // 0 = ném ngang, >0 = ném xiên
  const [h0, setH0] = useState(15); // initial height in meters
  const [animTime, setAnimTime] = useState(0);
  const [isFiring, setIsFiring] = useState(false);
  const animRef = useRef(null);

  const g = 9.8;
  const rad = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(rad);
  const vy0 = v0 * Math.sin(rad);

  // Total flight time: solve y(t) = h0 + vy0*t - 0.5*g*t^2 = 0
  // 0.5*g*t^2 - vy0*t - h0 = 0
  const delta = vy0 * vy0 + 2 * g * h0;
  const tTotal = (vy0 + Math.sqrt(delta)) / g;
  const rangeX = vx * tTotal;
  const maxH = h0 + (vy0 > 0 ? (vy0 * vy0) / (2 * g) : 0);

  // Canvas / SVG coordinate mapping
  const width = 380;
  const height = 240;
  const groundY = height - 30;
  const originX = 40;
  const scale = 5.2; // 1 meter = 5.2px

  const toSvgX = (x) => originX + x * scale;
  const toSvgY = (y) => groundY - y * scale;

  // Animation loop
  useEffect(() => {
    if (isFiring) {
      const startTime = performance.now();
      const loop = (now) => {
        const elapsed = (now - startTime) / 1000;
        if (elapsed >= tTotal) {
          setAnimTime(tTotal);
          setIsFiring(false);
        } else {
          setAnimTime(elapsed);
          animRef.current = requestAnimationFrame(loop);
        }
      };
      animRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animRef.current);
    }
  }, [isFiring, tTotal]);

  const handleFire = () => {
    setAnimTime(0);
    setIsFiring(true);
  };

  const handleReset = () => {
    setIsFiring(false);
    cancelAnimationFrame(animRef.current);
    setAnimTime(0);
  };

  // Trajectory path (up to current animTime or full if not firing)
  const previewPoints = [];
  const dt = tTotal / 50;
  const maxPlotT = isFiring || animTime > 0 ? animTime : tTotal;

  for (let t = 0; t <= maxPlotT; t += dt) {
    const x = vx * t;
    const y = Math.max(0, h0 + vy0 * t - 0.5 * g * t * t);
    previewPoints.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
  }
  const trajectoryPath = previewPoints.length > 1 ? `M ${previewPoints.join(' L ')}` : '';

  // Current projectile coordinates
  const currX = vx * (isFiring ? animTime : 0);
  const currY = Math.max(0, h0 + vy0 * (isFiring ? animTime : 0) - 0.5 * g * (isFiring ? animTime : 0) ** 2);

  return (
    <div className="rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            Thí nghiệm tương tác Vật lí
          </span>
          <h4 className="text-xs font-semibold text-[var(--text-primary)]">
            Mô phỏng Quỹ đạo Chuyển động ném ngang & ném xiên
          </h4>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleFire}
            disabled={isFiring}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[var(--accent)] text-white text-xs font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            <Play className="w-3 h-3" />
            <span>{isFiring ? 'Đang bay...' : 'Bắn'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs"
            title="Đặt lại"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Trajectory Canvas */}
      <div className="relative border border-[var(--border-subtle)] rounded-[4px] bg-[var(--bg-secondary)] overflow-hidden flex justify-center py-2">
        <svg width={width} height={height} className="overflow-visible select-none">
          {/* Ground surface */}
          <line x1={0} y1={groundY} x2={width} y2={groundY} stroke="var(--text-muted)" strokeWidth="1.5" />
          <text x={width - 24} y={groundY + 16} fill="var(--text-muted)" fontSize="10" fontFamily="monospace">Mặt đất</text>

          {/* Launch platform tower */}
          {h0 > 0 && (
            <rect
              x={originX - 10}
              y={toSvgY(h0)}
              width="10"
              height={groundY - toSvgY(h0)}
              fill="var(--bg-tertiary)"
              stroke="var(--border-subtle)"
            />
          )}

          {/* Full static trajectory dashed curve */}
          {rangeX > 0 && (
            <path
              d={(() => {
                const pts = [];
                for (let t = 0; t <= tTotal; t += dt) {
                  const x = vx * t;
                  const y = Math.max(0, h0 + vy0 * t - 0.5 * g * t * t);
                  pts.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
                }
                return `M ${pts.join(' L ')}`;
              })()}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="1.2"
              strokeDasharray="3,3"
            />
          )}

          {/* Animated active trajectory */}
          {trajectoryPath && (
            <path
              d={trajectoryPath}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          )}

          {/* Projectile (Ball) */}
          <circle
            cx={toSvgX(currX)}
            cy={toSvgY(currY)}
            r="5"
            fill="var(--accent)"
            stroke="var(--bg-primary)"
            strokeWidth="1.5"
          />

          {/* Landing distance marker */}
          <circle cx={toSvgX(rangeX)} cy={groundY} r="3" fill="#F59E0B" />
          <text
            x={toSvgX(rangeX) - 15}
            y={groundY + 16}
            fill="#F59E0B"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            L = {rangeX.toFixed(1)}m
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span>Vận tốc đầu v₀:</span>
            <span className="font-semibold text-[var(--accent)]">{v0} m/s</span>
          </div>
          <input
            type="range"
            min="5"
            max="35"
            step="1"
            value={v0}
            onChange={(e) => setV0(parseFloat(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span>Góc ném α:</span>
            <span className="font-semibold text-[var(--text-primary)]">{angleDeg}° {angleDeg === 0 ? '(Ném ngang)' : ''}</span>
          </div>
          <input
            type="range"
            min="0"
            max="75"
            step="5"
            value={angleDeg}
            onChange={(e) => setAngleDeg(parseFloat(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between font-mono text-[11px] text-[var(--text-secondary)]">
            <span>Độ cao h₀:</span>
            <span className="font-semibold text-[var(--text-primary)]">{h0} m</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            step="1"
            value={h0}
            onChange={(e) => setH0(parseFloat(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
        </div>
      </div>

      {/* Physics Metrics Results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
        <div>
          <span className="text-[var(--text-muted)] block">Thời gian rơi:</span>
          <span className="font-semibold text-[var(--text-primary)]">t = {tTotal.toFixed(2)} s</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Tầm xa L:</span>
          <span className="font-semibold text-[#F59E0B]">L = {rangeX.toFixed(2)} m</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Độ cao cực đại:</span>
          <span className="font-semibold text-[var(--accent)]">H_max = {maxH.toFixed(2)} m</span>
        </div>
        <div>
          <span className="text-[var(--text-muted)] block">Tọa độ thời gian thực:</span>
          <span className="font-semibold text-[var(--text-primary)]">({currX.toFixed(1)}m; {currY.toFixed(1)}m)</span>
        </div>
      </div>
    </div>
  );
}
