import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FocusMode from './components/FocusMode';
import { subjects as initialSubjects } from './data/mockData';

const EASING = [0.16, 1, 0.3, 1];

export default function App() {
  const [subjectsList, setSubjectsList] = useState(initialSubjects);
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  const activeSubject = subjectsList.find((s) => s.id === activeSubjectId) || null;

  // Handle ESC key to return to Dashboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSubjectId) {
        setActiveSubjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSubjectId]);

  const handleSelectSubject = (sub) => {
    setActiveSubjectId(sub.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setActiveSubjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (subjectId) => {
    setSubjectsList((prev) =>
      prev.map((s) => {
        if (s.id === subjectId) {
          const newCompleted = Math.min(s.totalLessons, s.completedLessons + 1);
          const newProgress = Math.round((newCompleted / s.totalLessons) * 100);
          return {
            ...s,
            completedLessons: newCompleted,
            progress: newProgress
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111827]">
      {/* Top minimal navigation */}
      <Navbar
        activeSubject={activeSubject}
        onBackToDashboard={handleBackToDashboard}
        currentStreak={5}
      />

      {/* Main View Area with Framer Motion Transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {!activeSubject ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASING }}
            >
              <Dashboard
                subjects={subjectsList}
                onSelectSubject={handleSelectSubject}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`focus-${activeSubject.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASING }}
            >
              <FocusMode
                subject={activeSubject}
                onCompleteLesson={handleCompleteLesson}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Clean minimal footer */}
      <footer className="w-full border-t border-[#E5E7EB] bg-[#FFFFFF] py-6 mt-12 text-center text-xs text-[#6B7280]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#111827]">EduMind</span>
            <span>—</span>
            <span>Thiết kế tối giản theo tiêu chuẩn Linear & Notion</span>
          </div>
          <div className="font-mono text-[11px] text-[#9CA3AF]">
            Phím tắt: [ESC] để về Dashboard
          </div>
        </div>
      </footer>
    </div>
  );
}
