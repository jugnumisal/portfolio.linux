// src/components/history/History.tsx
import React, { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from './interface';
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

export const History: React.FC<Props> = ({ history }) => {
  const [bannerLines, setBannerLines] = useState<string[]>([]);
  const [bannerDone, setBannerDone] = useState(false);
  const resizeTimeoutRef = useRef<number | null>(null);
  const cleanupRef = useRef<() => void | undefined>();

  const runBanner = (width: number) => {
    setBannerLines([]);
    setBannerDone(false);

    const full = banner(width);
    const lines = full.split('\n'); // preserve empty lines for spacing
    let i = 0;

    const interval = window.setInterval(() => {
      if (i < lines.length) {
        setBannerLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        window.clearInterval(interval);
        setBannerDone(true);
      }
    }, 40);

    // store cleanup so resize can cancel previous interval
    cleanupRef.current = () => window.clearInterval(interval);
  };

  useEffect(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    runBanner(w);

    const onResize = () => {
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);

      resizeTimeoutRef.current = window.setTimeout(() => {
        // cancel previous animation
        if (cleanupRef.current) cleanupRef.current();
        runBanner(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', onResize);

    return () => {
      if (cleanupRef.current) cleanupRef.current();
      window.removeEventListener('resize', onResize);
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-mono">
      {/* Render banner as a single <pre> so CSS can scale/wrap it */}
      <pre className="banner">{bannerLines.join('\n')}</pre>

      {bannerDone &&
        history.map((entry, index) => (
          <div key={index} className="mt-2">
            <div className="text-light-yellow dark:text-dark-yellow">{entry.command}</div>
            <div className="text-light-gray dark:text-dark-gray">{entry.output}</div>
          </div>
        ))}
    </div>
  );
};
