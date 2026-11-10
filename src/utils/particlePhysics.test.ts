import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createDissolveParticles,
  createExplosionParticles,
  stepVortexParticle,
  stepExplosionParticle,
  countRemainingUnabsorbed,
  DISCO_MOSAIC_PALETTE,
  clamp,
} from './particlePhysics';

test('createDissolveParticles generates exact count within bounds with valid palette colors', () => {
  const bounds = { width: 1200, height: 800 };
  const particles = createDissolveParticles(150, bounds);

  assert.equal(particles.length, 150);
  assert.equal(countRemainingUnabsorbed(particles), 150);

  for (const p of particles) {
    assert.ok(p.x >= 0 && p.x <= 1200, `x=${p.x} should be within bounds`);
    assert.ok(p.y >= 0 && p.y <= 800, `y=${p.y} should be within bounds`);
    assert.ok(DISCO_MOSAIC_PALETTE.includes(p.color), `Color ${p.color} must be in palette`);
    assert.equal(p.absorbed, false);
    assert.ok(p.size > 0);
  }
});

test('stepVortexParticle converges particle toward target and marks absorbed when close', () => {
  const target = { x: 500, y: 100 };
  const particle = {
    id: 1,
    x: 490,
    y: 110,
    originX: 490,
    originY: 110,
    vx: 0,
    vy: 0,
    size: 4,
    color: '#f2c438',
    alpha: 1,
    absorbed: false,
    angle: 0,
    angularSpeed: 0.1,
    radialDistance: 0,
    sparkleFreq: 3,
  };

  // Distance is sqrt((500-490)^2 + (100-110)^2) = sqrt(100+100) ≈ 14.14 < 24
  stepVortexParticle(particle, target, 0.5);

  assert.equal(particle.absorbed, true);
  assert.equal(particle.x, 500);
  assert.equal(particle.y, 100);
  assert.equal(particle.alpha, 0);
});

test('createExplosionParticles spawns particles at origin and stepExplosionParticle settles them', () => {
  const origin = { x: 450, y: 80 };
  const bounds = { width: 1200, height: 800 };
  const particles = createExplosionParticles(100, origin, bounds);

  assert.equal(particles.length, 100);
  const p0 = particles[0];
  // Origin should be close to 450, 80 (+- 8px)
  assert.ok(Math.abs(p0.originX - 450) < 0.001);
  assert.ok(Math.abs(p0.originY - 80) < 0.001);

  // Step towards settling
  const prevY = p0.y;
  stepExplosionParticle(p0, 0.8);
  // Y should have advanced downwards due to vy and gravity
  assert.ok(p0.y >= prevY, 'Particle should move downwards');
  // Alpha should decrease when progress > 0.55
  assert.ok(p0.alpha < 1, 'Alpha should fade out during late settlement');
});

test('clamp accurately bounds values', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
});
