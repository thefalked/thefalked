import type { RefObject } from "react";
import { tv } from "tailwind-variants";

const particleCanvas = tv({
  slots: {
    canvas: "pointer-events-none fixed inset-0 z-0 h-full w-full",
  },
});

const { canvas } = particleCanvas();

type ParticleCanvasViewProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

export function ParticleCanvasView({ canvasRef }: ParticleCanvasViewProps) {
  return <canvas ref={canvasRef} className={canvas()} aria-hidden="true" />;
}
