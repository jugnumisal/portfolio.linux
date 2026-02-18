import React from 'react';
import * as bin from './bin';

// Helper function to get and update the command history from localStorage
const getCommandHistory = (): string[] => {
  const history = localStorage.getItem('commandHistory');
  return history ? JSON.parse(history) : [];
};

const saveCommandHistory = (history: string[]) => {
  localStorage.setItem('commandHistory', JSON.stringify(history));
};

export const shell = async (
  command: string,
  appendHistory: (cmd: string, output: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const raw = command;
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  // Handle the 'clear' command
  if (args[0] === 'clear') {
    clearHistory();
    setCommand('');
    return;
  }

  // Handle the 'history' command
  if (args[0] === 'history') {
    const history = getCommandHistory();
    const out = history.length === 0 ? 'No commands entered yet.' : history.join('\n');
    appendHistory(raw, out);
    setCommand('');
    return;
  }

  // Handle empty command
  if (raw.trim() === '') {
    appendHistory('', '');
    setCommand('');
    return;
  }

  // Handle invalid commands
  if (Object.keys(bin).indexOf(args[0]) === -1) {
    appendHistory(raw, `shell: command not found: ${args[0]}. Try 'help' to get started.`);
    setCommand('');
    return;
  }

  // Handle valid commands
  const output = await bin[args[0]](args.slice(1));

  // Save the command to history (last 10)
  const currentHistory = getCommandHistory();
  currentHistory.push(raw);
  if (currentHistory.length > 10) currentHistory.shift();
  saveCommandHistory(currentHistory);

  appendHistory(raw, output);
  setCommand('');
};
