import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { useTerminalState } from "./use-terminal-state";
import { getHomeLines, getProjectsLines } from "../../utils/commands";

describe("useTerminalState", () => {
  it("initializes with home lines and prompt", () => {
    const { result } = renderHook(() => useTerminalState("home", vi.fn()));

    expect(result.current.lines).toEqual(getHomeLines());
    expect(result.current.prompt).toBe("thefalked@portfolio:~$");
  });

  it("initializes with projects lines", () => {
    const { result } = renderHook(() => useTerminalState("projects", vi.fn()));

    expect(result.current.lines).toEqual(getProjectsLines());
    expect(result.current.prompt).toBe("thefalked@portfolio:projects$");
  });

  it("appends command output on submit", () => {
    const { result } = renderHook(() => useTerminalState("home", vi.fn()));

    act(() => {
      result.current.submit("whoami");
    });

    expect(
      result.current.lines.some((line) => line.type === "command" && line.text === "whoami"),
    ).toBe(true);
    expect(
      result.current.lines.some(
        (line) => line.type === "output" && line.text === "Giuliano Crivelli",
      ),
    ).toBe(true);
  });

  it("clears lines on clear command", () => {
    const { result } = renderHook(() => useTerminalState("home", vi.fn()));

    act(() => {
      result.current.submit("clear");
    });

    expect(result.current.lines).toEqual([]);
  });

  it("delegates navigation to cd command", () => {
    const onNavigate = vi.fn();
    const { result } = renderHook(() => useTerminalState("home", onNavigate));

    act(() => {
      result.current.submit("cd projects");
    });

    expect(onNavigate).toHaveBeenCalledWith("projects");
  });

  it("ignores empty submissions", () => {
    const { result } = renderHook(() => useTerminalState("home", vi.fn()));
    const initialLength = result.current.lines.length;

    act(() => {
      result.current.submit("   ");
    });

    expect(result.current.lines).toHaveLength(initialLength);
  });

  it("resets state when section changes", () => {
    const { result, rerender } = renderHook(
      ({ section }: { section: "home" | "projects" }) => useTerminalState(section, vi.fn()),
      { initialProps: { section: "home" as "home" | "projects" } },
    );

    act(() => {
      result.current.submit("whoami");
    });

    rerender({ section: "projects" });

    expect(result.current.lines).toEqual(getProjectsLines());
  });

  it("navigates command history", () => {
    const { result } = renderHook(() => useTerminalState("home", vi.fn()));

    act(() => {
      result.current.submit("whoami");
      result.current.submit("pwd");
    });

    let command: string | null = null;

    act(() => {
      command = result.current.navigateHistory("up");
    });
    expect(command).toBe("pwd");

    act(() => {
      command = result.current.navigateHistory("up");
    });
    expect(command).toBe("whoami");

    act(() => {
      command = result.current.navigateHistory("down");
    });
    expect(command).toBe("pwd");

    act(() => {
      command = result.current.navigateHistory("down");
    });
    expect(command).toBe("");
  });

  it("returns null when navigating history with no entries", () => {
    const { result } = renderHook(() => useTerminalState("home", vi.fn()));

    expect(result.current.navigateHistory("up")).toBeNull();
  });
});
