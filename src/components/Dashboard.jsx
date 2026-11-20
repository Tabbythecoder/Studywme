import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, CheckCircle } from 'lucide-react';

const EASING = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASING
    }
  }
};

export default function Dashboard({ subjects, onSelectSubject }) {
  const overallCompleted = subjects.reduce((acc, s) => acc + s.completedLessons, 0);
  const overallTotal = subjects.reduce((acc, s) => acc + s.totalLessons, 0);
  const overallPercent = Math.round((overallCompleted / overallTotal) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASING }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6B7280]">
              Không gian học tập cá nhân
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827] mt-1">
              Tổng quan tiến độ
            </h1>
            <p className="text-sm text-[#4B5563] mt-1.5 max-w-lg">
              Theo dõi lộ trình các môn học khoa học tự nhiên. Tập trung cao độ với giao diện tối giản chuẩn mực.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-3">
            <div>
              <div className="text-xs text-[#6B7280]">Tổng tiến độ hoàn thành</div>
              <div className="text-lg font-bold font-mono text-[#111827]">
                {overallPercent}%
              </div>
            </div>
            <div className="w-16 h-16 relative flex items-center justify-center">
              <div className="text-xs font-mono text-[#6B7280] text-center">
                <span className="text-[#10B981] font-semibold">{overallCompleted}</span>
                <span className="text-[#9CA3AF]">/</span>
                <span>{overallTotal}</span>
                <div className="text-[10px] text-[#9CA3AF]">bài</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subject cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {subjects.map((sub) => (
          <motion.div
            key={sub.id}
            variants={cardVariants}
            className="group bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl p-5 flex flex-col justify-between transition-colors shadow-none"
          >
            <div>
              {/* Header badge & code */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#FAFAFA] text-[#4B5563]">
                  {sub.code}
                </span>
                <span className="text-xs font-mono text-[#10B981] font-medium">
                  {sub.progress}%
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#10B981] transition-colors leading-snug">
                {sub.title}
              </h3>
              <p className="text-xs text-[#6B7280] mt-2 line-clamp-2 leading-relaxed">
                {sub.description}
              </p>

              {/* Slim 4px progress bar */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-[11px] font-mono text-[#6B7280] mb-1.5">
                  <span>Tiến độ học</span>
                  <span>{sub.completedLessons} / {sub.totalLessons} bài</span>
                </div>
                <div className="h-1 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#10B981] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom action button */}
            <div className="mt-6 pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
              <span className="text-xs text-[#9CA3AF] flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {sub.lesson.readTime}
              </span>

              <button
                onClick={() => onSelectSubject(sub)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-[#111827] bg-[#FAFAFA] hover:bg-[#10B981] hover:text-white border border-[#E5E7EB] hover:border-[#10B981] transition-all"
              >
                <span>Tiếp tục học</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
