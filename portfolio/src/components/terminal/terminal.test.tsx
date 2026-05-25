import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { Terminal } from "./index";

async function setupBlurredHomeTerminal() {
  const user = userEvent.setup();

  render(<Terminal section="home" onNavigate={vi.fn()} />);

  const input = screen.getByRole("textbox", { name: /command input/i });
  input.blur();

  return { user, input };
}

function renderHomeTerminal() {
  render(<Terminal section="home" onNavigate={vi.fn()} />);
  return screen.getByRole("textbox", { name: /command input/i });
}

describe("Terminal", () => {
  it("renders terminal chrome and home content", () => {
    render(<Terminal section="home" onNavigate={vi.fn()} />);

    expect(screen.getByRole("region", { name: "Interactive terminal" })).toBeInTheDocument();
    expect(screen.getByText(/thefalked@portfolio ~$/)).toBeInTheDocument();
    expect(screen.getByText(/ROLE/)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /command input/i })).toBeInTheDocument();
  });

  it("shows projects path in title bar", () => {
    render(<Terminal section="projects" onNavigate={vi.fn()} />);

    expect(screen.getByText(/thefalked@portfolio projects$/)).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("executes commands through the interactive input", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<Terminal section="home" onNavigate={onNavigate} />);

    await user.type(screen.getByRole("textbox", { name: /command input/i }), "cd projects{Enter}");

    expect(onNavigate).toHaveBeenCalledWith("projects");
  });

  it("focuses input when slash is pressed outside the input", async () => {
    const { user, input } = await setupBlurredHomeTerminal();

    await user.keyboard("/");

    expect(input).toHaveFocus();
  });

  it("allows slash commands while the input is focused", async () => {
    const user = userEvent.setup();
    const input = renderHomeTerminal();

    await user.type(input, "ls");

    expect(input).toHaveValue("ls");
  });

  it("focuses input on ctrl or meta k", async () => {
    const { user, input } = await setupBlurredHomeTerminal();

    await user.keyboard("{Meta>}k{/Meta>}");

    expect(input).toHaveFocus();
  });

  it("focuses input on ctrl or meta slash", async () => {
    const { user, input } = await setupBlurredHomeTerminal();

    await user.keyboard("{Control>}/{Control>}");

    expect(input).toHaveFocus();
  });

  it("focuses input when terminal body is clicked", async () => {
    const { user, input } = await setupBlurredHomeTerminal();

    await user.click(screen.getByText(/ROLE/));

    expect(input).toHaveFocus();
  });
});
