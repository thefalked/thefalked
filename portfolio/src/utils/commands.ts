import { asciiBanner, helpCommands, portfolio, type Section } from "../data/portfolio";

export type OutputVariant = "help-heading" | "help-row" | "help-hint" | "hint";

export type TerminalLine =
  | { type: "command"; text: string }
  | { type: "output"; text: string; variant?: OutputVariant }
  | { type: "error"; text: string }
  | { type: "link"; label: string; href: string; description?: string };

export function getPrompt(section: Section) {
  const dir = section === "home" ? "~" : section;
  return `${portfolio.username}@${portfolio.host}:${dir}$`;
}

export function getHomeLines(): TerminalLine[] {
  return [
    { type: "output", text: asciiBanner },
    { type: "output", text: "" },
    { type: "output", text: `ROLE\t${portfolio.role}` },
    { type: "output", text: `LOC\t${portfolio.location}` },
    { type: "output", text: `STACK\t${portfolio.stack}` },
    { type: "output", text: "" },
    { type: "command", text: "ls socials" },
    ...portfolio.socials.map((social) => ({
      type: "link" as const,
      label: social.label,
      href: social.href,
    })),
    { type: "output", text: "" },
    { type: "command", text: "ls projects" },
    ...portfolio.projects.slice(0, 3).map((project) => ({
      type: "link" as const,
      label: project.name,
      href: project.href,
      description: project.description,
    })),
    { type: "output", text: "" },
  ];
}

export function getProjectsLines(): TerminalLine[] {
  return [
    { type: "output", text: "Projects" },
    { type: "output", text: "Open source and side projects I have built.", variant: "hint" },
    { type: "output", text: "" },
    ...portfolio.projects.flatMap((project) => [
      {
        type: "link" as const,
        label: project.name,
        href: project.href,
        description: project.description,
      },
      { type: "output" as const, text: "" },
    ]),
  ];
}

export function runCommand(
  input: string,
  section: Section,
): {
  lines: TerminalLine[];
  nextSection?: Section;
  clear?: boolean;
} {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [command, ...rest] = trimmed.split(/\s+/);
  const arg = rest.join(" ");

  switch (command.toLowerCase()) {
    case "help":
      return {
        lines: [
          { type: "output", text: "Available commands:", variant: "help-heading" },
          { type: "output", text: "" },
          ...helpCommands.map(({ cmd, desc }) => ({
            type: "output" as const,
            text: `${cmd.padEnd(16)} - ${desc}`,
            variant: "help-row" as const,
          })),
          { type: "output", text: "" },
          {
            type: "output",
            text: "Some commands aren't listed. Try things.",
            variant: "help-hint",
          },
        ],
      };

    case "whoami":
      return {
        lines: [
          { type: "output", text: portfolio.name },
          { type: "output", text: portfolio.role },
          { type: "output", text: portfolio.location },
          { type: "output", text: portfolio.email },
          { type: "output", text: portfolio.bio, variant: "hint" },
        ],
      };

    case "pwd":
      return {
        lines: [
          {
            type: "output",
            text: section === "home" ? "/home/thefalked" : `/home/thefalked/${section}`,
          },
        ],
      };

    case "clear":
    case "cls":
      return { lines: [], clear: true };

    case "ls":
      if (arg === "socials") {
        return {
          lines: portfolio.socials.map((social) => ({
            type: "link" as const,
            label: social.label,
            href: social.href,
          })),
        };
      }
      if (arg === "projects") {
        return {
          lines: portfolio.projects.map((project) => ({
            type: "link" as const,
            label: project.name,
            href: project.href,
            description: project.description,
          })),
        };
      }
      return {
        lines: [
          { type: "output", text: "home  projects" },
          { type: "output", text: "Try: ls socials · ls projects", variant: "hint" },
        ],
      };

    case "cd":
      if (arg === "home" || arg === "~" || arg === "") {
        return { lines: [], nextSection: "home" };
      }
      if (arg === "projects") {
        return { lines: [], nextSection: "projects" };
      }
      return { lines: [{ type: "error", text: `cd: ${arg || "?"}: No such directory` }] };

    default:
      return {
        lines: [{ type: "error", text: `command not found: ${command}` }],
      };
  }
}
