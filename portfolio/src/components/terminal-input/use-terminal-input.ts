import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
type UseTerminalInputOptions = {
  prompt: string;
  onSubmit: (value: string) => void;
  onHistory: (direction: "up" | "down") => string | null;
};

export function useTerminalInput({ prompt, onSubmit, onHistory }: UseTerminalInputOptions) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [prompt]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const previous = onHistory("up");
      if (previous !== null) setValue(previous);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = onHistory("down");
      if (next !== null) setValue(next);
    }
  };

  return {
    value,
    inputRef,
    handleSubmit,
    handleChange,
    handleKeyDown,
  };
}
