import React, { useEffect, useRef, useState } from 'react';
import { HistoryEntry } from './interface';
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

const looksLikeHtml = (s: string) => /<\s*(a|u|span|div|br|p|strong|em)\b/i.test(s);

export const History: React.FC<Props> = ({ history }) => {
  const [bannerLines, setBannerLines] = useState<string[]>([]);
  const [bannerDone, setBannerDone] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const lines = banner(typeof window !== 'undefined' ? window.innerWidth : 1024).split('\n');
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
      {/* Banner */}
      <pre className="banner m-0">{bannerLines.join('\n')}</pre>

      {/* History */}
      {bannerDone &&
        history.map((entry, index) => (
          <div key={index} className="mt-2">
            <pre className="text-light-yellow dark:text-dark-yellow whitespace-pre-wrap break-words m-0">
              {entry.command}
            </pre>

            {looksLikeHtml(entry.output) ? (
              <div
                className="terminal-output text-light-gray dark:text-dark-gray"
                dangerouslySetInnerHTML={{ __html: entry.output }}
              />
            ) : (
              <pre className="terminal-output text-light-gray dark:text-dark-gray m-0">
                {entry.output}
              </pre>
            )}
          </div>
        ))}
    </div>
  );
};
