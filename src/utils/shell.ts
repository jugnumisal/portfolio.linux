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
  setHistory: (value: string) => void,
  clearHistory: () => void,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  const args = command.split(' ');
  args[0] = args[0].toLowerCase();

  // Handle the 'clear' command
  if (args[0] === 'clear') {
    clearHistory();
  }
  // Handle the 'history' command
  else if (args[0] === 'history') {
    const history = getCommandHistory();
    if (history.length === 0) {
      setHistory('No commands entered yet.');
    } else {
      setHistory(history.join('\n'));
    }
  } 
  // Handle invalid commands
  else if (command === '') {
    setHistory('');
  } else if (Object.keys(bin).indexOf(args[0]) === -1) {
    setHistory(`shell: command not found: ${args[0]}. Try 'help' to get started.`);
  } 
  // Handle valid commands
  else {
    const output = await bin[args[0]](args.slice(1));

    // Save the command to history
    const currentHistory = getCommandHistory();
    currentHistory.push(command);

    // Limit the history to the last 10 commands
    if (currentHistory.length > 10) {
      currentHistory.shift(); // Remove the oldest command if history exceeds 10
    }

    // Update the history in localStorage
    saveCommandHistory(currentHistory);

    setHistory(output);
  }

  // Clear the command input field
  setCommand('');
};
