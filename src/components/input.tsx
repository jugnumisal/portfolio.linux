import React, { useRef, useEffect } from 'react';
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
  appendHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const localRef = useRef<HTMLInputElement>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    localRef.current?.focus();
  }, []);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: string[] = history
      .map(({ command }) => command)
      .filter((c: string) => c);

    // Ctrl+C
    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      clearHistory();
      setLastCommandIndex(0);
      return;
    }

    // Ctrl+L
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
      return;
    }

    // Tab completion
    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
      return;
    }

    // Enter
    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();

      if (runningRef.current) return;
      runningRef.current = true;

      setLastCommandIndex(0);

      const enteredCommand = command; // capture exact command string
      await shell(enteredCommand, appendHistory, clearHistory, setCommand);

      requestAnimationFrame(() => {
        containerRef?.current?.scrollTo(0, containerRef.current.scrollHeight);
      });

      runningRef.current = false;
      return;
    }

    // History navigation
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) return;

      const index = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
      return;
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
      return;
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
        <span className="typewriter-cursor" aria-hidden="true" />
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
        inputMode="text"
      />
    </div>
  );
};

export default Input;
