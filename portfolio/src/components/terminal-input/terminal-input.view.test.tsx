import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vite-plus/test";
import { TerminalInputView } from "./terminal-input.view";

describe("TerminalInputView", () => {
  it("renders prompt and forwards interactions", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onChange = vi.fn();
    const onKeyDown = vi.fn();

    render(
      <TerminalInputView
        prompt="thefalked@portfolio:~$"
        value="help"
        inputRef={{ current: null }}
        onSubmit={onSubmit}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />,
    );

    const input = screen.getByRole("textbox", { name: /command input/i });
    expect(input).toHaveValue("help");
    expect(screen.queryByText("type help for available commands.")).not.toBeInTheDocument();
    expect(screen.getByText("thefalked@portfolio:~$")).toHaveClass("sr-only");

    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(onKeyDown).toHaveBeenCalled();
  });

  it("shows delayed hint overlay when input is empty", () => {
    render(
      <TerminalInputView
        prompt="thefalked@portfolio:~$"
        value=""
        inputRef={{ current: null }}
        onSubmit={vi.fn()}
        onChange={vi.fn()}
        onKeyDown={vi.fn()}
      />,
    );

    expect(screen.getByText("type help for available commands.")).toBeVisible();
    expect(screen.getByRole("textbox", { name: /command input/i })).toHaveAttribute(
      "aria-describedby",
      "terminal-input-hint",
    );
  });
});
