import type { Section } from "../../data/portfolio";
import { TerminalView } from "./terminal.view";
import { useTerminalFocusHotkey } from "./use-terminal-focus-hotkey";
import { useTerminal } from "./use-terminal";

type TerminalProps = {
  section: Section;
  onNavigate: (section: Section) => void;
};

export function Terminal({ section, onNavigate }: TerminalProps) {
  useTerminalFocusHotkey();

  const { title, lines, prompt, submit, navigateHistory, focusInput } = useTerminal({
    section,
    onNavigate,
  });

  return (
    <TerminalView
      title={title}
      lines={lines}
      prompt={prompt}
      onSubmit={submit}
      onHistory={navigateHistory}
      onBodyClick={focusInput}
    />
  );
}
