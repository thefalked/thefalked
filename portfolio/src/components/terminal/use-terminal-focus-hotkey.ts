import { useEffect } from "react";
import { focusTerminalInput, isTerminalFocusHotkey } from "../../lib/focus-terminal-input";

export function useTerminalFocusHotkey() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isTerminalFocusHotkey(event)) return;

      event.preventDefault();
      focusTerminalInput();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
