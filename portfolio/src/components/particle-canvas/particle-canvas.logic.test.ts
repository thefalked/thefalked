import { describe, expect, it, vi } from "vite-plus/test";
import {
  PARTICLE_COUNT,
  createParticles,
  drawParticles,
  updateParticles,
} from "./particle-canvas.logic";

describe("createParticles", () => {
  it("creates the expected number of particles", () => {
    const particles = createParticles(PARTICLE_COUNT, () => 0.5);

    expect(particles).toHaveLength(PARTICLE_COUNT);
    expect(particles[0]).toEqual({
      x: 0.5,
      y: 0.5,
      size: 1.3,
      speed: 0.000175,
      opacity: 0.255,
    });
  });
});

describe("updateParticles", () => {
  it("wraps particles when they move above the viewport", () => {
    const particles = createParticles(1, () => 0);
    particles[0].y = 0.001;
    particles[0].speed = 0.01;

    updateParticles(particles, () => 0.75);

    expect(particles[0].y).toBe(1);
    expect(particles[0].x).toBe(0.75);
  });
});

describe("drawParticles", () => {
  it("clears and draws each particle", () => {
    const ctx = {
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      fillStyle: "",
    } as unknown as CanvasRenderingContext2D;

    drawParticles(
      ctx,
      createParticles(2, () => 0.5),
      100,
      200,
    );

    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 100, 200);
    expect(ctx.beginPath).toHaveBeenCalledTimes(2);
    expect(ctx.arc).toHaveBeenCalledTimes(2);
    expect(ctx.fill).toHaveBeenCalledTimes(2);
  });
});
