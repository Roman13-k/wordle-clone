"use client";

import { SEASON_PARTICLES } from "@/utils/data/seasonParticles";
import { getTimeOfYear } from "@/utils/functions/getTimeOfYear";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function SeasonalParticles() {
  const season = getTimeOfYear();
  const { svgs, color } = SEASON_PARTICLES[season];

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 98,
        size: 10 + Math.random() * 16,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
      }))
    );
  }, [season]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => {
        const Svg = svgs[Math.floor(Math.random() * svgs.length)];
        return (
          <div
            key={p.id}
            className={`absolute opacity-80 ${color}`}
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: "-40px",
              animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            {Svg}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
