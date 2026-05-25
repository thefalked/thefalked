import { useCallback, useEffect, useRef, useState } from "react";
import type { Section } from "../../data/portfolio";
import {
  getHomeLines,
  getProjectsLines,
  getPrompt,
  runCommand,
  type TerminalLine,
} from "../../utils/commands";

type HistoryEntry = {
  command: string;
  lines: TerminalLine[];
};

function getInitialLines(section: Section): TerminalLine[] {
  return section === "home" ? getHomeLines() : getProjectsLines();
}

export function useTerminalState(section: Section, onNavigate: (section: Section) => void) {
  const [lines, setLines] = useState<TerminalLine[]>(() => getInitialLines(section));
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const sectionRef = useRef(section);

  useEffect(() => {
    if (sectionRef.current !== section) {
      sectionRef.current = section;
      setLines(getInitialLines(section));
      setHistory([]);
      setHistoryIndex(-1);
    }
  }, [section]);

  const submit = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      const result = runCommand(trimmed, section);

      if (result.clear) {
        setLines([]);
        setHistory((prev) => [...prev, { command: trimmed, lines: [] }]);
        setHistoryIndex(-1);
        return;
      }

      if (result.nextSection) {
        onNavigate(result.nextSection);
        return;
      }

      const entryLines: TerminalLine[] = [{ type: "command", text: trimmed }, ...result.lines];
      setHistory((prev) => [...prev, { command: trimmed, lines: entryLines }]);
      setLines((prev) => [...prev, ...entryLines]);
      setHistoryIndex(-1);
    },
    [onNavigate, section],
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down") => {
      if (history.length === 0) return null;

      if (direction === "up") {
        const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        return history[nextIndex]?.command ?? null;
      }

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        return "";
      }
      setHistoryIndex(nextIndex);
      return history[nextIndex]?.command ?? null;
    },
    [history, historyIndex],
  );

  return {
    lines,
    prompt: getPrompt(section),
    submit,
    navigateHistory,
  };
}
