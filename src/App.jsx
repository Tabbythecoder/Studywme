import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Taskbar from './components/Taskbar';
import Dashboard from './components/Dashboard';
import SubjectView from './components/SubjectView';
import LessonDetail from './components/LessonDetail';
import AITutorDrawer from './components/AITutorDrawer';
import { grade10Subjects } from './data/grade10Data';

export default function App() {
  // Theme state persisted in localStorage
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('studywme_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Active navigation tab: 'dashboard' | 'math10' | 'physics10' | 'chemistry10' | 'cs10'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Active lesson selected inside a subject
  const [activeLesson, setActiveLesson] = useState(null);

  // AI Tutor Drawer state & Context
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorContext, setAiTutorContext] = useState(null);

  // Synchronize Dark class with documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('studywme_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('studywme_theme', 'light');
    }
  }, [isDark]);

  // Global hotkeys (Alt+A to open AI Tutor)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAITutorOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setActiveLesson(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lesson) => {
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSubject = () => {
    setActiveLesson(null);
  };

  const handleOpenAITutor = (context = null) => {
    setAiTutorContext(context);
    setIsAITutorOpen(true);
  };

  const handleCloseAITutor = () => {
    setIsAITutorOpen(false);
  };

  const currentSubject = grade10Subjects.find((s) => s.id === activeTab) || null;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
      {/* 1. Minimal Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenAITutor={() => handleOpenAITutor(null)}
      />

      {/* 2. Minimal Taskbar (Dock) with sliding indicator */}
      <Taskbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenAITutor={() => handleOpenAITutor(null)}
      />

      {/* 3. Main Content Views */}
      <main className="flex-1">
        {activeTab === 'dashboard' ? (
          <Dashboard
            subjects={grade10Subjects}
            onSelectSubject={handleSelectTab}
          />
        ) : currentSubject ? (
          activeLesson ? (
            <LessonDetail
              subject={currentSubject}
              lesson={activeLesson}
              onBack={handleBackToSubject}
              onOpenAITutorWithContext={handleOpenAITutor}
            />
          ) : (
            <SubjectView
              subject={currentSubject}
              onSelectLesson={handleSelectLesson}
            />
          )
        ) : null}
      </main>

      {/* 4. Slide-over AI Tutor Drawer (BYOK Gemini Ready) */}
      <AITutorDrawer
        isOpen={isAITutorOpen}
        onClose={handleCloseAITutor}
        contextData={aiTutorContext}
      />

      {/* 5. Minimalist Footer */}
      <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-6 mt-16 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--text-primary)]">Studywme</span>
            <span>—</span>
            <span>Chương trình giáo dục phổ thông 2018</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Toán • Vật lí • Hóa học • Tin học 10</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
