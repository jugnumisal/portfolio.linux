import Head from 'next/head';
import React, { useState, useRef } from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import BootLoader from '../components/BootLoader';

const IndexPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    history, command, lastCommandIndex,
    setCommand, setHistory, clearHistory, setLastCommandIndex
  } = useHistory([]);

  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete) {
    return <BootLoader onComplete={() => setBootComplete(true)} />;
  }

  return (
    <>
      <Head><title>{config.title}</title></Head>
      <div className="p-8 overflow-hidden h-full border-2 rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="overflow-y-auto h-full">
          <History history={history} />
          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
