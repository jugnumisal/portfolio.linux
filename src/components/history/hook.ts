import React from 'react';
import { History } from './interface';

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistory] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);

  const appendHistory = React.useCallback((cmd: string, output: string) => {
    setHistory((prev) => [
      ...prev,
      {
        id: prev.length,
        date: new Date(),
        command: cmd,
        output,
      },
    ]);
  }, []);

  const clearHistory = React.useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    command,
    lastCommandIndex,
    appendHistory,
    setCommand,
    setLastCommandIndex,
    clearHistory,
  };
};
