import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, memo } from "react";

interface Particle {
  id: number;
  src: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

interface ParticleSystemProps {
  trigger: number;
  position: { x: number; y: number };
  particleCount?: number;
}

const getParticleImages = (): string[] => {
  const particles: string[] = [];
  for (let i = 1; i <= 11; i++) {
    particles.push(`/particles/Experience_Orb_Value_${i}.png`);
  }
  return particles;
};

const PARTICLE_IMAGES = getParticleImages();

// Preload particle images
if (typeof window !== "undefined") {
  PARTICLE_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

export const ParticleSystem = memo(
  ({ trigger, position, particleCount = 3 }: ParticleSystemProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
      if (trigger > 0) {
        // Play particle sound - 80% chance for particle_sound_1.mp3, 20% for particle sound.mp3
        const soundFile =
          Math.random() < 0.8
            ? "/particles/particle_sound_1.mp3"
            : "/particles/particle sound.mp3";
        const audio = new Audio(soundFile);
        audio.volume = 0.5;
        audio.play().catch(() => {
          // Silently handle autoplay restrictions
        });

        const newParticles: Particle[] = [];
        const count = particleCount || (Math.random() < 0.5 ? 3 : 4);
        const finalCount = Math.min(count, 4);

        for (let i = 0; i < finalCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 60 + Math.random() * 80;
          const randomParticleIndex = Math.floor(
            Math.random() * PARTICLE_IMAGES.length
          );

          newParticles.push({
            id: Date.now() + i + Math.random() * 1000,
            src:
              PARTICLE_IMAGES[randomParticleIndex] ||
              "/particles/Experience_Orb_Value_1.png",
            x: position.x,
            y: position.y,
            angle,
            distance,
          });
        }

        setParticles((prev) => [...prev, ...newParticles]);
      }
    }, [trigger, position, particleCount]);

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <AnimatePresence>
          {particles.map((particle) => {
            const endX = Math.cos(particle.angle) * particle.distance;
            const endY = Math.sin(particle.angle) * particle.distance;

            return (
              <motion.img
                key={particle.id}
                src={particle.src}
                alt="Particle"
                className="absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
                loading="eager"
                decoding="async"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0.5,
                  rotate: 0,
                }}
                animate={{
                  x: endX,
                  y: endY,
                  opacity: [0, 1, 1, 0.7, 0],
                  scale: [0.5, 1.3, 1, 0.9, 0.6],
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{
                  x: {
                    duration: 3,
                    ease: [0.33, 1, 0.68, 1],
                  },
                  y: {
                    duration: 3,
                    ease: [0.33, 1, 0.68, 1],
                  },
                  opacity: {
                    duration: 3,
                    times: [0, 0.1, 0.5, 0.8, 1],
                    ease: "easeOut",
                  },
                  scale: {
                    duration: 3,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    ease: "easeOut",
                  },
                  rotate: {
                    duration: 3,
                    ease: "easeOut",
                  },
                }}
                onAnimationComplete={() => {
                  setParticles((prev) =>
                    prev.filter((p) => p.id !== particle.id)
                  );
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    );
  }
);
