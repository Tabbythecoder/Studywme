import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { getSubjectReadingStats } from '../utils/readingProgress';

const EASING = [0.16, 1, 0.3, 1];

export default function Dashboard({ subjects, onSelectSubject }) {
  const subjectStats = subjects.map((s) => ({
    subject: s,
    ...getSubjectReadingStats(s)
  }));

  const totalLessons = subjects.reduce((acc, s) => acc + s.lessons.length, 0);
  const totalCompleted = subjectStats.reduce((acc, s) => acc + s.completedCount, 0);
  const totalStarted = subjectStats.reduce((acc, s) => acc + s.startedCount, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Banner / Welcome */}
      <div className="pb-6 mb-8 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Chương trình GDPT 2018 chuẩn
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Tổng quan học tập Lớp 10
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-lg leading-relaxed">
            Học tập tinh gọn theo chuẩn Linear & Raycast. Rèn luyện tư duy thực chất qua từng bài học và trợ giảng AI.
          </p>
        </div>

        {/* Global Progress Metric */}
        <div className="flex items-center gap-4 p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] self-start sm:self-auto">
          <div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Tiến độ chung
            </div>
            <div className="text-base font-semibold font-mono text-[var(--text-primary)]">
              {overallPercentage}%
            </div>
          </div>
          <div className="h-6 w-[1px] bg-[var(--border-subtle)]" />
          <div className="text-xs font-mono text-[var(--text-secondary)]">
            <strong className="text-[var(--accent)]">{totalCompleted}</strong> / {totalLessons} bài
          </div>
        </div>
      </div>

      {/* Grid of Grade 10 Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectStats.map(({ subject: sub, completedCount, overallProgress, startedCount }) => {
          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className="group p-5 rounded-[6px] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] bg-[var(--bg-secondary)] cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-muted)]">
                    {sub.code}
                  </span>
                  <span className="text-xs font-mono text-[var(--accent)] font-medium">
                    {overallProgress}%
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {sub.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                  {sub.description}
                </p>

                {/* Ultra-thin 2px progress bar - ONLY shown if user has started studying this subject */}
                {startedCount > 0 ? (
                  <div className="mt-5">
                    <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)] mb-1.5">
                      <span>{completedCount} / {sub.lessons.length} bài hoàn thành</span>
                      <span className="text-[var(--accent)]">{overallProgress}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 pt-2 text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-subtle)]" />
                    <span>Chưa bắt đầu học • {sub.lessons.length} chuyên đề chuẩn GDPT</span>
                  </div>
                )}
              </div>

              {/* Action row */}
              <div className="mt-5 pt-3.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  {sub.lessons.length} bài học
                </span>

                <div className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
