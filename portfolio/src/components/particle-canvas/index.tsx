import { ParticleCanvasView } from "./particle-canvas.view";
import { useParticleCanvas } from "./use-particle-canvas";

export function ParticleCanvas() {
  const { canvasRef } = useParticleCanvas();

  return <ParticleCanvasView canvasRef={canvasRef} />;
}
