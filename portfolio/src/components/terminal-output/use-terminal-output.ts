import { useRef } from "react";

export function useTerminalOutput() {
  const endRef = useRef<HTMLDivElement>(null);

  return { endRef };
}
