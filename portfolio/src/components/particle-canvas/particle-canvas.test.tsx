import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vite-plus/test";
import { ParticleCanvasView } from "./particle-canvas.view";

describe("ParticleCanvasView", () => {
  it("renders a full-screen canvas", () => {
    const { container } = render(<ParticleCanvasView canvasRef={{ current: null }} />);

    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });
});

describe("useParticleCanvas integration", () => {
  it("starts animation loop and cleans up on unmount", async () => {
    const { useParticleCanvas } = await import("./use-particle-canvas");
    const { render: renderHookHost } = await import("@testing-library/react");
    const rafSpy = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");

    function Host() {
      const { canvasRef } = useParticleCanvas();
      return <ParticleCanvasView canvasRef={canvasRef} />;
    }

    const { unmount } = renderHookHost(<Host />);

    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith("2d");
    expect(rafSpy).toHaveBeenCalled();

    unmount();

    expect(cancelSpy).toHaveBeenCalledWith(1);
  });
});
