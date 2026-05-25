import type { RefObject } from "react";
import { tv } from "tailwind-variants";
import type { TerminalLine } from "../../utils/commands";
import { getLineDataAttributes, isAsciiBlock, parseKeyInfoLine } from "./terminal-output.logic";

const terminalOutput = tv({
  slots: {
    output: [
      "terminal-scrollbar min-h-0 min-w-0 flex-1",
      "overflow-y-auto overflow-x-hidden",
      "pr-1 pb-3 sm:pr-2 sm:pb-4",
    ],
    anchor: "",
    line: [
      "min-w-0 break-words text-terminal text-text sm:text-terminal-md",
      "data-[type=command]:text-terminal-md",
      "data-[type=error]:text-error",
      "data-[variant=help-heading]:text-terminal-sm data-[variant=help-heading]:text-neon-dim",
      "data-[variant=help-row]:text-terminal data-[variant=help-row]:text-neon data-[variant=help-row]:neon-glow-soft",
      "data-[variant=help-hint]:text-terminal-xs data-[variant=help-hint]:text-neon-dim",
      "data-[variant=hint]:text-terminal-xs data-[variant=hint]:text-neon-dim",
    ],
    commandPrompt: "font-medium text-terminal-md text-neon neon-glow-soft",
    commandText: "text-text-bright",
    keyInfoRow: ["grid grid-cols-[5.5ch_1fr] items-baseline", "gap-x-4 tabular-nums text-terminal"],
    keyInfoLabel: "font-medium text-terminal-sm text-neon neon-glow-soft",
    keyInfoValue: "text-text-bright",
    link: [
      "text-terminal-link text-neon-muted no-underline",
      "hover:text-neon hover:neon-glow-hover",
    ],
    linkDescription: "text-terminal-xs text-neon-dim",
    asciiScroll: "max-w-full overflow-x-auto",
    ascii: "m-0 min-w-max font-mono whitespace-pre text-terminal-2xs text-neon",
  },
});

const {
  line: lineSlot,
  link,
  linkDescription,
  asciiScroll,
  ascii,
  commandPrompt,
  commandText,
  keyInfoRow,
  keyInfoLabel,
  keyInfoValue,
  output,
  anchor,
} = terminalOutput();

type TerminalLineViewProps = {
  line: TerminalLine;
};

type LinkLine = Extract<TerminalLine, { type: "link" }>;
type TextLine = Extract<TerminalLine, { type: "command" | "output" | "error" }>;

function TerminalLineLink({ line }: { line: LinkLine }) {
  return (
    <div className={lineSlot()} data-type="link">
      <a href={line.href} target="_blank" rel="noreferrer" className={link()}>
        &gt; {line.label}
      </a>
      {line.description ? <span className={linkDescription()}> — {line.description}</span> : null}
    </div>
  );
}

function TerminalLineEmpty() {
  return (
    <div className={lineSlot()} data-type="empty">
      &nbsp;
    </div>
  );
}

function TerminalLineAscii({ text }: { text: string }) {
  return (
    <div className={lineSlot()} data-type="output">
      <div className={asciiScroll()}>
        <pre className={ascii()}>{text}</pre>
      </div>
    </div>
  );
}

function TerminalLineKeyInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className={lineSlot()} data-type="output">
      <div className={keyInfoRow()}>
        <span className={keyInfoLabel()}>{label}</span>
        <span className={keyInfoValue()}>{value}</span>
      </div>
    </div>
  );
}

function TerminalLineDefault({ line }: { line: TextLine }) {
  const dataAttributes = getLineDataAttributes(line);

  return (
    <div className={lineSlot()} {...dataAttributes}>
      {line.type === "command" ? (
        <>
          <span className={commandPrompt()}>$</span>{" "}
          <span className={commandText()}>{line.text}</span>
        </>
      ) : (
        line.text
      )}
    </div>
  );
}

function TerminalLineView({ line }: TerminalLineViewProps) {
  if (line.type === "link") {
    return <TerminalLineLink line={line} />;
  }

  if (!line.text) {
    return <TerminalLineEmpty />;
  }

  if (line.type === "output" && isAsciiBlock(line.text)) {
    return <TerminalLineAscii text={line.text} />;
  }

  const keyInfo = line.type === "output" ? parseKeyInfoLine(line.text) : null;
  if (keyInfo) {
    return <TerminalLineKeyInfo label={keyInfo.label} value={keyInfo.value} />;
  }

  return <TerminalLineDefault line={line} />;
}

type TerminalOutputViewProps = {
  lines: TerminalLine[];
  endRef: RefObject<HTMLDivElement | null>;
};

export function TerminalOutputView({ lines, endRef }: TerminalOutputViewProps) {
  return (
    <div className={output()}>
      {lines.map((line, index) => (
        <TerminalLineView key={`${index}-${line.type}`} line={line} />
      ))}
      <div ref={endRef} className={anchor()} data-terminal-end />
    </div>
  );
}
