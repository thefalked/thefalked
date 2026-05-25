import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { useTerminal } from "./use-terminal";

describe("useTerminal", () => {
  it("derives terminal chrome from section", () => {
    const { result } = renderHook(() => useTerminal({ section: "home", onNavigate: vi.fn() }));

    expect(result.current.title).toBe("thefalked@portfolio ~");
    expect(result.current.prompt).toBe("thefalked@portfolio:~$");
  });

  it("uses projects window path on projects section", () => {
    const { result } = renderHook(() => useTerminal({ section: "projects", onNavigate: vi.fn() }));

    expect(result.current.title).toBe("thefalked@portfolio projects");
  });
});
