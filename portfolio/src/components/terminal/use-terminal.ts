import { useCallback } from "react";
import type { Section } from "../../data/portfolio";
import { portfolio } from "../../data/portfolio";
import { focusTerminalInput, scrollTerminalToEnd } from "../../lib/focus-terminal-input";
import { getWindowPath } from "../../lib/navigation";
import { useTerminalState } from "./use-terminal-state";

type UseTerminalOptions = {
  section: Section;
  onNavigate: (section: Section) => void;
};

export function useTerminal({ section, onNavigate }: UseTerminalOptions) {
  const { submit: submitCommand, ...terminal } = useTerminalState(section, onNavigate);

  const submit = useCallback(
    (input: string) => {
      submitCommand(input);
      queueMicrotask(() => scrollTerminalToEnd());
    },
    [submitCommand],
  );

  return {
    ...terminal,
    submit,
    windowPath: getWindowPath(section),
    title: `${portfolio.username}@${portfolio.host} ${getWindowPath(section)}`,
    focusInput: focusTerminalInput,
  };
}
