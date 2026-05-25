import { TerminalInput } from "../terminal-input";
import { TerminalOutput } from "../terminal-output";
import type { TerminalLine } from "../../utils/commands";
import { tv } from "tailwind-variants";

const terminal = tv({
  slots: {
    root: "flex h-full min-h-0 max-h-full w-full min-w-0 max-w-[920px] flex-col overflow-hidden rounded-[12px] border border-border bg-bg-elevated shadow-[0_0_0_1px_rgb(110_43_145/0.06),0_0_32px_rgb(110_43_145/0.06),inset_0_0_48px_rgb(110_43_145/0.03)] backdrop-blur-md sm:rounded-[14px]",
    titlebar:
      "flex min-w-0 items-center justify-between gap-2 border-b border-border px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5",
    controls: "flex shrink-0 gap-1.5",
    controlRed: "h-2.5 w-2.5 rounded-full bg-[#ff5f57]",
    controlYellow: "h-2.5 w-2.5 rounded-full bg-[#febc2e]",
    controlGreen: "h-2.5 w-2.5 rounded-full bg-[#28c840]",
    title: "min-w-0 truncate text-right text-[0.7rem] text-text-muted sm:text-[0.82rem]",
    body: "flex min-h-0 flex-1 flex-col overflow-hidden px-3 pt-4 pb-3 sm:px-4 sm:pt-5 sm:pb-4",
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
