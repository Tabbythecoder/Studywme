import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import MathView from './MathView';

const EASING = [0.16, 1, 0.3, 1];

export default function Flashcard({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
          <span className="font-semibold text-[#111827]">Flashcard ôn tập</span>
          <span>•</span>
          <span className="font-mono text-[11px] text-[#10B981] font-medium">Lật 3D</span>
        </div>
        <div className="text-xs font-mono text-[#6B7280]">
          {currentIndex + 1} / {cards.length}
        </div>
      </div>

      {/* 3D Container */}
      <div
        className="w-full h-56 cursor-pointer select-none perspective-1000"
        onClick={toggleFlip}
      >
        <motion.div
          className="relative w-full h-full transform-style-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: EASING }}
        >
          {/* Front Face */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl p-5 flex flex-col justify-between transition-colors">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span className="font-mono tracking-wider text-[11px]">CÂU HỎI</span>
              <span className="flex items-center gap-1 text-[11px] text-[#6B7280]">
                <RotateCw className="w-3 h-3" />
                Chạm để lật
              </span>
            </div>

            <div className="my-auto py-2">
              <p className="text-sm sm:text-base font-medium text-[#111827] leading-relaxed text-center">
                {currentCard.front}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2 border-t border-[#F3F4F6]">
              <span className="truncate max-w-[80%]">Gợi ý: {currentCard.hint}</span>
              <span className="font-mono">Mặt trước</span>
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#FFFFFF] border border-[#10B981]/40 rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono tracking-wider text-[11px] text-[#10B981] font-medium">ĐÁP ÁN & BẢN CHẤT</span>
              <span className="flex items-center gap-1 text-[11px] text-[#6B7280]">
                <RotateCw className="w-3 h-3" />
                Lật lại
              </span>
            </div>

            <div className="my-auto py-2">
              <p className="text-sm sm:text-base font-normal text-[#111827] leading-relaxed whitespace-pre-line text-center">
                {currentCard.back}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] pt-2 border-t border-[#F3F4F6]">
              <span className="text-[#10B981]">Đã hiểu rõ bản chất</span>
              <span className="font-mono">Mặt sau</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFA] text-[#4B5563] hover:text-[#111827] transition-colors"
            title="Thẻ trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded border border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFA] text-[#4B5563] hover:text-[#111827] transition-colors"
            title="Thẻ tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={toggleFlip}
          className="text-xs font-medium text-[#4B5563] hover:text-[#10B981] flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#10B981] transition-all"
        >
          <RotateCw className="w-3 h-3" />
          <span>{isFlipped ? 'Xem lại câu hỏi' : 'Lật đáp án'}</span>
        </button>
      </div>
    </div>
  );
}
