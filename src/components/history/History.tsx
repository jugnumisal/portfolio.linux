import React, { useEffect, useState } from 'react';
import { HistoryEntry } from './interface';
import { banner } from '../../utils/bin/commands';

interface Props {
  history: HistoryEntry[];
}

export const History: React.FC<Props> = ({ history }) => {
  const [bannerLines, setBannerLines] = useState<string[]>([]);
  const [bannerDone, setBannerDone] = useState(false);

  useEffect(() => {
    const lines = banner().split('\n').filter((line) => line.trim() !== '');
    let i = 0;

    const interval = setInterval(() => {
      if (i < lines.length) {
        setBannerLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setBannerDone(true);
      }
    }, 80);

    return () => clearInterval(interval);
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
