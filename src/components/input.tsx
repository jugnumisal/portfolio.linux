import React, { useRef, useEffect } from 'react';
import { commandExists } from '../utils/commandExists';
import { shell } from '../utils/shell';
import { handleTabCompletion } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';

export const Input = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const localRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localRef.current?.focus();
  }, []);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: string[] = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      setLastCommandIndex(0);
      await shell(command, setHistory, clearHistory, setCommand);
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) return;
      const index = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commands.length) return;
      const index = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  return (
    <div className="terminal-line" onClick={() => localRef.current?.focus()}>
      <span className="prompt">
        <Ps1 />
      </span>
      <span className="typed-text">
  {command}
  <span className="typewriter-cursor">
    {command === ''}
  </span>
</span>

      <input
        ref={(el) => {
          localRef.current = el;
          if (inputRef) inputRef.current = el;
        }}
        value={command}
        onChange={onChange}
        onKeyDown={onSubmit}
        className="terminal-hidden-input"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
};

export default Input;
