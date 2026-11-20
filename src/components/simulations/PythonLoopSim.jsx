import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

const NUMBERS = [3, 7, 2, 9, 5];

export default function PythonLoopSim() {
  const [step, setStep] = useState(0); // 0 = start, 1..5 = loop steps, 6 = finished
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  // Trace steps
  // step 0: init: total = 0
  // step 1: i=0, num=3, total=3
  // step 2: i=1, num=7, total=10
  // step 3: i=2, num=2, total=12
  // step 4: i=3, num=9, total=21
  // step 5: i=4, num=5, total=26
  // step 6: finished: total = 26

  let currentI = null;
  let currentNum = null;
  let currentTotal = 0;
  let stepExplanation = '';

  if (step === 0) {
    currentTotal = 0;
    stepExplanation = 'Khởi tạo biến total = 0. Chuẩn bị duyệt qua từng phần tử của danh sách numbers.';
  } else if (step >= 1 && step <= NUMBERS.length) {
    currentI = step - 1;
    currentNum = NUMBERS[currentI];
    currentTotal = NUMBERS.slice(0, step).reduce((a, b) => a + b, 0);
    const prevTotal = NUMBERS.slice(0, step - 1).reduce((a, b) => a + b, 0);
    stepExplanation = `Bước lặp ${step}: Lấy phần tử numbers[${currentI}] = ${currentNum}. Cộng dồn: total = ${prevTotal} + ${currentNum} = ${currentTotal}.`;
  } else {
    currentTotal = NUMBERS.reduce((a, b) => a + b, 0);
    stepExplanation = `Hoàn thành vòng lặp! Đã duyệt hết ${NUMBERS.length} phần tử. Giá trị tổng cuối cùng: total = ${currentTotal}.`;
  }

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStep((prev) => {
          if (prev >= NUMBERS.length) {
            setIsPlaying(false);
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1200);
      return () => clearInterval(timerRef.current);
    }
  }, [isPlaying]);

  const handleNextStep = () => {
    setIsPlaying(false);
    if (step < NUMBERS.length + 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    setStep(0);
  };

  return (
    <div className="rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            Mô phỏng thuật toán Tin học 10
          </span>
          <h4 className="text-xs font-semibold text-[var(--text-primary)]">
            Trực quan hóa Vòng lặp For & Mảng List trong Python
          </h4>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            disabled={step > NUMBERS.length}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[var(--accent)] text-white text-xs font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? 'Tạm dừng' : 'Chạy tự động'}</span>
          </button>
          <button
            onClick={handleNextStep}
            disabled={step > NUMBERS.length || isPlaying}
            className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs hover:border-[var(--border-hover)] disabled:opacity-40"
            title="Bước tiếp theo"
          >
            <SkipForward className="w-3 h-3" />
            <span className="hidden sm:inline">Từng bước</span>
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

      {/* Code Snippet with active highlight line */}
      <div className="p-3 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] font-mono text-xs overflow-x-auto space-y-1">
        <div className="text-[var(--text-muted)]"># Thuật toán tính tổng danh sách</div>
        <div><span className="text-[var(--accent)]">numbers</span> = [3, 7, 2, 9, 5]</div>
        <div className={step === 0 ? 'bg-[var(--accent-light)] px-1 rounded font-bold text-[var(--accent)]' : ''}>
          <span className="text-amber-500">total</span> = 0
        </div>
        <div className={step >= 1 && step <= 5 ? 'bg-[var(--accent-light)] px-1 rounded font-bold text-[var(--accent)]' : ''}>
          <span className="text-purple-400">for</span> i, num <span className="text-purple-400">in</span> enumerate(numbers):
        </div>
        <div className={`pl-4 ${step >= 1 && step <= 5 ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-muted)]'}`}>
          total += num
        </div>
      </div>

      {/* Visual Memory Array cells */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
          Trạng thái bộ nhớ danh sách `numbers`:
        </div>
        <div className="grid grid-cols-5 gap-2">
          {NUMBERS.map((val, idx) => {
            const isCurrent = currentI === idx;
            const isProcessed = currentI !== null && idx < currentI;

            return (
              <div
                key={idx}
                className={`p-3 rounded-[4px] border text-center transition-all ${
                  isCurrent
                    ? 'border-[var(--accent)] bg-[var(--accent-light)] shadow-sm scale-102'
                    : isProcessed
                      ? 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] opacity-80'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] opacity-50'
                }`}
              >
                <div className="text-[10px] font-mono text-[var(--text-muted)] mb-1">
                  index [{idx}]
                </div>
                <div className="text-base font-mono font-bold text-[var(--text-primary)]">
                  {val}
                </div>
                {isCurrent && (
                  <div className="mt-1 text-[10px] font-mono text-[var(--accent)] font-semibold">
                    ▲ đang đọc
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Variable Inspector & Explanation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[var(--border-subtle)] text-xs font-mono">
        <div className="p-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <span className="text-[var(--text-muted)] text-[10px] block">Biến con trỏ `i`:</span>
          <span className="text-sm font-bold text-[var(--text-primary)]">
            {currentI !== null ? currentI : 'Chưa gán'}
          </span>
        </div>
        <div className="p-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <span className="text-[var(--text-muted)] text-[10px] block">Phần tử hiện tại `num`:</span>
          <span className="text-sm font-bold text-[var(--accent)]">
            {currentNum !== null ? currentNum : 'Chưa gán'}
          </span>
        </div>
        <div className="p-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <span className="text-[var(--text-muted)] text-[10px] block">Biến tổng `total`:</span>
          <span className="text-sm font-bold text-amber-500">
            {currentTotal}
          </span>
        </div>
      </div>

      {/* Step explanation banner */}
      <div className="p-2.5 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[11px] text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">Diễn giải từng bước: </strong>
        {stepExplanation}
      </div>
    </div>
  );
}
