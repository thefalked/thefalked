import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vite-plus/test";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

Element.prototype.scrollIntoView = vi.fn();

HTMLCanvasElement.prototype.getContext = vi.fn(
  () =>
    ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
    }) as unknown as CanvasRenderingContext2D,
) as unknown as typeof HTMLCanvasElement.prototype.getContext;
