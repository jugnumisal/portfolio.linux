import React, { useEffect, useState } from 'react';

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
    const t = window.setTimeout(() => {
      if (step < loadingLines.length) {
        setLines((prev) => [...prev, loadingLines[step]]);
        setStep((s) => s + 1);
      } else {
        // Small pause so the last line is visible, then continue to terminal
        window.setTimeout(() => onComplete(), 250);
      }
    }, 800);

    return () => window.clearTimeout(t);
  }, [step, onComplete]);

  return (
    <div className="boot-screen font-mono space-y-1 p-4 sm:p-6 md:p-8">
      {lines.map((ln, i) => (
        <div key={i}>{ln}</div>
      ))}
    </div>
  );
};

export default BootLoader;
