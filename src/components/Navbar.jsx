import React from 'react';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeSubject, onBackToDashboard, currentStreak = 5 }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFFFFF] border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Breadcrumb */}
        <div className="flex items-center gap-3">
          {activeSubject ? (
            <button
              onClick={onBackToDashboard}
              className="group flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#111827] transition-colors py-1 px-2 -ml-2 rounded"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="font-medium">Quay lại Dashboard</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-[#10B981] flex items-center justify-center text-white">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-semibold tracking-tight text-[#111827]">
                EduMind
              </span>
              <span className="text-xs px-2 py-0.5 rounded border border-[#E5E7EB] text-[#6B7280] font-mono">
                v1.0
              </span>
            </div>
          )}

          {activeSubject && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-[#9CA3AF]">
              <span>/</span>
              <span className="text-[#111827] font-medium truncate max-w-xs">
                {activeSubject.title}
              </span>
            </div>
          )}
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#E5E7EB] bg-[#FAFAFA] text-[#4B5563]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Streak: <strong className="font-mono text-[#111827] font-medium">{currentStreak} ngày</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[#6B7280]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Chế độ tự học tinh gọn</span>
          </div>
        </div>
      </div>
    </header>
  );
}
