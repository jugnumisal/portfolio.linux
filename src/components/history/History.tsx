import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HistoryEntry } from './interface';
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

const looksLikeHtml = (s: string) => /<\s*(a|u|span|div|br|p|strong|em)\b/i.test(s);

export const History: React.FC<Props> = ({ history }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 1024;
    return window.innerWidth;
  });

  // Measure real terminal content width (stable across DevTools/resizes/scrollbar changes)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setContainerWidth(Math.max(320, el.clientWidth));
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const bannerText = useMemo(() => {
    // subtract a small safety margin so the desktop banner isn’t chosen too early
    const safeWidth = Math.max(320, Math.floor(containerWidth - 24));
    return banner(safeWidth).replace(/\n$/, '');
  }, [containerWidth]);

  return (
    <div ref={containerRef} className="font-mono min-w-0">
      {/* Banner: preserve ASCII spacing; allow horizontal scroll inside banner */}
      <pre className="banner m-0 whitespace-pre overflow-x-auto max-w-full [font-variant-ligatures:none]">
        {bannerText}
      </pre>

      {/* History output */}
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
