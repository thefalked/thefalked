import { describe, expect, it } from "vite-plus/test";
import { asciiBanner, helpCommands, navItems, portfolio } from "./portfolio";

describe("portfolio data", () => {
  it("defines core profile fields", () => {
    expect(portfolio.username).toBe("thefalked");
    expect(portfolio.name).toBe("Giuliano Crivelli");
    expect(portfolio.email).toBe("giuliano@thefalked.dev");
  });

  it("defines social links with labels and hrefs", () => {
    for (const social of portfolio.socials) {
      expect(social.label).toBeTruthy();
      expect(social.href).toMatch(/^https?:|^mailto:/);
    }
  });

  it("defines projects with names, links, and descriptions", () => {
    expect(portfolio.projects.length).toBeGreaterThan(0);

    for (const project of portfolio.projects) {
      expect(project.name).toBeTruthy();
      expect(project.href).toMatch(/^https?:\/\//);
      expect(project.description).toBeTruthy();
    }
  });
});

describe("asciiBanner", () => {
  it("uses figlet-style art with preserved spacing", () => {
    expect(asciiBanner).toContain("____");
    expect(asciiBanner).toContain("/ ___");
    expect(asciiBanner).not.toContain("Guiliano");
    expect(asciiBanner.startsWith("  ____")).toBe(true);
  });
});

describe("navItems", () => {
  it("maps terminal navigation to routes", () => {
    expect(navItems).toEqual([
      { label: "cd home", section: "home", path: "/" },
      { label: "cd projects", section: "projects", path: "/projects" },
    ]);
  });
});

describe("helpCommands", () => {
  it("documents every interactive terminal command", () => {
    const commands = helpCommands.map(({ cmd }) => cmd);

    expect(commands).toContain("help");
    expect(commands).toContain("whoami");
    expect(commands).toContain("ls socials");
    expect(commands).toContain("ls projects");
    expect(commands).toContain("cd home");
    expect(commands).toContain("cd projects");
    expect(commands).toContain("pwd");
    expect(commands).toContain("clear");
  });
});
