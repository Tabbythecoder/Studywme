import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Component for rendering KaTeX equations inline or display mode
 * @param {string} math - LaTeX string
 * @param {boolean} block - If true, render as display math ($$...$$)
 */
export default function MathView({ math, block = false, className = '' }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (e) {
      console.error('KaTeX error:', e);
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`font-mono ${block ? 'block my-3 text-center overflow-x-auto py-1' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
