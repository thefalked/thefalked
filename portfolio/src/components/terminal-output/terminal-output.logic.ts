import type { OutputVariant } from "../../utils/commands";

export function isAsciiBlock(text: string) {
  return text.includes("___") || text.includes("/ ___");
}

export type TerminalLineType = "command" | "error" | "link" | "output" | "empty";

const KEY_INFO_PREFIXES = ["ROLE\t", "LOC\t", "STACK\t"] as const;

export function isKeyInfoLine(text: string) {
  return KEY_INFO_PREFIXES.some((prefix) => text.startsWith(prefix));
}

export function parseKeyInfoLine(text: string) {
  if (!isKeyInfoLine(text)) return null;

  const [label, ...rest] = text.split("\t");
  return { label, value: rest.join("\t") };
}

export function getLineDataAttributes(line: {
  type: string;
  variant?: OutputVariant;
  text?: string;
}): {
  "data-type": TerminalLineType;
  "data-variant"?: OutputVariant;
} {
  if (line.type === "command") return { "data-type": "command" };
  if (line.type === "error") return { "data-type": "error" };
  if (line.type === "link") return { "data-type": "link" };
  if (!line.text) return { "data-type": "empty" };
  return {
    "data-type": "output",
    ...(line.variant ? { "data-variant": line.variant } : {}),
  };
}
