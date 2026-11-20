import React, { useState } from 'react';

// Elements from Z = 1 to 20
const ELEMENTS = [
  { z: 1, sym: 'H', name: 'Hydrogen', type: 'Phi kim', shells: [1] },
  { z: 2, sym: 'He', name: 'Helium', type: 'Khí hiếm', shells: [2] },
  { z: 3, sym: 'Li', name: 'Lithium', type: 'Kim loại', shells: [2, 1] },
  { z: 4, sym: 'Be', name: 'Beryllium', type: 'Kim loại', shells: [2, 2] },
  { z: 5, sym: 'B', name: 'Boron', type: 'Á kim', shells: [2, 3] },
  { z: 6, sym: 'C', name: 'Carbon', type: 'Phi kim', shells: [2, 4] },
  { z: 7, sym: 'N', name: 'Nitrogen', type: 'Phi kim', shells: [2, 5] },
  { z: 8, sym: 'O', name: 'Oxygen', type: 'Phi kim', shells: [2, 6] },
  { z: 9, sym: 'F', name: 'Fluorine', type: 'Phi kim (Halogen)', shells: [2, 7] },
  { z: 10, sym: 'Ne', name: 'Neon', type: 'Khí hiếm', shells: [2, 8] },
  { z: 11, sym: 'Na', name: 'Sodium', type: 'Kim loại kiềm', shells: [2, 8, 1] },
  { z: 12, sym: 'Mg', name: 'Magnesium', type: 'Kim loại kiềm thổ', shells: [2, 8, 2] },
  { z: 13, sym: 'Al', name: 'Aluminium', type: 'Kim loại', shells: [2, 8, 3] },
  { z: 14, sym: 'Si', name: 'Silicon', type: 'Á kim', shells: [2, 8, 4] },
  { z: 15, sym: 'P', name: 'Phosphorus', type: 'Phi kim', shells: [2, 8, 5] },
  { z: 16, sym: 'S', name: 'Sulfur', type: 'Phi kim', shells: [2, 8, 6] },
  { z: 17, sym: 'Cl', name: 'Chlorine', type: 'Phi kim (Halogen)', shells: [2, 8, 7] },
  { z: 18, sym: 'Ar', name: 'Argon', type: 'Khí hiếm', shells: [2, 8, 8] },
  { z: 19, sym: 'K', name: 'Potassium', type: 'Kim loại kiềm', shells: [2, 8, 8, 1] },
  { z: 20, sym: 'Ca', name: 'Calcium', type: 'Kim loại kiềm thổ', shells: [2, 8, 8, 2] }
];

export default function BohrAtomSim() {
  const [selectedZ, setSelectedZ] = useState(11); // default Na (Sodium)

  const elem = ELEMENTS.find((e) => e.z === selectedZ) || ELEMENTS[10];
  const valenceElectrons = elem.shells[elem.shells.length - 1];

  let bondingTendency = '';
  if (elem.type.includes('Khí hiếm')) {
    bondingTendency = 'Cấu hình bền vững (Quy tắc Octet / Duet), trơ về mặt hóa học.';
  } else if (elem.type.includes('Kim loại')) {
    bondingTendency = `Xu hướng nhường ${valenceElectrons} electron hóa trị để tạo Cation ${elem.sym}^${valenceElectrons > 1 ? valenceElectrons + '+' : '+'}.`;
  } else if (elem.type.includes('Phi kim')) {
    const need = 8 - valenceElectrons;
    bondingTendency = `Xu hướng nhận ${need} electron tạo Anion ${elem.sym}^${need > 1 ? need + '-' : '-'} hoặc góp chung electron.`;
  } else {
    bondingTendency = 'Xu hướng góp chung electron tạo liên kết cộng hóa trị phân cực.';
  }

  // SVG Geometry
  const size = 260;
  const center = size / 2;
  const shellRadii = [32, 54, 76, 98]; // K, L, M, N shell radius
  const shellNames = ['K', 'L', 'M', 'N'];

  return (
    <div className="rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            Mô hình tương tác Hóa học
          </span>
          <h4 className="text-xs font-semibold text-[var(--text-primary)]">
            Mô hình hành tinh nguyên tử Bohr & Cấu hình Electron
          </h4>
        </div>
        <div className="font-mono text-xs px-2.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent)] font-bold">
          {elem.sym} (Z = {elem.z})
        </div>
      </div>

      {/* Main visualization container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Atom Bohr Diagram */}
        <div className="md:col-span-7 flex justify-center py-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[4px]">
          <svg width={size} height={size} className="overflow-visible select-none">
            {/* Electron Shell Rings */}
            {elem.shells.map((eCount, sIdx) => {
              const r = shellRadii[sIdx];
              return (
                <g key={sIdx}>
                  <circle
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke="var(--border-subtle)"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                  />
                  <text
                    x={center + r - 8}
                    y={center - 4}
                    fill="var(--text-muted)"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {shellNames[sIdx]}
                  </text>

                  {/* Electron dots spaced evenly */}
                  {Array.from({ length: eCount }).map((_, eIdx) => {
                    const angle = (2 * Math.PI * eIdx) / eCount;
                    const ex = center + r * Math.cos(angle);
                    const ey = center + r * Math.sin(angle);
                    const isValence = sIdx === elem.shells.length - 1;

                    return (
                      <circle
                        key={eIdx}
                        cx={ex}
                        cy={ey}
                        r="3.5"
                        fill={isValence ? 'var(--accent)' : 'var(--text-secondary)'}
                        stroke="var(--bg-primary)"
                        strokeWidth="1"
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Nucleus */}
            <circle
              cx={center}
              cy={center}
              r="18"
              fill="var(--bg-primary)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={center}
              y={center + 4}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              +{elem.z}
            </text>
          </svg>
        </div>

        {/* Element details */}
        <div className="md:col-span-5 space-y-3 text-xs">
          <div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Nguyên tố</div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {elem.name} ({elem.sym})
            </div>
            <div className="text-[11px] font-mono text-[var(--accent)] mt-0.5">
              Phân loại: {elem.type}
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-[var(--border-subtle)] font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Số hiệu (Z):</span>
              <span className="text-[var(--text-primary)] font-semibold">{elem.z}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Phân bố lớp:</span>
              <span className="text-[var(--text-primary)] font-semibold">{elem.shells.join(' - ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">e ngoài cùng:</span>
              <span className="text-[var(--accent)] font-bold">{valenceElectrons}e</span>
            </div>
          </div>

          <div className="p-2.5 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[11px] text-[var(--text-secondary)] leading-relaxed">
            <strong className="text-[var(--text-primary)]">Quy tắc liên kết: </strong>
            {bondingTendency}
          </div>
        </div>
      </div>

      {/* Element Selector Bar (Z=1 to 20) */}
      <div className="pt-2 border-t border-[var(--border-subtle)]">
        <div className="text-[10px] font-mono text-[var(--text-muted)] mb-1.5 uppercase">
          Chọn nguyên tố (Z = 1 → 20):
        </div>
        <div className="flex flex-wrap gap-1">
          {ELEMENTS.map((el) => {
            const isSelected = el.z === selectedZ;
            return (
              <button
                key={el.z}
                onClick={() => setSelectedZ(el.z)}
                className={`px-2 py-1 text-[11px] font-mono rounded-[3px] border transition-colors ${
                  isSelected
                    ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)] font-bold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] text-[var(--text-secondary)]'
                }`}
              >
                {el.sym}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
