import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Settings, Sparkles, AlertCircle, CheckCircle2, RotateCcw, Key } from 'lucide-react';
import { sendChatMessageToTutor, getSavedGeminiKey, saveGeminiKey } from '../services/aiTutor';
import MathView from './MathView';

const EASING = [0.16, 1, 0.3, 1];

export default function AITutorDrawer({ isOpen, onClose, contextData }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const messagesEndRef = useRef(null);

  // Sync API Key
  useEffect(() => {
    const key = getSavedGeminiKey();
    setSavedKey(key);
    setApiKeyInput(key);
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-trigger analysis when contextData changes and drawer opens
  useEffect(() => {
    if (!isOpen) return;

    if (contextData && contextData.question) {
      // User arrived from a failed question
      const initialUserMsg = `Em vừa chọn đáp án "${contextData.userWrongAnswer}" cho câu hỏi này và bị sai. Thầy/Cô chỉ giúp em vì sao em lại nhầm lẫn và bản chất đúng của câu này là gì với ạ?`;
      
      const newMessages = [
        { role: 'user', text: initialUserMsg, timestamp: new Date() }
      ];
      setMessages(newMessages);
      fetchAIResponse(newMessages, contextData);
    } else {
      // General greeting if opened from taskbar
      setMessages([
        {
          role: 'model',
          text: `Chào bạn! Mình là Trợ giảng AI đồng hành cùng chương trình Lớp 10 (GDPT 2018).
Bạn có thắc mắc bài toán, định luật vật lí, phương trình hóa học hay lập trình Python nào cần mình hỗ trợ không?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, contextData]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const fetchAIResponse = async (chatHistory, ctx) => {
    setIsLoading(true);
    try {
      const res = await sendChatMessageToTutor({
        messages: chatHistory,
        contextData: ctx
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: res.text,
          modelUsed: res.modelUsed,
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `Đã xảy ra lỗi kết nối: ${err.message}. Bạn hãy thử lại hoặc kiểm tra API Key trong mục Cài đặt ⚙.`,
          isError: true,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const trimmed = inputMessage.trim();
    if (!trimmed || isLoading) return;

    const newMsgs = [
      ...messages,
      { role: 'user', text: trimmed, timestamp: new Date() }
    ];
    setMessages(newMsgs);
    setInputMessage('');

    await fetchAIResponse(newMsgs, contextData);
  };

  const handleSaveKey = () => {
    saveGeminiKey(apiKeyInput);
    setSavedKey(apiKeyInput);
    setShowSettings(false);
  };

  // Helper formatter for responses (supporting KaTeX formulas $...$)
  const renderMessageText = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Parse inline latex $...$
          const parts = line.split(/(\$[^$]+\$)/g);

          return (
            <div key={idx} className="leading-relaxed">
              {parts.map((part, pIdx) => {
                if (part.startsWith('$') && part.endsWith('$')) {
                  const formula = part.slice(1, -1);
                  return <MathView key={pIdx} math={formula} />;
                }
                // Handle markdown bold **text**
                const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                return boldParts.map((bp, bIdx) => {
                  if (bp.startsWith('**') && bp.endsWith('**')) {
                    return (
                      <strong key={bIdx} className="font-semibold text-[var(--text-primary)]">
                        {bp.slice(2, -2)}
                      </strong>
                    );
                  }
                  return bp;
                });
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 dark:bg-black/50 backdrop-blur-[2px]"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: EASING }}
            className="relative w-full sm:w-[420px] max-w-[95vw] h-full bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] flex flex-col shadow-2xl z-10"
          >
            {/* Drawer Header */}
            <div className="h-13 px-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-secondary)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Trợ giảng AI Lớp 10
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-muted)]">
                  BYOK
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-1.5 rounded border transition-colors ${
                    showSettings || !savedKey
                      ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-light)]'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  title="Cài đặt Gemini API Key"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded border border-[var(--border-subtle)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  title="Đóng (ESC)"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Settings Popover for BYOK Gemini Key */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: EASING }}
                  className="p-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-[var(--accent)]" />
                      Cấu hình Gemini API Key
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      Lưu trong browser
                    </span>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] mb-2.5 leading-relaxed">
                    Nhập khóa Gemini API của bạn để gọi mô hình <code className="font-mono text-[var(--accent)]">gemini-2.5-flash</code> trực tiếp không giới hạn.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-secondary)] font-mono text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <button
                      onClick={handleSaveKey}
                      className="px-3 py-1.5 rounded bg-[var(--accent)] hover:opacity-90 text-white font-medium text-xs transition-opacity"
                    >
                      Lưu
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Context preview banner if attached */}
            {contextData && contextData.question && (
              <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs">
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                  <span className="font-mono">{contextData.subject} • {contextData.lesson}</span>
                  <span className="text-[var(--error)] font-medium">Làm sai</span>
                </div>
                <div className="text-[12px] font-medium text-[var(--text-primary)] line-clamp-2">
                  {contextData.question}
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-mono">
                  <span className="text-[var(--error)]">Bạn chọn: {contextData.userWrongAnswer}</span>
                  <span className="text-[var(--text-muted)]">|</span>
                  <span className="text-[var(--accent)]">Đáp án đúng: {contextData.correctAnswer}</span>
                </div>
              </div>
            )}

            {/* Chat Messages scroll area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => {
                const isUser = msg.role === 'user';

                return (
                  <div
                    key={i}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] font-mono text-[var(--text-muted)] mb-1 px-1">
                      {isUser ? 'Bạn' : 'AI Tutor'}
                      {msg.modelUsed && (
                        <span className="ml-1 text-[var(--accent)]">({msg.modelUsed})</span>
                      )}
                    </div>

                    <div
                      className={`max-w-[92%] p-3 rounded-[6px] border ${
                        isUser
                          ? 'bg-[var(--bg-tertiary)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                          : 'bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {renderMessageText(msg.text)}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="text-[10px] font-mono text-[var(--text-muted)] mb-1 px-1">
                    AI Tutor
                  </div>
                  <div className="p-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span>Đang phân tích lỗi sai & suy luận...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Hỏi thêm về bài học này..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-[4px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 rounded-[4px] bg-[var(--accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-40"
                title="Gửi câu hỏi (Enter)"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
