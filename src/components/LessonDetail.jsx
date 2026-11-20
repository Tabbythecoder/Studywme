import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Bot, ArrowLeft, Clock, BookOpen, RotateCcw } from 'lucide-react';
import MathView from './MathView';

const EASING = [0.16, 1, 0.3, 1];

export default function LessonDetail({ subject, lesson, onBack, onOpenAITutorWithContext }) {
  const [answers, setAnswers] = useState({});
  const [submissions, setSubmissions] = useState({});

  const handleSelectOption = (exerciseId, optionId) => {
    if (submissions[exerciseId]) return;
    setAnswers((prev) => ({ ...prev, [exerciseId]: optionId }));
  };

  const handleSubmit = (exercise) => {
    const chosen = answers[exercise.id];
    if (!chosen) return;

    const isCorrect = exercise.options.find((o) => o.id === chosen)?.isCorrect || false;
    setSubmissions((prev) => ({
      ...prev,
      [exercise.id]: {
        chosen,
        isCorrect
      }
    }));
  };

  const handleReset = (exerciseId) => {
    setAnswers((prev) => ({ ...prev, [exerciseId]: null }));
    setSubmissions((prev) => ({ ...prev, [exerciseId]: null }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-subtle)]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh sách {subject.title}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
          <Clock className="w-3.5 h-3.5" />
          <span>{lesson.readTime}</span>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-muted)]">
            {subject.code}
          </span>
          <span className="text-xs text-[var(--text-muted)]">/</span>
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
            lesson.status === 'Hoàn thành'
              ? 'border-[var(--accent-border)] bg-[var(--accent-light)] text-[var(--accent)]'
              : lesson.status === 'Đang học'
                ? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
                : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
          }`}>
            {lesson.status}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          {lesson.title}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed max-w-2xl">
          {lesson.summary}
        </p>
      </div>

      {/* Main Grid: Theory (Left) & Exercises (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Theory & KaTeX formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[6px] p-6 transition-colors">
            <div className="flex items-center gap-2 pb-3 mb-5 border-b border-[var(--border-subtle)]">
              <BookOpen className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Lý thuyết cốt lõi Lớp 10
              </span>
            </div>

            <div className="space-y-6">
              {lesson.theory.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  {item.heading && (
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.heading}
                    </h3>
                  )}

                  {item.text && (
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {item.text.split(/(\$[^$]+\$)/g).map((part, pIdx) => {
                        if (part.startsWith('$') && part.endsWith('$')) {
                          return <MathView key={pIdx} math={part.slice(1, -1)} />;
                        }
                        return part;
                      })}
                    </p>
                  )}

                  {item.math && (
                    <div className="my-2.5 p-3 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-center overflow-x-auto">
                      <MathView math={item.math} block={true} />
                    </div>
                  )}

                  {item.code && (
                    <div className="my-2.5 p-3 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] font-mono text-xs overflow-x-auto">
                      <pre className="text-[var(--text-primary)] leading-relaxed">{item.code}</pre>
                    </div>
                  )}

                  {item.note && (
                    <p className="text-[11px] text-[var(--text-muted)] italic">
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Practice & Questions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[6px] p-5 transition-colors">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                Luyện tập tương tác
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                {lesson.exercises.length} câu hỏi
              </span>
            </div>

            {lesson.exercises.map((ex) => {
              const selected = answers[ex.id];
              const submission = submissions[ex.id];
              const isWrong = submission && !submission.isCorrect;
              const isCorrect = submission && submission.isCorrect;

              return (
                <div key={ex.id} className="space-y-4">
                  {/* Question */}
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">
                      {ex.question}
                    </p>
                    {ex.questionMath && (
                      <div className="my-2 p-2 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-center">
                        <MathView math={ex.questionMath} block={true} />
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {ex.options.map((opt) => {
                      const isOptionSelected = selected === opt.id;
                      let optionClasses = "w-full p-2.5 rounded-[4px] border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ";

                      if (!submission) {
                        optionClasses += isOptionSelected
                          ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--text-primary)]"
                          : "border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--border-hover)] text-[var(--text-secondary)]";
                      } else {
                        if (opt.isCorrect) {
                          optionClasses += "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--text-primary)]";
                        } else if (isOptionSelected && !opt.isCorrect) {
                          optionClasses += "border-[var(--error-border)] bg-[var(--error-bg)] text-[var(--text-primary)]";
                        } else {
                          optionClasses += "border-[var(--border-subtle)] bg-[var(--bg-primary)] opacity-40 text-[var(--text-muted)]";
                        }
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectOption(ex.id, opt.id)}
                          className={optionClasses}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] w-5 h-5 rounded-[3px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center font-medium">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          {submission && opt.isCorrect && (
                            <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                          )}
                          {submission && isOptionSelected && !opt.isCorrect && (
                            <X className="w-3.5 h-3.5 text-[var(--error)]" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit / Reset Actions & AI Tutor Trigger on Error */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    {!submission ? (
                      <button
                        onClick={() => handleSubmit(ex)}
                        disabled={!selected}
                        className="px-3 py-1.5 rounded-[4px] text-xs font-medium bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
                      >
                        Kiểm tra kết quả
                      </button>
                    ) : (
                      <div className="w-full space-y-3">
                        {isCorrect ? (
                          <div className="p-2.5 rounded-[4px] border border-[var(--accent-border)] bg-[var(--accent-light)] text-xs text-[var(--accent)] flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Check className="w-3.5 h-3.5" />
                              Chính xác! Bạn đã nắm vững kiến thức.
                            </span>
                            <button
                              onClick={() => handleReset(ex.id)}
                              className="text-[11px] underline opacity-80 hover:opacity-100"
                            >
                              Làm lại
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-[4px] border border-[var(--error-border)] bg-[var(--error-bg)] space-y-2">
                            <div className="flex items-center justify-between text-xs text-[var(--error)] font-medium">
                              <span className="flex items-center gap-1.5">
                                <X className="w-3.5 h-3.5" />
                                Chưa chính xác
                              </span>
                              <button
                                onClick={() => handleReset(ex.id)}
                                className="text-[11px] underline opacity-80 hover:opacity-100 text-[var(--text-secondary)]"
                              >
                                Làm lại
                              </button>
                            </div>

                            {/* Requirement 4: Nút "Hỏi AI Tutor" khi làm sai */}
                            <button
                              onClick={() =>
                                onOpenAITutorWithContext({
                                  subject: subject.title,
                                  lesson: lesson.title,
                                  question: ex.question,
                                  userWrongAnswer: selected,
                                  correctAnswer: ex.correctAnswer,
                                  explanation: ex.explanation
                                })
                              }
                              className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-medium border border-[var(--accent-border)] bg-[var(--bg-secondary)] text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors"
                            >
                              <Bot className="w-3.5 h-3.5" />
                              <span>Hỏi AI Tutor phân tích lỗi sai này</span>
                            </button>
                          </div>
                        )}

                        {/* Detailed explanation */}
                        <div className="p-2.5 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[11px] text-[var(--text-secondary)] leading-relaxed">
                          <strong className="text-[var(--text-primary)]">Lời giải: </strong>
                          {ex.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
