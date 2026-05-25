import { TerminalInput } from "../terminal-input";
import { TerminalOutput } from "../terminal-output";
import type { TerminalLine } from "../../utils/commands";
import { tv } from "tailwind-variants";

const terminal = tv({
  slots: {
    root: [
      "flex min-h-70 max-h-dvh h-full w-full min-w-0 max-w-terminal",
      "flex-col overflow-hidden rounded-terminal border border-border",
      "bg-bg-elevated backdrop-blur-md shadow-neon-card",
      "lg:min-h-0 lg:max-h-full sm:rounded-terminal-sm",
    ],
    titlebar: [
      "flex min-w-0 items-center justify-between gap-2",
      "border-b border-border px-3 py-3",
      "sm:gap-3 sm:px-4 sm:py-3.5",
    ],
    controls: "flex shrink-0 gap-1.5",
    controlRed: "h-2.5 w-2.5 rounded-full bg-control-red",
    controlYellow: "h-2.5 w-2.5 rounded-full bg-control-yellow",
    controlGreen: "h-2.5 w-2.5 rounded-full bg-control-green",
    title: "min-w-0 truncate text-right text-terminal-2xs text-text-muted sm:text-terminal-link",
    body: [
      "flex min-h-0 flex-1 flex-col overflow-hidden",
      "px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4",
    ],
  },
});

const {
  root,
  titlebar,
  controls,
  controlRed,
  controlYellow,
  controlGreen,
  title: titleSlot,
  body,
} = terminal();

type TerminalViewProps = {
  title: string;
  lines: TerminalLine[];
  prompt: string;
  onSubmit: (value: string) => void;
  onHistory: (direction: "up" | "down") => string | null;
  onBodyClick: () => void;
};

export function TerminalView({
  title,
  lines,
  prompt,
  onSubmit,
  onHistory,
  onBodyClick,
}: TerminalViewProps) {
  return (
    <section className={root()} aria-label="Interactive terminal">
      <div className={titlebar()}>
        <div className={controls()} aria-hidden="true">
          <span className={controlRed()} />
          <span className={controlYellow()} />
          <span className={controlGreen()} />
        </div>
        <span className={titleSlot()} title={title}>
          {title}
        </span>
      </div>

      <div className={body()} onClick={onBodyClick}>
        <TerminalOutput lines={lines} />
        <TerminalInput prompt={prompt} onSubmit={onSubmit} onHistory={onHistory} />
      </div>
    </section>
  );
}
