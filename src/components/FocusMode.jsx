import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BookOpen, ChevronRight, Share2 } from 'lucide-react';
import MathView from './MathView';
import Flashcard from './Flashcard';
import Quiz from './Quiz';

const EASING = [0.16, 1, 0.3, 1];

export default function FocusMode({ subject, onCompleteLesson }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const lesson = subject.lesson;

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
    if (onCompleteLesson) {
      onCompleteLesson(subject.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Lesson Meta Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASING }}
        className="pb-6 mb-8 border-b border-[#E5E7EB]"
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-mono text-xs px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#FFFFFF] text-[#6B7280]">
            {subject.code}
          </span>
          <span className="text-xs text-[#9CA3AF]">/</span>
          <span className="text-xs text-[#6B7280] font-medium">
            {lesson.category}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
            {lesson.title}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6B7280] flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {lesson.readTime}
            </span>

            <button
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
                isCompleted
                  ? "bg-[#10B981] border-[#10B981] text-white"
                  : "bg-white border-[#E5E7EB] text-[#111827] hover:border-[#10B981]"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isCompleted ? "Đã hoàn thành bài" : "Đánh dấu đã xong"}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main 2-Column Split: Theory & Formulas (Left) vs Practice (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Theory + KaTeX (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASING }}
          className="md:col-span-7 space-y-6"
        >
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 sm:p-7">
            <div className="flex items-center gap-2 pb-3 mb-5 border-b border-[#F3F4F6]">
              <span className="font-mono text-xs px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#FAFAFA] text-[#6B7280]">
                LÝ THUYẾT CỐT LÕI
              </span>
              <span className="text-xs font-semibold text-[#111827]">
                Công thức & Định lý
              </span>
            </div>

            <div className="space-y-6">
              {lesson.theory.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  {section.heading && (
                    <h2 className="text-base font-semibold text-[#111827] tracking-tight">
                      {section.heading}
                    </h2>
                  )}

                  {section.text && (
                    <p className="text-sm text-[#374151] leading-relaxed">
                      {section.text.split(/(\$[^$]+\$)/g).map((part, pIdx) => {
                        if (part.startsWith('$') && part.endsWith('$')) {
                          return <MathView key={pIdx} math={part.slice(1, -1)} />;
                        }
                        return part;
                      })}
                    </p>
                  )}

                  {section.math && (
                    <div className="my-3 p-4 bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg overflow-x-auto text-center">
                      <MathView math={section.math} block={true} />
                    </div>
                  )}

                  {section.note && (
                    <p className="text-xs text-[#6B7280] italic">
                      {section.note}
                    </p>
                  )}

                  {section.rule && (
                    <div className="my-2.5 p-3 rounded-lg border border-[#10B981]/30 bg-[#10B981]/5 text-center">
                      <span className="font-mono text-xs font-semibold text-[#10B981] tracking-wide">
                        {section.rule}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Practice Area (Flashcard + Interactive Quiz) (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: EASING }}
          className="md:col-span-5 space-y-6"
        >
          {/* Flashcard 3D */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5">
            <Flashcard cards={lesson.flashcards} />
          </div>

          {/* Interactive Multiple Choice Quiz */}
          <Quiz
            quiz={lesson.quiz}
            context={`${subject.title} - ${lesson.title}`}
          />
        </motion.div>
      </div>
    </div>
  );
}
