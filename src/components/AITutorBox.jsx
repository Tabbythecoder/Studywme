import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, KeyRound, Loader2, Info } from 'lucide-react';
import { askAITutor } from '../services/aiTutor';
import MathView from './MathView';

const EASING = [0.16, 1, 0.3, 1];

export default function AITutorBox({ questionId, questionTitle, context }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState('');

  const handleToggle = async () => {
    if (!isOpen && !response) {
      setIsOpen(true);
      setLoading(true);
      const res = await askAITutor({
        questionId,
        questionTitle,
        context,
        customKey: customKey.trim() || null
      });
      setResponse(res);
      setLoading(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleReload = async () => {
    setLoading(true);
    const res = await askAITutor({
      questionId,
      questionTitle,
      context,
      customKey: customKey.trim() || null
    });
    setResponse(res);
    setLoading(false);
  };

  // Helper parser for markdown text with KaTeX formulas
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-xs leading-relaxed text-[#374151]">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          
          // Check if line contains LaTeX formulas like $...$
          const parts = line.split(/(\$[^$]+\$)/g);

          return (
            <p key={idx} className="leading-relaxed">
              {parts.map((part, pIdx) => {
                if (part.startsWith('$') && part.endsWith('$')) {
                  const formula = part.slice(1, -1);
                  return <MathView key={pIdx} math={formula} />;
                }
                // Handle basic bold **text**
                const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                return boldParts.map((bp, bIdx) => {
                  if (bp.startsWith('**') && bp.endsWith('**')) {
                    return <strong key={bIdx} className="font-semibold text-[#111827]">{bp.slice(2, -2)}</strong>;
                  }
                  return bp;
                });
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mt-3">
      {/* Small trigger button right under question */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggle}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-[#10B981] bg-[#10B981]/5 hover:bg-[#10B981]/10 border border-[#10B981]/25 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gợi ý cách giải (AI Tutor)</span>
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="p-1 rounded text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          title="Cấu hình Gemini API Key"
        >
          <KeyRound className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Optional Gemini Key Input Drawer */}
      <AnimatePresence>
        {showKeyInput && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASING }}
            className="mt-2 p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] text-xs"
          >
            <div className="flex items-center gap-1 text-[#6B7280] mb-1.5">
              <Info className="w-3 h-3 text-[#10B981]" />
              <span>Gắn Gemini API Key (hoặc cấu hình trong file .env `VITE_GEMINI_API_KEY`):</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                className="flex-1 px-2.5 py-1 bg-white border border-[#E5E7EB] rounded font-mono text-xs focus:outline-none focus:border-[#10B981]"
              />
              <button
                onClick={handleReload}
                className="px-3 py-1 bg-[#10B981] text-white rounded text-xs font-medium hover:opacity-90 transition-opacity"
              >
                Lưu & Thử
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out hint container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASING }}
            className="mt-2.5 p-4 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA]"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#111827]">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Trợ lý Sư phạm gợi mở</span>
                {response?.source === 'gemini-live' && (
                  <span className="font-mono text-[10px] text-[#10B981] px-1.5 py-0.2 rounded border border-[#10B981]/30">
                    Live Gemini
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-[#9CA3AF]">
                Tư duy Socratic
              </span>
            </div>

            {loading ? (
              <div className="py-4 flex items-center justify-center gap-2 text-xs text-[#6B7280] font-mono">
                <Loader2 className="w-4 h-4 animate-spin text-[#10B981]" />
                <span>Đang phân tích phương pháp giải...</span>
              </div>
            ) : (
              <div>
                {renderFormattedContent(response?.content)}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
