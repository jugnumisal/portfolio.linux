import * as bin from './bin';  // Import bin commands

export const handleTabCompletion = (
  command,
  setCommand
) => {
  // Split the input into command and arguments
  const [baseCommand, ...args] = command.split(' ');

  // Match base command against available commands
  const matchingCommands = Object.keys(bin).filter((entry) =>
    entry.startsWith(baseCommand)
  );

  // If we're completing the base command (no arguments typed)
  if (args.length === 0) {
    if (matchingCommands.length === 1) {
      setCommand(matchingCommands[0]); // Auto-complete base command
    }
    return;
  }

  // If we have arguments to complete (e.g., directories for 'cd')
  if (matchingCommands.length === 1) {
    const commandHandler = bin[matchingCommands[0]];

    // If the command supports tab completion for arguments (like 'cd')
    if (typeof commandHandler.getCompletions === 'function') {
      const completions = commandHandler.getCompletions(args.join(' '));

      if (completions.length === 1) {
        setCommand(`${baseCommand} ${completions[0]}`); // Auto-complete argument
      } else if (completions.length > 1) {
        // Optionally handle showing multiple completions (e.g., `cd fo...` => `cd forbidden_forest`)
        setCommand(`${baseCommand} ${completions.join(' | ')}`);
      }
    }
  }
};
