import { TerminalInputView } from "./terminal-input.view";
import { useTerminalInput } from "./use-terminal-input";

type TerminalInputProps = {
  prompt: string;
  onSubmit: (value: string) => void;
  onHistory: (direction: "up" | "down") => string | null;
};

export function TerminalInput({ prompt, onSubmit, onHistory }: TerminalInputProps) {
  const { value, inputRef, handleSubmit, handleChange, handleKeyDown } = useTerminalInput({
    prompt,
    onSubmit,
    onHistory,
  });

  return (
    <TerminalInputView
      prompt={prompt}
      value={value}
      inputRef={inputRef}
      onSubmit={handleSubmit}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
