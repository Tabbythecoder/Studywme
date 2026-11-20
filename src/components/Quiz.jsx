import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw } from 'lucide-react';
import MathView from './MathView';
import AITutorBox from './AITutorBox';

const EASING = [0.16, 1, 0.3, 1];

export default function Quiz({ quiz, context }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (optionId) => {
    if (submitted) return;
    setSelectedOption(optionId);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  const isCurrentCorrect = quiz.options.find((o) => o.id === selectedOption)?.isCorrect;

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-5">
      {/* Quiz Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6] mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-2 py-0.5 rounded border border-[#E5E7EB] bg-[#FAFAFA] text-[#6B7280]">
            LUYỆN TẬP
          </span>
          <span className="text-xs font-semibold text-[#111827]">
            Câu hỏi củng cố
          </span>
        </div>
        {submitted && (
          <button
            onClick={handleReset}
            className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Làm lại</span>
          </button>
        )}
      </div>

      {/* Question prompt */}
      <div>
        <p className="text-sm font-medium text-[#111827] leading-relaxed">
          {quiz.title}
        </p>

        {quiz.questionMath && (
          <div className="my-3 p-3 bg-[#FAFAFA] border border-[#E5E7EB] rounded-lg">
            <MathView math={quiz.questionMath} block={true} />
          </div>
        )}
      </div>

      {/* AI Tutor Box placed right under the question */}
      <AITutorBox
        questionId={quiz.id}
        questionTitle={`${quiz.title} ${quiz.questionMath || ''}`}
        context={context}
      />

      {/* Options list */}
      <div className="mt-5 space-y-2.5">
        {quiz.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          let containerClasses = "w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ";

          if (!submitted) {
            containerClasses += isSelected
              ? "border-[#10B981] bg-[#10B981]/5 text-[#111827]"
              : "border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] text-[#374151]";
          } else {
            if (opt.isCorrect) {
              containerClasses += "border-[#10B981] bg-[#10B981]/5 text-[#111827]";
            } else if (isSelected && !opt.isCorrect) {
              containerClasses += "border-red-300 bg-red-50/50 text-[#111827]";
            } else {
              containerClasses += "border-[#E5E7EB] bg-[#FFFFFF] opacity-50";
            }
          }

          return (
            <motion.div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              whileTap={{ scale: 0.995 }}
              transition={{ ease: EASING, duration: 0.15 }}
              className={containerClasses}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-medium border ${
                  isSelected
                    ? "border-[#10B981] text-[#10B981] bg-white"
                    : "border-[#E5E7EB] text-[#6B7280] bg-[#FAFAFA]"
                }`}>
                  {opt.id}
                </span>

                <div className="text-sm">
                  {opt.text.includes('\\') || opt.text.includes('^') ? (
                    <MathView math={opt.text} />
                  ) : (
                    <span>{opt.text}</span>
                  )}
                </div>
              </div>

              {submitted && opt.isCorrect && (
                <Check className="w-4 h-4 text-[#10B981]" />
              )}
              {submitted && isSelected && !opt.isCorrect && (
                <X className="w-4 h-4 text-red-500" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Action / Result */}
      <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={handleCheck}
            disabled={!selectedOption}
            className={`px-4 py-2 rounded text-xs font-medium transition-all ${
              selectedOption
                ? "bg-[#10B981] text-white hover:opacity-95"
                : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs">
            {isCurrentCorrect ? (
              <span className="text-[#10B981] font-medium flex items-center gap-1">
                <Check className="w-4 h-4" /> Chính xác! Bạn đã hiểu đúng bài.
              </span>
            ) : (
              <span className="text-red-500 font-medium flex items-center gap-1">
                <X className="w-4 h-4" /> Chưa chính xác. Xem gợi ý của AI Tutor ở trên nhé!
              </span>
            )}
          </div>
        )}
      </div>

      {/* Explanation when submitted */}
      {submitted && quiz.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASING }}
          className="mt-3 p-3.5 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] text-xs text-[#4B5563]"
        >
          <div className="font-semibold text-[#111827] mb-1">Giải thích chi tiết:</div>
          <p className="whitespace-pre-line leading-relaxed">{quiz.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
