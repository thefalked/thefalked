import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { describe, expect, it, vi } from "vite-plus/test";
import { useTerminalInput } from "./use-terminal-input";

describe("useTerminalInput", () => {
  it("submits value and clears input state", () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() =>
      useTerminalInput({
        prompt: "thefalked@portfolio:~$",
        onSubmit,
        onHistory: () => null,
      }),
    );

    act(() => {
      result.current.handleChange({ target: { value: "help" } } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as FormEvent);
    });

    expect(onSubmit).toHaveBeenCalledWith("help");
    expect(result.current.value).toBe("");
  });

  it("updates value from history navigation", () => {
    const onHistory = vi.fn().mockReturnValue("pwd");
    const { result } = renderHook(() =>
      useTerminalInput({
        prompt: "thefalked@portfolio:~$",
        onSubmit: vi.fn(),
        onHistory,
      }),
    );

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowUp",
        preventDefault: vi.fn(),
      } as unknown as KeyboardEvent<HTMLInputElement>);
    });

    expect(onHistory).toHaveBeenCalledWith("up");
    expect(result.current.value).toBe("pwd");
  });
});
