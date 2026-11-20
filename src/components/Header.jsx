import React from 'react';
import { Sun, Moon, Bot, Sparkles } from 'lucide-react';

export default function Header({ isDark, onToggleTheme, onOpenAITutor }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
        {/* Brand: Studywme */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-base font-semibold tracking-tight text-[var(--text-primary)] select-none">
              Studywme
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-muted)] bg-[var(--bg-primary)]">
            Lớp 10
          </span>
        </div>

        {/* Right actions: Light/Dark toggle & AI Tutor Quick trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAITutor()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] text-[var(--text-secondary)] transition-all"
            title="Mở Trợ giảng AI (Phím tắt: Alt+A)"
          >
            <Bot className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            title={isDark ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
