import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, BookOpen, CheckCircle2, Calculator, Zap, FlaskConical, Terminal, Sparkles } from 'lucide-react';
import FallingDotsCanvas from './FallingDotsCanvas';

const EASING = [0.16, 1, 0.3, 1];

export default function HomeView({ isDark, onStartLearning, onOpenSubject, onOpenAITutor }) {
  const subjects = [
    { id: 'math10', title: 'Toán 10', desc: 'Mệnh đề, Bất phương trình, Vectơ & Lượng giác tam giác', icon: Calculator, code: 'TOAN-10' },
    { id: 'physics10', title: 'Vật lí 10', desc: 'Động học, Ba định luật Newton & Năng lượng', icon: Zap, code: 'VATLI-10' },
    { id: 'chemistry10', title: 'Hóa học 10', desc: 'Cấu tạo nguyên tử, Bảng tuần hoàn & Oxi hóa - khử', icon: FlaskConical, code: 'HOAHOC-10' },
    { id: 'cs10', title: 'Tin học 10', desc: 'Biểu diễn thông tin, Mạng & Lập trình Python cơ bản', icon: Terminal, code: 'TINHOC-10' }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section (Full viewport height feel) */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-[#FAFAFA] dark:bg-[#111113] transition-colors border-b border-[var(--border-subtle)]">
        {/* Subtle Falling Dots Canvas */}
        <FallingDotsCanvas isDark={isDark} />

        {/* Subtle Radial Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 45%, transparent 20%, rgba(10, 10, 12, 0.6) 100%)'
              : 'radial-gradient(circle at 50% 45%, transparent 40%, rgba(240, 242, 245, 0.4) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center py-12">
          {/* Subtle Tag badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASING }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)] mb-6 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-[11px]">GDPT 2018</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span>Không gian học tập Lớp 10</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASING }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.1] text-balance"
          >
            Studywme
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASING }}
            className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 max-w-xl leading-relaxed text-balance"
          >
            Không gian học tập Lớp 10 tối giản, tập trung và tích hợp gia sư AI. Rèn luyện bản chất logic, loại bỏ hoàn toàn sự phân tâm.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASING }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={onStartLearning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 font-medium text-xs sm:text-sm transition-opacity shadow-sm"
            >
              <span>Bắt đầu học ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[5px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] font-medium text-xs sm:text-sm transition-colors"
            >
              <Bot className="w-4 h-4 text-[var(--accent)]" />
              <span>Trợ giảng AI</span>
            </button>
          </motion.div>

          {/* Minimal key features pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[var(--text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" /> 4 Môn học cốt lõi
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" /> Công thức KaTeX chuẩn
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" /> Phân tích câu sai Socratic
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. Scroll Reveal Feature Section 1: Curriculum Overview */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-b border-[var(--border-subtle)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASING }}
        >
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <span>01 / LỘ TRÌNH CHUẨN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Chương trình Lớp 10 GDPT 2018
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-xl leading-relaxed">
            Nội dung bài học được chuẩn hóa theo định hướng phát triển năng lực tư duy, cô đọng lý thuyết và loại bỏ mọi rườm rà.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {subjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  onClick={() => onOpenSubject(sub.id)}
                  className="group p-5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[var(--border-hover)] cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-muted)]">
                        {sub.code}
                      </span>
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-mono text-[11px]">Bấm để xem bài học</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. Scroll Reveal Feature Section 2: Interactive Practice & KaTeX */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-b border-[var(--border-subtle)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASING }}
        >
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <span>02 / LUYỆN TẬP THỰC CHẤT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Hệ thống bài tập & Phản hồi trực tiếp
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-xl leading-relaxed">
            Học là phải đi đôi với thực hành. Mọi bài học đều có câu hỏi trắc nghiệm tương tác với công thức Toán/Lí hiển thị sắc nét bằng KaTeX.
          </p>

          <div className="mt-8 p-6 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Trải nghiệm học tập tinh gọn
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="space-y-1.5">
                <div className="font-medium text-xs text-[var(--text-primary)]">Phát hiện lỗi sai tinh tế</div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Khi bạn chọn đáp án chưa chính xác, hệ thống chỉ báo bằng viền đỏ mảnh và không làm bạn phân tâm hay nản lòng.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-medium text-xs text-[var(--text-primary)]">Công thức KaTeX chuẩn mực</div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Hiển thị chuẩn các ký hiệu toán học vi phân, lượng giác và phương trình hóa học mà không bị vỡ font hay sai lệch vị trí.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-medium text-xs text-[var(--text-primary)]">Chống AI Slop tuyệt đối</div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Không nhồi nhét hiệu ứng hoạt họa nảy lung tung, không badge streak giả tạo, tập trung 100% vào năng lượng học tập.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Scroll Reveal Feature Section 3: Socratic AI Tutor */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASING }}
        >
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <span>03 / TRỢ GIẢNG AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            Giải thích bản chất lỗi sai tức thì
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-xl leading-relaxed">
            Thay vì chỉ đưa ra đáp án đúng vô cảm, AI Tutor chỉ ra cho bạn biết tại sao bạn lại chọn sai, hiểu sâu quy luật tư duy và nhớ lâu hơn.
          </p>

          <div className="mt-8 p-6 rounded-[6px] border border-[var(--accent-border)] bg-[var(--accent-light)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Chạy tự động hoàn toàn — Không cần cài đặt API Key
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] max-w-lg leading-relaxed">
                Được tích hợp sẵn endpoint Google Gemini 3.8 Flash trên máy chủ. Bất cứ khi nào làm sai bài tập, bạn chỉ cần bấm nút "Hỏi AI Tutor" để nhận phân tích tức thì.
              </p>
            </div>

            <button
              onClick={onOpenAITutor}
              className="px-4 py-2 rounded-[4px] bg-[var(--accent)] text-white text-xs font-medium hover:opacity-95 transition-opacity whitespace-nowrap self-start sm:self-auto"
            >
              Mở Trợ giảng AI ngay
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
