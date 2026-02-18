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

  const runBanner = (width: number) => {
    setBannerLines([]);
    setBannerDone(false);

    const lines = banner(width).split('\n').filter((line) => line.trim() !== '');
    let i = 0;

    const interval = window.setInterval(() => {
      if (i < lines.length) {
        setBannerLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        window.clearInterval(interval);
        setBannerDone(true);
      }
    }, 80);

    return () => window.clearInterval(interval);
  };

  useEffect(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    let cleanup = runBanner(w);

    const onResize = () => {
      // debounce resize/orientation changes
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);

      resizeTimeoutRef.current = window.setTimeout(() => {
        cleanup?.();
        cleanup = runBanner(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cleanup?.();
      window.removeEventListener('resize', onResize);
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="whitespace-pre-wrap font-mono">
      {bannerLines.map((line, idx) => (
        <div key={`banner-${idx}`} className="text-light-foreground dark:text-dark-foreground">
          {line}
        </div>
      ))}

      {bannerDone &&
        history.map((entry, index) => (
          <div key={index}>
            <div className="text-light-yellow dark:text-dark-yellow">{entry.command}</div>
            <div className="text-light-gray dark:text-dark-gray">{entry.output}</div>
          </div>
        ))}
    </div>
  );
};
