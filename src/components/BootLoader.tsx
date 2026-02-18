import React, { useState, useEffect } from 'react';
import { banner } from '../utils/bin/commands';

export interface BootLoaderProps {
  onComplete: () => void;
}

const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const loadingLines = [
    'Initializing live terminal...',
    'Loading modules...',
    'Fetching configuration...',
    'Boot sequence complete.',
  ];

  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (step < loadingLines.length) {
        setLines((prev) => [...prev, loadingLines[step]]);
        setStep(step + 1);
      } else {
        setLines([]);
        setStep(0);
        showBanner();
      }
    }, 800);

    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const showBanner = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const bannerText = banner(w).split('\n').filter((l) => l !== '');
    let idx = 0;

    const showInterval = setInterval(() => {
      if (idx < bannerText.length) {
        setLines((prev) => [...prev, bannerText[idx]]);
        idx++;
      } else {
        clearInterval(showInterval);
        onComplete();
      }
    }, 80);
  };

  return (
    <div className="boot-screen font-mono space-y-1">
      {lines.map((ln, i) => (
        <div key={i}>{ln}</div>
      ))}
    </div>
  );
};

export default BootLoader;
