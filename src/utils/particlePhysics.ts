/**
 * Particle physics and trajectory algorithms for the WorldFamily.art
 * Cosmic Particle Quantum Beam Transition.
 *
 * Simulates page dissolution into swirling mosaic particles, vortex convergence
 * into the clicked navigation button, and the fountain explosion reconstructing
 * the destination view.
 */

export interface ParticlePoint {
  x: number;
  y: number;
}

export interface ParticleBounds {
  width: number;
  height: number;
  top?: number;
  left?: number;
}

export interface CosmicParticle {
  id: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  absorbed: boolean;
  angle: number;
  angularSpeed: number;
  radialDistance: number;
  sparkleFreq: number;
}

export const DISCO_MOSAIC_PALETTE = [
  '#f2c438', // Gold
  '#f37021', // Sunset Orange
  '#e61919', // Crimson Red
  '#8b2cf5', // Cosmic Purple
  '#1d70db', // Atlantic Royal Blue
  '#38bdf8', // Sky Turquoise
  '#16a34a', // Emerald Galicia
  '#facc15', // Radiant Yellow
  '#ffffff', // Pure Star Sparkle
];

export function getRandomPaletteColor(): string {
  const index = Math.floor(Math.random() * DISCO_MOSAIC_PALETTE.length);
  return DISCO_MOSAIC_PALETTE[index];
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Creates particles distributed across the content surface for dissolution.
 */
export function createDissolveParticles(
  count: number,
  bounds: ParticleBounds
): CosmicParticle[] {
  const particles: CosmicParticle[] = [];
  const safeCount = Math.max(10, Math.min(count, 800));

  for (let i = 0; i < safeCount; i++) {
    const x = Math.random() * bounds.width;
    // Bias particles towards the visible upper 85% of content
    const y = Math.random() * bounds.height;
    
    // Initial gentle drift
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 2.5;

    particles.push({
      id: i,
      x,
      y,
      originX: x,
      originY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2, // slight upward float
      size: 2.2 + Math.random() * 4.2,
      color: getRandomPaletteColor(),
      alpha: 0.85 + Math.random() * 0.15,
      absorbed: false,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.15,
      radialDistance: 0,
      sparkleFreq: 2 + Math.random() * 6,
    });
  }

  return particles;
}

/**
 * Creates particles bursting outward from the target button to generate the new view.
 */
export function createExplosionParticles(
  count: number,
  origin: ParticlePoint,
  bounds: ParticleBounds
): CosmicParticle[] {
  const particles: CosmicParticle[] = [];
  const safeCount = Math.max(10, Math.min(count, 800));

  for (let i = 0; i < safeCount; i++) {
    // Fan outward mainly downward and laterally across the page:
    // angle between 20 deg and 160 deg (downwards into viewport) with some lateral spread
    const angle = (Math.PI * 0.05) + Math.random() * (Math.PI * 0.9);
    // Varied speeds for natural fountain depth
    const speed = 4 + Math.random() * 18;

    particles.push({
      id: i,
      x: origin.x + (Math.random() - 0.5) * 16,
      y: origin.y + (Math.random() - 0.5) * 16,
      originX: origin.x,
      originY: origin.y,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: Math.sin(angle) * speed * 0.95 + 1.5,
      size: 2.5 + Math.random() * 5.0,
      color: getRandomPaletteColor(),
      alpha: 1,
      absorbed: false,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.2,
      radialDistance: 0,
      sparkleFreq: 3 + Math.random() * 7,
    });
  }

  return particles;
}

/**
 * Updates a dissolve particle undergoing vortex suction toward the target point.
 * @param progress 0 (start) to 1 (full convergence at ~500ms)
 */
export function stepVortexParticle(
  particle: CosmicParticle,
  target: ParticlePoint,
  progress: number
): void {
  if (particle.absorbed) return;

  const dx = target.x - particle.x;
  const dy = target.y - particle.y;
  const dist = Math.hypot(dx, dy);

  // If within absorption threshold, mark absorbed
  if (dist < 24 || progress > 0.95) {
    particle.absorbed = true;
    particle.x = target.x;
    particle.y = target.y;
    particle.alpha = 0;
    return;
  }

  // Vortex force ramps up as progress increases
  const suctionStrength = Math.pow(progress, 1.6) * 0.28 + 0.05;
  
  // Tangential velocity for swirling vortex effect
  particle.angle += particle.angularSpeed * (1 + progress * 2.5);
  const tangentX = -Math.sin(particle.angle) * Math.min(dist * 0.035, 12);
  const tangentY = Math.cos(particle.angle) * Math.min(dist * 0.035, 12);

  // Pull towards target with velocity dampening & clamping
  const maxSpeed = 32;
  const rawVx = particle.vx * 0.86 + (dx * suctionStrength) + tangentX;
  const rawVy = particle.vy * 0.86 + (dy * suctionStrength) + tangentY;

  particle.vx = clamp(Number.isFinite(rawVx) ? rawVx : 0, -maxSpeed, maxSpeed);
  particle.vy = clamp(Number.isFinite(rawVy) ? rawVy : 0, -maxSpeed, maxSpeed);

  particle.x += particle.vx;
  particle.y += particle.vy;

  // Shimmering alpha and size compression near target
  particle.alpha = clamp(1 - (progress * 0.3) + Math.sin(particle.angle * particle.sparkleFreq) * 0.2, 0.05, 1);
  if (dist < 120) {
    particle.size = Math.max(1, particle.size * 0.96);
  }
}

/**
 * Updates an explosion particle expanding across the newly generated view.
 * @param progress 0 (start of explosion) to 1 (fully settled at ~1100ms)
 */
export function stepExplosionParticle(
  particle: CosmicParticle,
  progress: number
): void {
  // Air resistance (damping)
  particle.vx *= 0.94;
  particle.vy = particle.vy * 0.94 + 0.18; // gentle gravity settling

  particle.x += particle.vx;
  particle.y += particle.vy;

  // Alpha fade out as it settles into the new page
  const fadeStart = 0.55;
  if (progress > fadeStart) {
    const fadeNorm = (progress - fadeStart) / (1 - fadeStart);
    particle.alpha = clamp(1 - fadeNorm, 0, 1);
    particle.size = Math.max(0.5, particle.size * 0.985);
  } else {
    particle.alpha = 0.95 + Math.sin(progress * particle.sparkleFreq * 10) * 0.05;
  }
}

/**
 * Helper to check if all particles have been absorbed.
 */
export function countRemainingUnabsorbed(particles: CosmicParticle[]): number {
  return particles.filter((p) => !p.absorbed).length;
}
