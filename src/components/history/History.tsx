import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HistoryEntry } from './interface';
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

const looksLikeHtml = (s: string) => /<\s*(a|u|span|div|br|p|strong|em)\b/i.test(s);

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * IMPORTANT:
 * - Use the *container width* (not window width) so DevTools resizing and padding/scrollbars
 *   don't cause banner selection to flip inconsistently.
 */
const getBreakpoint = (w: number): Breakpoint => {
  if (w < 520) return 'mobile';
  if (w < 1100) return 'tablet';
  return 'desktop';
};

export const History: React.FC<Props> = ({ history }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Actual width of the terminal content area in pixels
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 1024;
    return Math.max(320, window.innerWidth);
  });

  const breakpoint = useMemo(() => getBreakpoint(containerWidth), [containerWidth]);

  const [bannerLines, setBannerLines] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);
  const runIdRef = useRef(0);

  // Measure the true container width and react to *any* resize (including DevTools responsive mode)
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    const update = () => {
      // clientWidth excludes scrollbars; this is what we want for layout decisions
      const w = Math.max(320, el.clientWidth);
      setContainerWidth(w);
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // Type banner when breakpoint changes (mobile/tablet/desktop),
  // and always generate from containerWidth to avoid 1024px glitches.
  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    const currentRunId = ++runIdRef.current;

    // Subtract a little for safe margins/padding so we don't pick an overly-wide banner.
    // This is the key to fixing the "break at 1024" behavior.
    const safeWidth = Math.max(320, Math.floor(containerWidth - 24));

    const lines = banner(safeWidth).replace(/\n$/, '').split('\n');

    setBannerLines([]);
    let i = 0;

    intervalRef.current = window.setInterval(() => {
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
  }, [breakpoint, containerWidth]);

  return (
    <div ref={containerRef} className="font-mono min-w-0">
      {/* Banner: preserve spacing + allow horizontal scroll on small screens */}
      <pre
        className="banner m-0 whitespace-pre overflow-x-auto max-w-full font-mono [font-variant-ligatures:none]"
        // Helps some browsers avoid weird font fallback/ligature rendering in DevTools
        style={{ fontVariantLigatures: 'none' }}
      >
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
