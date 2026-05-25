import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import { asciiBanner } from "../../data/portfolio";
import { TerminalOutputView } from "./terminal-output.view";
import type { TerminalLine } from "../../utils/commands";

describe("TerminalOutputView", () => {
  it("renders command, output, error, and link lines", () => {
    const lines: TerminalLine[] = [
      { type: "command", text: "help" },
      { type: "output", text: "Available commands:" },
      { type: "error", text: "command not found: foo" },
      {
        type: "link",
        label: "github",
        href: "https://github.com/thefalked",
        description: "GitHub profile",
      },
    ];

    render(<TerminalOutputView lines={lines} endRef={{ current: null }} />);

    const commandLine = screen.getByText("help").closest('[data-type="command"]');
    expect(commandLine?.querySelector(".text-neon")).toHaveTextContent("$");
    expect(screen.getByText("help")).toHaveClass("text-text-bright");
    expect(screen.getByText("Available commands:")).toBeInTheDocument();
    expect(screen.getByText("command not found: foo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "> github" })).toHaveAttribute(
      "href",
      "https://github.com/thefalked",
    );
    expect(screen.getByText(/GitHub profile/)).toBeInTheDocument();
  });

  it("renders hint output lines with data-variant hint", () => {
    render(
      <TerminalOutputView
        lines={[{ type: "output", text: "hint text", variant: "hint" }]}
        endRef={{ current: null }}
      />,
    );

    const hint = screen.getByText("hint text");
    expect(hint).toHaveAttribute("data-variant", "hint");
    expect(hint.className).toMatch(/data-\[variant=hint\]:text-neon-dim/);
  });

  it("renders help output with heading, rows, and footer hint variants", () => {
    render(
      <TerminalOutputView
        lines={[
          { type: "output", text: "Available commands:", variant: "help-heading" },
          { type: "output", text: "cd home          - go home", variant: "help-row" },
          {
            type: "output",
            text: "Some commands aren't listed. Try things.",
            variant: "help-hint",
          },
        ]}
        endRef={{ current: null }}
      />,
    );

    expect(screen.getByText("Available commands:")).toHaveAttribute("data-variant", "help-heading");
    const helpRow = screen.getByText(/cd home/);
    expect(helpRow).toHaveAttribute("data-variant", "help-row");
    expect(helpRow.className).toMatch(/data-\[variant=help-row\]:text-neon/);
    expect(screen.getByText(/Some commands aren't listed/)).toHaveAttribute(
      "data-variant",
      "help-hint",
    );
  });

  it("renders ROLE, LOC, and STACK on a fixed label column", () => {
    render(
      <TerminalOutputView
        lines={[
          { type: "output", text: "ROLE\tFrontend Developer" },
          { type: "output", text: "LOC\tTimisoara" },
        ]}
        endRef={{ current: null }}
      />,
    );

    expect(screen.getByText("ROLE")).toHaveClass("text-neon");
    expect(screen.getByText("Frontend Developer")).toHaveClass("text-text-bright");
    expect(screen.getByText("LOC")).toBeInTheDocument();
    expect(screen.getByText("Timisoara")).toBeInTheDocument();
  });

  it("does not treat command or error lines containing ___ as ascii blocks", () => {
    render(
      <TerminalOutputView
        lines={[
          { type: "command", text: "___test" },
          { type: "error", text: "command not found: ___test" },
        ]}
        endRef={{ current: null }}
      />,
    );

    expect(document.querySelector("pre")).not.toBeInTheDocument();

    const commandLine = screen.getByText("___test").closest('[data-type="command"]');
    expect(commandLine).toBeInTheDocument();
    expect(commandLine?.querySelector(".text-neon")).toHaveTextContent("$");

    expect(
      screen.getByText("command not found: ___test").closest('[data-type="error"]'),
    ).toBeInTheDocument();
  });

  it("renders ascii banner inside pre tag", () => {
    render(
      <TerminalOutputView
        lines={[{ type: "output", text: asciiBanner }]}
        endRef={{ current: null }}
      />,
    );

    const pre = document.querySelector("pre");
    expect(pre).toBeInTheDocument();
    expect(pre?.textContent).toContain("____");
  });
});
