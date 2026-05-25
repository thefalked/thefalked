import type { TerminalLine } from "../../utils/commands";
import { TerminalOutputView } from "./terminal-output.view";
import { useTerminalOutput } from "./use-terminal-output";

type TerminalOutputProps = {
  lines: TerminalLine[];
};

export function TerminalOutput({ lines }: TerminalOutputProps) {
  const { endRef } = useTerminalOutput();

  return <TerminalOutputView lines={lines} endRef={endRef} />;
}
