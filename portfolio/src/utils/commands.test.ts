import { describe, expect, it } from "vite-plus/test";
import { getHomeLines, getProjectsLines, getPrompt, runCommand } from "./commands";
import { asciiBanner, helpCommands, portfolio } from "../data/portfolio";

describe("getPrompt", () => {
  it("returns home prompt with tilde directory", () => {
    expect(getPrompt("home")).toBe("thefalked@portfolio:~$");
  });

  it("returns projects prompt with section name", () => {
    expect(getPrompt("projects")).toBe("thefalked@portfolio:projects$");
  });
});

describe("getHomeLines", () => {
  it("includes ascii banner and profile metadata", () => {
    const lines = getHomeLines();
    const texts = lines.map((line) => ("text" in line ? line.text : ""));

    expect(texts).toContain(asciiBanner);
    expect(texts).toContain(`ROLE\t${portfolio.role}`);
    expect(texts).toContain(`LOC\t${portfolio.location}`);
    expect(texts).toContain(`STACK\t${portfolio.stack}`);
  });

  it("includes social and project links", () => {
    const links = getHomeLines().filter((line) => line.type === "link");

    expect(links).toHaveLength(portfolio.socials.length + 3);
    expect(links.some((line) => line.type === "link" && line.label === "github")).toBe(true);
    expect(links.some((line) => line.type === "link" && line.label === "lohanmoraes")).toBe(true);
    expect(links.some((line) => line.type === "link" && line.label === "04-design-system")).toBe(
      true,
    );
  });
});

describe("getProjectsLines", () => {
  it("lists every project with descriptions", () => {
    const links = getProjectsLines().filter((line) => line.type === "link");

    expect(links).toHaveLength(portfolio.projects.length);
    expect(links[0]).toMatchObject({
      type: "link",
      label: portfolio.projects[0].name,
      href: portfolio.projects[0].href,
      description: portfolio.projects[0].description,
    });
  });
});

describe("runCommand", () => {
  it("returns empty result for blank input", () => {
    expect(runCommand("   ", "home")).toEqual({ lines: [] });
  });

  it("handles help command", () => {
    const result = runCommand("help", "home");

    expect(result.lines[0]).toEqual({
      type: "output",
      text: "Available commands:",
      variant: "help-heading",
    });
    expect(
      result.lines.some(
        (line) =>
          line.type === "output" &&
          line.variant === "help-row" &&
          line.text === `${helpCommands[0].cmd.padEnd(16)} - ${helpCommands[0].desc}`,
      ),
    ).toBe(true);
    expect(
      result.lines.some((line) => line.type === "output" && line.variant === "help-hint"),
    ).toBe(true);
  });

  it("handles whoami command", () => {
    const result = runCommand("whoami", "home");

    expect(result.lines.map((line) => ("text" in line ? line.text : ""))).toEqual([
      portfolio.name,
      portfolio.role,
      portfolio.location,
      portfolio.email,
      portfolio.bio,
    ]);
  });

  it("handles pwd on home and projects", () => {
    expect(runCommand("pwd", "home").lines[0]).toEqual({
      type: "output",
      text: "/home/thefalked",
    });
    expect(runCommand("pwd", "projects").lines[0]).toEqual({
      type: "output",
      text: "/home/thefalked/projects",
    });
  });

  it("handles clear and cls aliases", () => {
    expect(runCommand("clear", "home")).toEqual({ lines: [], clear: true });
    expect(runCommand("cls", "home")).toEqual({ lines: [], clear: true });
  });

  it("handles ls socials and ls projects", () => {
    const socials = runCommand("ls socials", "home").lines;
    const projects = runCommand("ls projects", "home").lines;

    expect(socials).toHaveLength(portfolio.socials.length);
    expect(projects).toHaveLength(portfolio.projects.length);
  });

  it("handles bare ls with hints", () => {
    const result = runCommand("ls", "home");

    expect(result.lines).toEqual([
      { type: "output", text: "home  projects" },
      { type: "output", text: "Try: ls socials · ls projects", variant: "hint" },
    ]);
  });

  it("navigates with cd", () => {
    expect(runCommand("cd home", "projects")).toEqual({ lines: [], nextSection: "home" });
    expect(runCommand("cd ~", "projects")).toEqual({ lines: [], nextSection: "home" });
    expect(runCommand("cd projects", "home")).toEqual({ lines: [], nextSection: "projects" });
  });

  it("returns error for unknown cd target", () => {
    expect(runCommand("cd blog", "home").lines[0]).toEqual({
      type: "error",
      text: "cd: blog: No such directory",
    });
  });

  it("returns error for unknown commands", () => {
    expect(runCommand("foo", "home").lines[0]).toEqual({
      type: "error",
      text: "command not found: foo",
    });
  });

  it("is case-insensitive for commands", () => {
    expect(runCommand("HELP", "home").lines[0]).toEqual({
      type: "output",
      text: "Available commands:",
      variant: "help-heading",
    });
  });
});
