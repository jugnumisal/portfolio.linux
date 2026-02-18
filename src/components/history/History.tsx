import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HistoryEntry } from './interface';
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

const looksLikeHtml = (s: string) => /<\s*(a|u|span|div|br|p|strong|em)\b/i.test(s);

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (w: number): Breakpoint => {
  if (w < 480) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
};

export const History: React.FC<Props> = ({ history }) => {
  const [width, setWidth] = useState<number>(() => (typeof window !== 'undefined' ? window.innerWidth : 1024));

  // Which banner variant should be shown right now?
  const breakpoint = useMemo(() => getBreakpoint(width), [width]);

  const [bannerLines, setBannerLines] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);
  const runIdRef = useRef(0);

  // Track window resize so banner can respond to viewport changes (mobile ⇄ desktop)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let raf = 0;

    const onResize = () => {
      // Use rAF to avoid spamming state updates during continuous resizing
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setWidth(window.innerWidth);
      });
    };

    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Re-type the banner only when crossing breakpoints (mobile/tablet/desktop)
  useEffect(() => {
    // Cancel any previous typing
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const currentRunId = ++runIdRef.current;

    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const lines = banner(w).replace(/\n$/, '').split('\n');

    // Reset and type again for the new breakpoint
    setBannerLines([]);
    let i = 0;

    intervalRef.current = window.setInterval(() => {
      // If a newer run started, stop this one
      if (runIdRef.current !== currentRunId) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        return;
      }

      if (i < lines.length) {
        setBannerLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      }
    }, 35);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [breakpoint]);

  return (
    <div className="font-mono min-w-0">
      {/* Banner: keep formatting stable + allow horizontal scroll on small screens */}
      <pre className="banner m-0 whitespace-pre overflow-x-auto max-w-full">
        {bannerLines.join('\n')}
      </pre>

      {/* History */}
      {history.map((entry, index) => (
        <div key={index} className="mt-2 min-w-0">
          <pre className="text-light-yellow dark:text-dark-yellow whitespace-pre-wrap break-words m-0">
            {entry.command}
          </pre>

          {looksLikeHtml(entry.output) ? (
            <div
              className="terminal-output text-light-gray dark:text-dark-gray min-w-0 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: entry.output }}
            />
          ) : (
            <pre className="terminal-output text-light-gray dark:text-dark-gray m-0 whitespace-pre-wrap break-words">
              {entry.output}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
};
