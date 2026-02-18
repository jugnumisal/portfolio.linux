export interface HistoryEntry {
  id: number;
  date: Date;
  command: string;
  output: string;
}

/**
 * Backwards-compatible alias because other parts of the app import `History`
 * (e.g. hook.ts). Keep both so nothing breaks.
 */
export type History = HistoryEntry;
