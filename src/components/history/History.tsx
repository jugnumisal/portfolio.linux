import React, { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from './interface'; // <-- make sure this matches your actual type file
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

export const History: React.FC<Props> = ({ history }) => {
  const [bannerLines, setBannerLines] = useState<string[]>([]);
  const [bannerDone, setBannerDone] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const lines = banner(typeof window !== 'undefined' ? window.innerWidth : 1024)
      .split('\n'); // keep empty lines too

    let i = 0;

    intervalRef.current = window.setInterval(() => {
      if (i < lines.length) {
        setBannerLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        setBannerDone(true);
      }
    }, 40);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="font-mono">
      {/* Banner: render as <pre> so ASCII spacing/newlines are preserved */}
      <pre className="text-light-foreground dark:text-dark-foreground whitespace-pre-wrap break-words m-0">
        {bannerLines.join('\n')}
      </pre>

      {/* History: render BOTH command and output as <pre> to preserve formatting */}
      {bannerDone &&
        history.map((entry, index) => (
          <div key={index} className="mt-2">
            <pre className="text-light-yellow dark:text-dark-yellow whitespace-pre-wrap break-words m-0">
              {entry.command}
            </pre>

            <pre className="text-light-gray dark:text-dark-gray whitespace-pre-wrap break-words m-0">
              {entry.output}
            </pre>
          </div>
        ))}
    </div>
  );
};
