import React, { useEffect, useRef } from 'react';
import {
  type ParticlePoint,
  type CosmicParticle,
  createDissolveParticles,
  createExplosionParticles,
  stepVortexParticle,
  stepExplosionParticle,
} from '../utils/particlePhysics';

export interface CosmicParticleBeamCanvasProps {
  isActive: boolean;
  targetPoint: ParticlePoint | null;
  onMidpoint: () => void;
  onComplete: () => void;
}

// Gentle Web Audio API synthesizer for the cosmic sparkle swirl & burst (zero external mp3s)
function playCosmicBeamSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    
    // Master soft volume limiter
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, now);
    masterGain.connect(ctx.destination);

    // 1. Swirl oscillator (rising pitch representing convergence)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(780, now + 0.48);
    gain1.gain.setValueAtTime(0.01, now);
    gain1.gain.linearRampToValueAtTime(0.08, now + 0.35);
    gain1.gain.linearRampToValueAtTime(0.001, now + 0.52);

    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + 0.55);

    // 2. Chime burst at midpoint (explosion into the new page)
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggiated sparkle
    chimeFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + 0.48 + idx * 0.04;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.65);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.7);
    });
  } catch {
    // Audio optional - continues silently if audio context is blocked
  }
}

export const CosmicParticleBeamCanvas: React.FC<CosmicParticleBeamCanvasProps> = ({
  isActive,
  targetPoint,
  onMidpoint,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const onMidpointRef = useRef(onMidpoint);
  const onCompleteRef = useRef(onComplete);

  onMidpointRef.current = onMidpoint;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isActive) return;

    // Optional audio sparkle
    playCosmicBeamSound();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Destination target point (defaults to center top if no target button passed)
    const targetX = (targetPoint && Number.isFinite(targetPoint.x)) ? targetPoint.x : width * 0.5;
    const targetY = (targetPoint && Number.isFinite(targetPoint.y)) ? targetPoint.y : 40;
    const target: ParticlePoint = { x: targetX, y: targetY };

    // Phase 1: Dissolve particles (380 sparkling mosaic particles)
    let particles: CosmicParticle[] = createDissolveParticles(380, { width, height });
    let phase: 'dissolving' | 'exploding' = 'dissolving';
    let midpointFired = false;

    const startTime = performance.now();
    const DISSOLVE_DURATION = 500; // ms to converge into button
    const EXPLODE_DURATION = 680;   // ms to fountain outwards into new view
    const TOTAL_DURATION = DISSOLVE_DURATION + EXPLODE_DURATION;

    const renderFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      if (elapsed < DISSOLVE_DURATION) {
        // =====================================================================
        // STAGE 1: DISSOLUTION & VORTEX CONVERGENCE INTO THE TARGET BUTTON
        // =====================================================================
        const progress = Math.min(1, elapsed / DISSOLVE_DURATION);

        // Draw swirling aura glow around target button as particles get sucked in
        if (progress > 0.4) {
          const auraIntensity = (progress - 0.4) / 0.6;
          const auraRadius = Math.max(1, 24 + auraIntensity * 36);
          const auraGrad = ctx.createRadialGradient(
            target.x,
            target.y,
            0,
            target.x,
            target.y,
            auraRadius
          );
          auraGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * auraIntensity})`);
          auraGrad.addColorStop(0.3, `rgba(242, 196, 56, ${0.75 * auraIntensity})`);
          auraGrad.addColorStop(0.7, `rgba(243, 112, 33, ${0.45 * auraIntensity})`);
          auraGrad.addColorStop(1, 'rgba(139, 44, 245, 0)');

          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(target.x, target.y, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          // Shockwave ripple ring
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - auraIntensity})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(target.x, target.y, auraRadius * 0.9, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Update and draw each particle in the vortex
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          stepVortexParticle(p, target, progress);

          if (p.alpha <= 0.02) continue;

          const px = Number.isFinite(p.x) ? p.x : target.x;
          const py = Number.isFinite(p.y) ? p.y : target.y;
          const pRadius = Math.max(0.5, Number.isFinite(p.size) ? p.size * 2.2 : 4);
          const pCore = Math.max(0.5, Number.isFinite(p.size) ? p.size : 2);

          // Radial glow per particle
          const radGrad = ctx.createRadialGradient(px, py, 0, px, py, pRadius);
          radGrad.addColorStop(0, p.color);
          radGrad.addColorStop(0.5, p.color);
          radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = radGrad;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(px, py, pCore, 0, Math.PI * 2);
          ctx.fill();

          // Star sparkle twinkle cross on select particles
          if (p.size > 3.8 && p.alpha > 0.6) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(px - pCore * 1.5, py);
            ctx.lineTo(px + pCore * 1.5, py);
            ctx.moveTo(px, py - pCore * 1.5);
            ctx.lineTo(px, py + pCore * 1.5);
            ctx.stroke();
          }
        }
      } else {
        // =====================================================================
        // STAGE 2: MIDPOINT HANDOFF & FOUNTAIN EXPLOSION INTO THE NEW VIEW
        // =====================================================================
        if (!midpointFired) {
          midpointFired = true;
          phase = 'exploding';
          onMidpointRef.current();

          // Spawn new radiant fountain burst originating from target button
          particles = createExplosionParticles(420, target, { width, height });
        }

        const explosionElapsed = elapsed - DISSOLVE_DURATION;
        const explodeProgress = Math.min(1, explosionElapsed / EXPLODE_DURATION);

        // Expanding shockwave rings emerging from the button as new page builds
        if (explodeProgress < 0.6) {
          const rawWave = explodeProgress * Math.max(width, height) * 0.85;
          const waveRadius = Math.max(1, Number.isFinite(rawWave) ? rawWave : 10);
          const waveAlpha = Math.max(0, 1 - (explodeProgress / 0.6));
          ctx.strokeStyle = `rgba(242, 196, 56, ${waveAlpha * 0.55})`;
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.arc(target.x, target.y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = `rgba(56, 189, 248, ${waveAlpha * 0.4})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(target.x, target.y, waveRadius * 0.75, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Update and draw explosion particles raining down across the new page
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          stepExplosionParticle(p, explodeProgress);

          if (p.alpha <= 0.01) continue;

          const px = Number.isFinite(p.x) ? p.x : target.x;
          const py = Number.isFinite(p.y) ? p.y : target.y;
          const expRadius = Math.max(0.5, Number.isFinite(p.size) ? p.size * 2.5 : 5);
          const expCore = Math.max(0.5, Number.isFinite(p.size) ? p.size : 2);

          const radGrad = ctx.createRadialGradient(px, py, 0, px, py, expRadius);
          radGrad.addColorStop(0, '#ffffff');
          radGrad.addColorStop(0.35, p.color);
          radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = radGrad;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(px, py, expCore, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle glints
          if (p.size > 3.6 && p.alpha > 0.4) {
            ctx.strokeStyle = 'rgba(255, 255, 255, ' + (p.alpha * 0.8) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px - expCore * 1.8, py);
            ctx.lineTo(px + expCore * 1.8, py);
            ctx.moveTo(px, py - expCore * 1.8);
            ctx.lineTo(px, py + expCore * 1.8);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      if (elapsed < TOTAL_DURATION) {
        animFrameRef.current = requestAnimationFrame(renderFrame);
      } else {
        ctx.clearRect(0, 0, width, height);
        onCompleteRef.current();
      }
    };

    animFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive, targetPoint]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  );
};
