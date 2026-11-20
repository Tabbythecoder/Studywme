import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, LayoutDashboard, Calculator, Zap, FlaskConical, Terminal, Bot } from 'lucide-react';

export default function Taskbar({ activeTab, onSelectTab, onOpenAITutor }) {
  const [hoveredTab, setHoveredTab] = useState(null);

  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'math10', label: 'Toán 10', icon: Calculator },
    { id: 'physics10', label: 'Vật lí 10', icon: Zap },
    { id: 'chemistry10', label: 'Hóa học 10', icon: FlaskConical },
    { id: 'cs10', label: 'Tin học 10', icon: Terminal },
    { id: 'ai-tutor', label: 'AI Tutor', icon: Bot, isAction: true }
  ];

  const handleTabClick = (tab) => {
    if (tab.isAction) {
      onOpenAITutor();
    } else {
      onSelectTab(tab.id);
    }
  };

  return (
    <nav className="w-full bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] px-4 py-2 transition-colors sticky top-13 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar">
        {/* Navigation list */}
        <div
          className="flex items-center gap-1 p-1 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-primary)] relative"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-[4px] flex items-center gap-1.5 transition-colors select-none z-10 ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {/* Active sliding indicator pill (Physical spring: stiffness 420, damping 32) */}
                {isActive && (
                  <motion.div
                    layoutId="activeTaskbarPill"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8
                    }}
                    className="absolute inset-0 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[4px] shadow-sm z-[-1]"
                  />
                )}

                {/* Smooth hover indicator if not active */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hoverTaskbarPill"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8
                    }}
                    className="absolute inset-0 bg-[var(--bg-tertiary)] rounded-[4px] z-[-2]"
                  />
                )}

                <Icon className={`w-3.5 h-3.5 ${
                  tab.id === 'ai-tutor'
                    ? 'text-[var(--accent)]'
                    : isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-muted)]'
                }`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Minimalist status badge */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)] pl-4">
          <span className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            GDPT 2018
          </span>
          <span>Lớp 10</span>
        </div>
      </div>
    </nav>
  );
}
