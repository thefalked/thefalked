export type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
};

export const PARTICLE_COUNT = 48;
const PARTICLE_COLOR = "110, 43, 145";

export function createParticles(count = PARTICLE_COUNT, random = Math.random): Particle[] {
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    size: random() * 1.8 + 0.4,
    speed: random() * 0.00025 + 0.00005,
    opacity: random() * 0.35 + 0.08,
  }));
}

export function updateParticles(particles: Particle[], random = Math.random) {
  for (const particle of particles) {
    particle.y -= particle.speed;
    if (particle.y < 0) {
      particle.y = 1;
      particle.x = random();
    }
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);

  for (const particle of particles) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${particle.opacity})`;
    ctx.arc(particle.x * width, particle.y * height, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
