import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  RefObject,
  SubmitEventHandler,
} from "react";
import { tv } from "tailwind-variants";
import { TERMINAL_INPUT_PLACEHOLDER } from "./terminal-input.content";

const terminalInput = tv({
  slots: {
    form: "min-w-0 shrink-0 border-t border-border pt-3 sm:pt-3.5",
    label: "flex min-w-0 items-baseline gap-x-1 text-terminal-md",
    prompt: "shrink-0 font-medium leading-[inherit] text-neon neon-glow-soft",
    field: "relative min-w-0 flex-1",
    input: [
      "relative z-1 w-full border-0 bg-transparent p-0",
      "text-[inherit] leading-[inherit] text-text-bright",
      "caret-neon outline-none",
    ],
    hint: "terminal-input-hint pointer-events-none absolute inset-0 z-0 truncate text-neon-dim",
    srOnly: "sr-only",
  },
});

const { form, label, prompt: promptSlot, field, input, hint, srOnly } = terminalInput();

type TerminalInputViewProps = {
  prompt: string;
  value: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
};

export function TerminalInputView({
  prompt,
  value,
  inputRef,
  onSubmit,
  onChange,
  onKeyDown,
}: TerminalInputViewProps) {
  return (
    <form className={form()} onSubmit={onSubmit}>
      <label htmlFor="terminal-input" className={label()}>
        <span className={promptSlot()} aria-hidden="true">
          $
        </span>
        <span className={field()}>
          <input
            id="terminal-input"
            ref={inputRef}
            className={input()}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label={`${prompt} command input`}
            aria-describedby={value === "" ? "terminal-input-hint" : undefined}
          />
          {value === "" ? (
            <span id="terminal-input-hint" className={hint()}>
              {TERMINAL_INPUT_PLACEHOLDER}
            </span>
          ) : null}
        </span>
        <span className={srOnly()}>{prompt}</span>
      </label>
    </form>
  );
}
