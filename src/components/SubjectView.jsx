import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, CheckCircle2, CircleDashed, CircleDot, Play } from 'lucide-react';
import { getLessonProgress, getSubjectReadingStats } from '../utils/readingProgress';

const EASING = [0.16, 1, 0.3, 1];

export default function SubjectView({ subject, onSelectLesson }) {
  const { completedCount, overallProgress, startedCount } = getSubjectReadingStats(subject);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Subject Header */}
      <div className="pb-6 mb-6 border-b border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-muted)]">
              {subject.code}
            </span>
            <span className="text-xs text-[var(--text-muted)]">Chương trình GDPT 2018</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {subject.title}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
            {subject.description}
          </p>
        </div>

        {/* Progress summary badge */}
        <div className="flex items-center gap-4 p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] self-start sm:self-auto">
          <div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Tiến độ môn học
            </div>
            <div className="text-base font-semibold font-mono text-[var(--text-primary)]">
              {overallProgress}%
            </div>
          </div>
          <div className="h-6 w-[1px] bg-[var(--border-subtle)]" />
          <div className="text-xs font-mono text-[var(--text-secondary)]">
            <strong className="text-[var(--accent)]">{completedCount}</strong> / {subject.lessons.length} bài
          </div>
        </div>
      </div>

      {/* Flat Minimalist Table / List */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[6px] overflow-hidden transition-colors">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-4 py-2.5 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-6 sm:col-span-7">Tên bài học</div>
          <div className="col-span-3 sm:col-span-2">Trạng thái</div>
          <div className="col-span-2 text-right">Thời lượng</div>
        </div>

        {/* Lessons rows */}
        <div className="divide-y divide-[var(--border-subtle)]">
          {subject.lessons.map((lesson, idx) => {
            const progress = getLessonProgress(lesson.id);
            const isCompleted = progress >= 90;
            const isStudying = progress > 0 && progress < 90;

            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className="group grid grid-cols-12 px-4 py-3.5 items-center hover:bg-[var(--bg-tertiary)] cursor-pointer transition-colors text-xs"
              >
                {/* Index */}
                <div className="col-span-1 font-mono text-[var(--text-muted)]">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>

                {/* Lesson Title & Summary */}
                <div className="col-span-6 sm:col-span-7 pr-4">
                  <div className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1.5">
                    <span>{lesson.title}</span>
                    {lesson.simulation && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border border-[var(--accent-border)] text-[var(--accent)] bg-[var(--accent-light)]">
                        Mô hình
                      </span>
                    )}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate hidden sm:block">
                    {lesson.summary}
                  </div>

                  {/* Ultra-thin 2px progress bar - ONLY shown if user has started reading (> 0%) */}
                  {progress > 0 && (
                    <div className="mt-2 h-[2px] w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Status chip */}
                <div className="col-span-3 sm:col-span-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[10px] font-mono border ${
                    isCompleted
                      ? 'border-[var(--accent-border)] bg-[var(--accent-light)] text-[var(--accent)]'
                      : isStudying
                        ? 'border-amber-500/25 bg-amber-500/10 text-amber-500'
                        : 'border-[var(--border-subtle)] text-[var(--text-muted)] bg-[var(--bg-primary)]'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : isStudying ? (
                      <CircleDot className="w-2.5 h-2.5" />
                    ) : (
                      <CircleDashed className="w-2.5 h-2.5" />
                    )}
                    <span>
                      {isCompleted ? 'Hoàn thành' : isStudying ? `Đang học (${progress}%)` : 'Chưa học'}
                    </span>
                  </span>
                </div>

                {/* Read time */}
                <div className="col-span-2 text-right font-mono text-[11px] text-[var(--text-muted)]">
                  {lesson.readTime}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
